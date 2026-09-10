import styles from "./css/UserList.module.css";

/* denna finns bara för att se hur den kan förhålla sig i admin-vyn :) */
export default function UserList() {
    return (
        <>
        <section className={styles.userListWrapper}>
            <div className={styles.heading}>
                <div className={styles.headerAndButton}>
                    <p className={styles.eyebrow}>
                        Användare
                    </p>
                    <button type="button">
                        Visa alla medlemmar →
                    </button>
                </div>
                <div className={styles.info}>
                    <ul>
                        <li>Namn</li>
                        <li>E-post</li>
                        <li>Roll</li>
                    </ul>
                </div>
            </div>

            <div className={styles.placeholder}>
                <p>Inga hämtade användare ännu</p>
            </div>
        </section>
        </>
    );
}