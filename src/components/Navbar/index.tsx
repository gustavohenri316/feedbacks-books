import { parseCookies } from "nookies";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserInfo } from "../UserInfo";

export function Navbar() {
  const { FeedbackBooks_Token: token } = parseCookies();
  const { user } = useAuth();
  const navigate = useNavigate();
  const goLogin = () => navigate("/login");
  const goRegister = () => navigate("/register");
  const goRegisterSummaryBook = () => navigate("/register-summary-book");

  const isToken = Boolean(token);

  return (
    <div className="flex justify-between items-center border-b py-2 px-7">
      <div>
        <Link to="/">
          <h1 className="text-4xl font-bold text-violet-800">Books Feedback</h1>
        </Link>
      </div>
      {!isToken && (
        <div className="flex items-center gap-2">
          <button
            onClick={goRegister}
            className="p-2 border rounded-md cursor-pointer hover:shadow 
        hover:bg-transparent 
          bg-violet-800 text-neutral-100 border-violet-800 transition hover:border-violet-900 hover:text-violet-900"
          >
            Cadastrar
          </button>
          <button
            onClick={goLogin}
            className="p-2 border rounded-md cursor-pointer hover:shadow transition
          hover:bg-violet-800 hover:text-neutral-100 
          text-violet-800 border-violet-800"
          >
            Fazer Login
          </button>
        </div>
      )}
      {isToken && user && (
        <div className="flex items-center gap-8">
          <button
            onClick={goRegisterSummaryBook}
            className="border rounded-md p-2 bg-violet-800 border-violet-800 hover:bg-violet-900 text-white hover:border-violet-900"
          >
            Cadastrar Resumo
          </button>
          <UserInfo />
        </div>
      )}
    </div>
  );
}
