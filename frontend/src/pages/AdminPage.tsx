import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./css/AdminPage.module.css";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
        <Navbar />
            <main className={styles.adminPage}>
                <section className={styles.admin}>
                    <p className={styles.eyebrow}>
                        Innovia
                    </p>

                    <h1>Admin-vy</h1>

                    <p className={styles.description}>
                        Här kommer admin kunna se alla bokningar, resurser och användare (bokat som ledigt). Även vy över olika sensorer.
                    </p>
                    <button className={styles.landingButton} onClick={() => navigate("/")}>
                        Gå till landnings-vy
                    </button>
                </section>
            </main>
        </>
    );
}