import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";

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

            <div className="">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Digite seu email"
                    error="Email inválido"
                />
            </div>
        </div>
    );
}

export default Home;
