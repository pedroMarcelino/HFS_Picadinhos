import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <p className="mb-4 text-xl font-semibold">Tela Inicial</p>

                <button
                    onClick={() => navigate("/login")}
                    className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                >
                    Acessar Login
                </button>
            </div>
        </div>
    );
}

export default Home;
