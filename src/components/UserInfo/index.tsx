import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface IUserInfo {
  name: string;
  email: string;
  avatarUrl: string;
  id: number;
}
export function UserInfo({
  avatarUrl = "",
  email = "",
  id = 0,
  name = "",
}: IUserInfo) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const goProfile = () => navigate(`/profile/${id}/${name}?email=${email}`);

  const click = () => setOpen(!open);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative w-full flex items-center justify-end">
        <img
          src={avatarUrl}
          alt={`Foto de ${name}`}
          onClick={click}
          className="h-14 w-14 rounded-full cursor-pointer"
        />
      </div>
      {open && (
        <div className="absolute top-full right-0 w-56 mt-2">
          <div className="bg-neutral-700 rounded-md w-auto">
            <div className="flex flex-col gap-1">
              <span
                className="w-full rounded-t-md cursor-pointer hover:bg-neutral-800 p-2"
                onClick={goProfile}
              >
                Perfil
              </span>
              <span className="w-full cursor-pointer hover:bg-neutral-800 p-2">
                Meus compartilhamentos
              </span>
              <span
                onClick={signOut}
                className="w-full rounded-b-md cursor-pointer hover:bg-neutral-800 p-2"
              >
                Sair
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
