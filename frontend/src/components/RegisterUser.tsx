import { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import styles from "./css/RegisterUser.module.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
    <section className={styles.register}>
      <button
        className={styles.registerButton}
        type="button"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Stäng registrering" : "Registrera användare"}
      </button>

      {showForm && (
        <>
          <button
            className={styles.backButton}
            type="button"
            onClick={() => navigate("/")}
          >
            Tillbaka
          </button>

          <h2>Registrera användare</h2>

          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="E-post"
              value={email}
              placeholder="dittnamn@innoviahub.se"
              onChange={setEmail}
            />

            <Input
              type="password"
              label="lösenord"
              value={password}
              placeholder="Abcd1234!"
              onChange={setPassword}
            />

            {error && <p role="alert">{error}</p>}

            <button type="submit">
              {loading ? "Registrerar in..." : "Registrera"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
