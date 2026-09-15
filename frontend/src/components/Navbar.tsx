import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Navbar.module.css";

export default function Navbar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>Innovia</h1>

            <button
                className={styles.loginButton}
                onClick={() =>
                    isLoggedIn ? handleLogout() : navigate("/login")
                }
            >
                {isLoggedIn ? "Logga ut" : "Logga in"}
            </button>
        </nav>
    );
}