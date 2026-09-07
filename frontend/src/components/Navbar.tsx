import { useNavigate } from "react-router-dom";
import styles from "./css/Navbar.module.css";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>
                Innovia
            </h1>

            <button className={styles.loginButton} onClick={() => navigate("/login")}>
                Logga in
            </button>
        </nav>
    );
}