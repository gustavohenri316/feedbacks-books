import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function fetchLogin() {
    signIn({ password, email });
  }
  return (
    <div className="bg-neutral-100 w-screen h-screen text-neutral-900 flex items-center  justify-center">
      <div className="p-12 bg-neutral-300 rounded-md w-96">
        <Link to="/" className="text-center">
          <h1 className="text-3xl cursor-pointer hover:text-violet-800">
            Feedback Books
          </h1>
        </Link>
        <h2 className="text-xl text-center mb-4">Entrar</h2>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            className="bg-white rounded-md p-2 text-neutral-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white rounded-md p-2 text-neutral-900"
            placeholder="Digite sua senha"
          />
          <button
            onClick={fetchLogin}
            className="p-2 rounded-md w-full bg-violet-800 hover:bg-violet-900 text-white"
          >
            Entrar
          </button>

          <span className="text-center">ou</span>
          <Link to="/register">
            <button className="p-2 rounded-md w-full bg-blue-800 hover:bg-blue-900 text-white">
              Registrar
            </button>
          </Link>
          <span className="text-center hover:underline text-neutral-500 cursor-pointer ">
            Esqueci minha senha
          </span>
        </div>
      </div>
    </div>
  );
}
