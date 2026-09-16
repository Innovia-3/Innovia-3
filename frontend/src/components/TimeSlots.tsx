import { useEffect, useState } from "react";
import styles from "./css/TimeSlots.module.css";

type TimeSlot = {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type TimeSlotsProps = {
  selectedDate?: Date;
  selectedResourceId: number | null;
  onSlotSelect: (slot: TimeSlot | null) => void;
  selectedSlot: TimeSlot | null;
};

const SLOT_START_HOUR = 7;
const SLOT_END_HOUR = 23;

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
}: TimeSlotsProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStart, setSelectedStart] = useState<TimeSlot | null>(null);

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
            const end = new Date(slot.endTime);

            const params = new URLSearchParams({
              startTime: start.toISOString(),
              endTime: end.toISOString(),
            });

            const response = await fetch(
              `http://localhost:5197/api/Resources/${selectedResourceId}/availability?${params.toString()}`,
            );

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
  }, [selectedDate, selectedResourceId]);

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleTimeClick(time: string) {
    /* första klicket = starttid */
    if (!selectedStart) {
      const startSlot = slots.find((slot) => slot.startTime === time);

      if (!startSlot || !startSlot.isAvailable) {
        return;
      }

      setSelectedStart(startSlot);
      onSlotSelect(null);
      return;
    }

    /* sluttiden måste ligga efter starttiden */
    if (new Date(time) <= new Date(selectedStart.startTime)) {
      return;
    }

    const slotsInRange = slots.filter(
      (slot) =>
        new Date(slot.startTime) >= new Date(selectedStart.startTime) &&
        new Date(slot.startTime) < new Date(time),
    );

    /* alla timmar mellan start och slut måste vara lediga */
    const allAvailable = slotsInRange.every((slot) => slot.isAvailable);

    if (!allAvailable) {
      setError("En eller flera tider i intervallet är redan bokade.");
      return;
    }

    /* skapa ett enda TimeSlot för hela intervallet */
    const selectedRange: TimeSlot = {
      startTime: selectedStart.startTime,
      endTime: time,
      isAvailable: true,
    };

    onSlotSelect(selectedRange);
    setSelectedStart(null);
  }

  const selectableTimes =
    slots.length > 0
      ? [
          ...slots.map((slot) => slot.startTime),
          slots[slots.length - 1].endTime,
        ]
      : [];

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
            {selectableTimes.map((time) => {
              const isSelected =
                selectedStart?.startTime === time ||
                (selectedSlot &&
                  new Date(time) >= new Date(selectedSlot.startTime) &&
                  new Date(time) <= new Date(selectedSlot.endTime));

              return (
                <button
                  key={time}
                  type="button"
                  className={isSelected ? styles.selected : styles.timeButton}
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
