import { useState } from "react";
import { Scale, Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email === "admin@direitopublico.com" && password === "admin123") {
        router.push("/");
      } else {
        setError("E-mail ou senha inválidos. Tente novamente.");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-8 pt-8 pb-6 border-b border-slate-700/60">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className="font-semibold text-white tracking-tight"
                  style={{ fontSize: "17px" }}
                >
                  Direito Público
                </h1>
                <p className="text-slate-400" style={{ fontSize: "12px" }}>
                  Ltda. • Sistema Jurídico
                </p>
              </div>
            </div>
            <h2
              className="text-white font-semibold"
              style={{ fontSize: "22px" }}
            >
              Bem-vindo de volta
            </h2>
            <p className="text-slate-400 mt-1" style={{ fontSize: "13px" }}>
              Faça login para acessar o sistema
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400" style={{ fontSize: "13px" }}>
                  {error}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-slate-300 font-medium mb-2 block"
                style={{ fontSize: "13px" }}
              >
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  style={{ fontSize: "13px" }}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-slate-300 font-medium"
                  style={{ fontSize: "13px" }}
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  style={{ fontSize: "12px" }}
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  style={{ fontSize: "13px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="text-slate-400 cursor-pointer select-none"
                style={{ fontSize: "13px" }}
              >
                Manter conectado
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              style={{ fontSize: "14px" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <span>Entrar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p
              className="text-center text-slate-500"
              style={{ fontSize: "12px" }}
            >
              Credenciais de demonstração: admin@direitopublico.com / admin123
            </p>
          </form>
        </div>

        <p
          className="text-center text-slate-600 mt-6"
          style={{ fontSize: "12px" }}
        >
          © 2025 Direito Público Ltda. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
