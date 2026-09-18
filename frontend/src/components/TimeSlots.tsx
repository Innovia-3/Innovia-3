import { useEffect, useState } from "react";
import styles from "./css/TimeSlots.module.css";

const API_URL = import.meta.env.VITE_API_URL;

type TimeSlot = {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type TimeSlotsProps = {
  selectedDate?: Date;
  selectedResourceType:
    string | null;
  selectedResourceId: number | null;
  onSlotSelect: (slot: TimeSlot | null) => void;
  selectedSlot: TimeSlot | null;
  overview?: boolean;
};

type Resource = {
  resourceId: number;
  resourceType: string;
};

const SLOT_START_HOUR = 0;
const SLOT_END_HOUR = 24;
const BOOKING_START_HOUR = 7;
const BOOKING_END_HOUR = 23;

function createSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];

  for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour++) {
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);

    const end = new Date(date);
    end.setHours(hour + 1, 0, 0, 0);

    slots.push({
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      isAvailable: false,
    });
  }

  return slots;
}

export default function TimeSlots({
  selectedDate,
  selectedResourceId,
  onSlotSelect,
  selectedSlot,
  overview = false,
}: TimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);
  const [chooseSpecificResource, setChooseSpecificResource] = useState(false);

  useEffect(() => {
    async function fetchResources() {
      if (selectedResourceType === null) {
        setResources([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/Resources/types/${selectedResourceType}`,
        );

        if (!response.ok) {
          throw new Error("Kunde inte hämta resurser.");
        }

        const data: Resource[] = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Kunde inte hämta resurs-ID:n:", error);
      }
    }

    fetchResources();
  }, [selectedResourceType]);

  useEffect(() => {
    async function checkAvailability() {
      if (!selectedDate || selectedResourceId === null) {
        setSlots([]);
        setSelectedStart(null);
        onSlotSelect(null);
        return;
      }

      setLoading(true);
      setError("");
      setSelectedStart(null);
      onSlotSelect(null);

      try {
        const newSlots = createSlots(selectedDate);

        const availabilityResults = await Promise.all(
          newSlots.map(async (slot) => {
            const start = new Date(slot.startTime);
            const hour = start.getHours();

            // Tider utanför bokningsfönstret visas,
            // men kan inte bokas.
            if (hour < BOOKING_START_HOUR || hour >= BOOKING_END_HOUR) {
              return {
                ...slot,
                isAvailable: false,
              };
            }

            const end = new Date(slot.endTime);

            const params = new URLSearchParams({
              startTime: start.toISOString(),
              endTime: end.toISOString(),
            });

            let response;

            if (selectedResourceId !== null) {
              /* användaren har valt ett specifikt ID */
              response = await fetch(
                `${API_URL}/api/Resources/${selectedResourceId}/availability?${params.toString()}`,
              );
            } else {
              /* första lediga -> kontrollera hela resurstypen */
              response = await fetch(
                `${API_URL}/api/Resources/types/${selectedResourceType}/availability?${params.toString()}`,
              );
            }

            if (!response.ok) {
              throw new Error("Kunde inte kontrollera tillgänglighet.");
            }

            const data: {
              resourceId: number;
              isAvailable: boolean;
            } = await response.json();

            return {
              ...slot,
              isAvailable: data.isAvailable,
            };
          }),
        );

        setSlots(availabilityResults);
      } catch (error) {
        console.error("Fel vid kontroll av tillgänglighet:", error);
        setError("Kunde inte hämta lediga tider.");
        setSlots([]);
      } finally {
        setLoading(false);
      }
    }

    checkAvailability();
  }, [selectedDate, selectedResourceId, selectedResourceType, onSlotSelect]);

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function isEndTime(time: string) {
    return new Date(time).getHours() === BOOKING_END_HOUR;
  }

  function handleTimeClick(time: string) {
    const selectedTime = new Date(time);
    const selectedHour = selectedTime.getHours();

    /* första klicket = starttid */
    if (!selectedStart) {
      const startSlot = slots.find((slot) => slot.startTime === time);

      if (
        !startSlot ||
        !startSlot.isAvailable ||
        selectedHour < BOOKING_START_HOUR ||
        selectedHour >= BOOKING_END_HOUR
      ) {
        return;
      }

      setSelectedStart(startSlot);
      setError("");
      onSlotSelect(null);
      return;
    }

    /* sluttiden måste ligga efter starttiden */
    if (selectedTime <= new Date(selectedStart.startTime)) {
      return;
    }

    /* sluttiden får inte vara efter bokningsfönstret */
    if (selectedHour > BOOKING_END_HOUR) {
      return;
    }

    const slotsInRange = slots.filter(
      (slot) =>
        new Date(slot.startTime) >= new Date(selectedStart.startTime) &&
        new Date(slot.startTime) < selectedTime,
    );

    const allAvailable = slotsInRange.every((slot) => slot.isAvailable);

    if (!allAvailable) {
      setError("En eller flera tider i intervallet är redan bokade.");
      return;
    }

    const selectedRange: TimeSlot = {
      startTime: selectedStart.startTime,
      endTime: time,
      isAvailable: true,
    };

    onSlotSelect(selectedRange);
    setSelectedStart(null);
    setError("");
  }

  if (!selectedDate || selectedResourceId === null) {
    return (
      <section className={styles.timeSlotsWrapper}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Tider</p>
          <p className={styles.description}>
            Välj en resurs och ett datum för att se tillgängliga tider.
          </p>
        </div>
      </section>
    );
  }
  function formatResourceType(resourceType: string) {
    switch (resourceType) {
      case "VRHeadset":
        return "VR Headset";
      case "AIServer":
        return "AI Server";
      default:
        return resourceType;
    }
  }

  if (overview) {
    return (
      <div className={styles.overviewTimeSlotList}>
        {slots.map((slot) => {
          const time = slot.startTime;

          return (
            <div
              key={time}
              className={`
              ${styles.overviewTimeSlot}
              ${styles[slot.status]}
            `}
            >
              {formatTime(time)}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className={styles.timeSlotsWrapper}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>Tider</p>

        <p className={styles.description}>
          Välj starttid och sluttid för din bokning
        </p>
      </div>

      {loading && (
        <div className={styles.placeholder}>
          <p>Kontrollerar tillgänglighet...</p>
        </div>
      )}

      {!loading && error && (
        <div className={styles.placeholder}>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.placeholder}>
          <div className={styles.timeSlotList}>
            {slots.map((slot) => {
              const time = slot.startTime;

              const isSelected =
                selectedStart?.startTime === time ||
                (selectedSlot &&
                  new Date(time) >= new Date(selectedSlot.startTime) &&
                  new Date(time) <= new Date(selectedSlot.endTime));

              return (
                <button
                  key={time}
                  type="button"
                  disabled={!slot.isAvailable && !isEndTime(time)}
                  className={
                    isEndTime(time)
                      ? isSelected
                        ? styles.selected
                        : styles.timeButton
                      : !slot.isAvailable
                        ? styles.unavailable
                        : isSelected
                          ? styles.selected
                          : styles.timeButton
                  }
                  onClick={() => handleTimeClick(time)}
                >
                  {formatTime(time)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
