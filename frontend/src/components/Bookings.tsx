import { useEffect, useState } from "react";
import styles from "./css/Bookings.module.css";

type Booking = {
    bookingId: number;
    startTime: string;
    endTime: string;
    resourceId: number;
    resourceType: string;
    userId: string;
    userEmail: string;
};

export default function Bookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getBookings() {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Ingen inloggningstoken hittades.");
                }

                const response = await fetch(
                    "http://localhost:5197/api/Bookings",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log("GET /api/Bookings status:", response.status);

                if (response.status === 401) {
                    throw new Error("Du är inte inloggad eller token har gått ut.");
                }

                if (response.status === 403) {
                    throw new Error("Du har inte behörighet att läsa bokningarna.");
                }

                if (!response.ok) {
                    throw new Error(
                        `Kunde inte hämta bokningar. Status: ${response.status}`
                    );
                }

                const data: Booking[] = await response.json();

                console.log("Bokningar från backend:", data);

                setBookings(data);
            } catch (error) {
                console.error("Fel vid hämtning av bokningar:", error);

                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Ett okänt fel uppstod.");
                }
            } finally {
                setLoading(false);
            }
        }

        getBookings();
    }, []);

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString("sv-SE");
    }

    function formatTime(dateString: string) {
        return new Date(dateString).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    return (
        <section className={styles.bookingsWrapper}>
            <div className={styles.heading}>
                <div className={styles.headerAndButton}>
                    <p className={styles.eyebrow}>
                        Bokningar
                    </p>

                    <button type="button">
                        Visa alla bokningar →
                    </button>
                </div>

                <div className={styles.info}>
                    <div className={styles.resource}>Resurs</div>
                    <div className={styles.user}>Användare</div>
                    <div className={styles.date}>Datum</div>
                    <div className={styles.time}>Tid</div>
                </div>
            </div>

            {loading && (
                <div className={styles.placeholder}>
                    <p>Hämtar bokningar...</p>
                </div>
            )}

            {!loading && error && (
                <div className={styles.placeholder}>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && bookings.length === 0 && (
                <div className={styles.placeholder}>
                    <p>Inga bokningar ännu</p>
                </div>
            )}

            {!loading && !error && bookings.length > 0 && (
                <div className={styles.bookingList}>
                    {bookings.map((booking) => (
                        <div
                            key={booking.bookingId}
                            className={styles.bookingRow}
                        >
                            <div className={styles.resource}>
                                {booking.resourceType}
                            </div>
                    
                            <div className={styles.user}>
                                {booking.userEmail}
                            </div>
                    
                            <div className={styles.date}>
                                {formatDate(booking.startTime)}
                            </div>
                    
                            <div className={styles.time}>
                                {formatTime(booking.startTime)}
                                {" – "}
                                {formatTime(booking.endTime)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}