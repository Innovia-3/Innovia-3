import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import styles from "../pages/css/LoginPage.module.css";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //körs när användaren trycker på logga in
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>
        <Navbar />
        <main className={styles.loginPage}>
            <section className={styles.loginCard}>
                <div className={styles.heading}>
                    <p className={styles.eyebrow}>
                        Innovia
                    </p>
                    <h1>Logga in</h1>
                    <p>
                        Logga in för att boka resurser och hantera dina bokningar.
                    </p>
                </div>

                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <Input
                        label="Email:"
                        type="email"
                        value={email}
                        placeholder="Skriv din email"
                        onChange={setEmail}
                    />
                    <Input
                        label="Lösenord:"
                        type="password"
                        value={password}
                        placeholder="Skriv ditt lösenord"
                        onChange={setPassword}
                    />
                    <button className={styles.backButton} type="button" onClick={() => navigate("/")}>
                        Tillbaka
                    </button>
                    <button className={styles.loginButton} type="submit">
                        Logga in
                    </button>
                </form>
            </section>
        </main>
        </>
    );
}