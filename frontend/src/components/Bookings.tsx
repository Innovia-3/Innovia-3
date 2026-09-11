import styles from "./css/Bookings.module.css";

/* denna finns bara för att se hur den kan förhålla sig i admin-vyn :) */
export default function Bookings() {
    return (
        <>
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
                    <ul>
                        <li>Resurs</li>
                        <li>Användare</li>
                        <li>Datum</li>
                        <li>Tid</li>
                    </ul>
                </div>
            </div>

            <div className={styles.placeholder}>
                <p>Inga bokningar ännu</p>
            </div>
        </section>
        </>
    );
}