import { useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>Innovia</h1>

            <button onClick={() => navigate("/login")}>
                Logga in
            </button>
        </div>
    );
}