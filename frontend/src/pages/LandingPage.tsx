import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "./css/LandingPage.module.css";
import Calendar from "../components/Calendar";
import Resources from "../components/Resources";

export default function LandingPage() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<Date>();

    return (
        <>
        <Navbar />
            <main className={styles.landingPage}>
                <section className={styles.welcome}>
                    <p className={styles.eyebrow}>
                        Innovia
                    </p>

                    <h1>Välkommen</h1>

                    <p className={styles.description}>
                        Här kommer du kunna se och boka tillgängliga resurser när du är inloggad på din användare.
                    </p>
                    <button className={styles.adminButton} onClick={() => navigate("/admin")}>
                        Gå till admin-vy
                    </button>
                </section>
                <div className={styles.bookingCalendarWrapper}>
                    <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />
                    <Resources />
                </div>
            </main>
        </>
    );
}