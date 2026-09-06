import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./css/LandingPage.module.css";

export default function LandingPage() {
    const navigate = useNavigate();

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
            </main>
        </>
    );
}