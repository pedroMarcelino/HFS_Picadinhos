import { useState } from "react";
import api from "../../service/api.js";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/register", form);
            console.log(data);
        } catch (error) {}
    }

    return (
        <div className="min-h-screen bg-[#f5f7f0] flex items-center justify-center p-4 relative">
            {/* Botão Voltar */}
            <button
                onClick={() => window.history.back()}
                className="absolute top-5 left-5 flex items-center gap-2 text-[#3a6b35] hover:text-[#2a5026] transition-colors group"
                aria-label="Voltar"
            >
                <div className="w-9 h-9 rounded-full bg-white border border-[#c5ddb8] flex items-center justify-center group-hover:bg-[#edf4e8] transition-colors shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </div>
                <span className="text-sm font-medium hidden sm:inline">
                    Voltar
                </span>
            </button>

            {/* Card principal */}
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[560px]">
                {/* Lado esquerdo — imagem */}
                <div className="relative md:w-5/12 w-full h-52 md:h-auto flex-shrink-0 overflow-hidden">
                    <img
                        src="https://hortifrutisolar.com.br/wp-content/uploads/campo-1024x332.jpg"
                        alt="Campo de hortifruti"
                        className="w-full h-full object-cover object-center md:object-[center_40%]"
                    />
                    {/* Overlay com texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🌿</span>
                            <span className="text-white font-bold text-lg tracking-wide">
                                Picadinhos
                            </span>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            Do campo direto à sua mesa. Produtos frescos da
                            horta, colhidos com cuidado para a sua família.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                                🥬 Orgânicos
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
                                🚚 Entrega rápida
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lado direito — formulário */}
                <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-10">
                    {/* Cabeçalho */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#1f3d1b] mb-1">
                            Crie sua conta
                        </h1>
                        <p className="text-sm text-gray-500">
                            Cadastre-se e receba os melhores produtos frescos
                        </p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-[#2d5228] mb-1.5">
                                Nome completo
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ex: Maria Silva"
                                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5a9e4a]/40 focus:border-[#5a9e4a] transition"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-[#2d5228] mb-1.5">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="seu@email.com"
                                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5a9e4a]/40 focus:border-[#5a9e4a] transition"
                                required
                            />
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium text-[#2d5228] mb-1.5">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Mínimo 8 caracteres"
                                    className="w-full h-11 px-4 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5a9e4a]/40 focus:border-[#5a9e4a] transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={
                                        showPassword
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line
                                                x1="1"
                                                y1="1"
                                                x2="23"
                                                y2="23"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirmação de senha */}
                        <div>
                            <label className="block text-sm font-medium text-[#2d5228] mb-1.5">
                                Confirmar senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repita sua senha"
                                    className="w-full h-11 px-4 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5a9e4a]/40 focus:border-[#5a9e4a] transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={
                                        showConfirm
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {showConfirm ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line
                                                x1="1"
                                                y1="1"
                                                x2="23"
                                                y2="23"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Botão cadastrar */}
                        <button
                            type="submit"
                            className="w-full h-11 bg-[#3a6b35] hover:bg-[#2a5026] active:scale-[0.98] text-white font-semibold rounded-xl text-sm transition-all duration-150 mt-2 shadow-sm"
                        >
                            Criar conta
                        </button>
                    </form>

                    {/* Link para login */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Já tem uma conta?{" "}
                        <a
                            href="/login"
                            className="text-[#3a6b35] font-semibold hover:text-[#2a5026] hover:underline transition-colors"
                        >
                            Entrar
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
