import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //körs när användaren trycker på logga in
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Logga in vy</h1>

            <form onSubmit={handleSubmit}>

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="Skriv din email"
                    onChange={setEmail}
                />

                <Input
                    label="Lösenord"
                    type="password"
                    value={password}
                    placeholder="Skriv ditt lösenord"
                    onChange={setPassword}
                />

                <button type="button" onClick={() => navigate("/")}>
                    Tillbaka
                </button>
                
                <button type="submit">
                    Logga in
                </button>


            </form>
        </div>
    );
}