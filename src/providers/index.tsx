import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

interface IProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: IProviders) {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
