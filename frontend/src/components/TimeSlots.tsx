import styles from "./css/TimeSlots.module.css";

/* denna finns bara för att se hur den kan förhålla sig till kalendern :) */
export default function TimeSlots() {
    return (
        <>
        <section className={styles.timeSlotsWrapper}>
            <div className={styles.heading}>
                <p className={styles.eyebrow}>
                    Bokningar
                </p>

                <p className={styles.description}>
                    Tillgängliga och bokade tider visas här för valt datum.
                </p>
            </div>

            <div className={styles.placeholder}>
                <p>Inga tider hämtade ännu</p>
            </div>
        </section>
        </>
    );
}