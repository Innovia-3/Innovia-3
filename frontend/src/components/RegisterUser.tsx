import React, { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import styles from "./css/RegisterUser.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Du måste vara inloggad som admin.");
        return;
      }

      const response = await fetch(`${API_URL}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("Register error:", response.status, errorMessage);

        setError(errorMessage || "Något gick fel");
        return;
      }
    } catch {
      setError("Kunde inte ansluta till servern. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.registerPage}>
      <section className={styles.registerCard}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>ADMIN</p>
          <h1>Registrera användare</h1>
          <p>Skapa ett nytt användarkonto för InnoviaHub.</p>
        </div>

        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <Input
            type="email"
            label="E-post"
            value={email}
            placeholder="dittnamn@innoviahub.se"
            onChange={setEmail}
          />

          <Input
            type="password"
            label="Lösenord"
            value={password}
            placeholder="Abcd1234!"
            onChange={setPassword}
          />

          {error && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}

          <button
            className={styles.registerButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrerar..." : "Registrera"}
          </button>

          <button
            className={styles.backButton}
            type="button"
            onClick={() => navigate("/")}
          >
            Tillbaka
          </button>
        </form>
      </section>
    </main>
  );
}
