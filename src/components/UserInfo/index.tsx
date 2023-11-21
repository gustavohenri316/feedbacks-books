import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export function UserInfo() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { signOut } = useAuth();

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
          src={user?.avatarURL}
          alt={`Foto de ${name}`}
          onClick={click}
          className="h-14 w-14 rounded-full cursor-pointer"
        />
      </div>
      {open && (
        <div className="absolute top-full right-0 w-56 mt-2 ">
          <div className="bg-neutral-400 rounded-md w-auto p-2">
            <div className="flex flex-col gap-1">
              <span
                onClick={signOut}
                className="w-full rounded-md cursor-pointer hover:bg-neutral-100 p-2"
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
