import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "../components/Loading";

const LayoutDefault = lazy(() => import("../Layout"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Book = lazy(() => import("../pages/Book"));
const RegisterSummaryBook = lazy(() => import("../pages/RegisterSummaryBook"));
const FeedbackBookView = lazy(() => import("../pages/FeedbackBookView"));

export default function Routers() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen w-screen">
            <Loading />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LayoutDefault />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <Loading />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id/:name" element={<Profile />} />
          <Route path="/book/:id/" element={<Book />} />
          <Route
            path="/register-summary-book"
            element={<RegisterSummaryBook />}
          />
          <Route path="/feedback-book/:id" element={<FeedbackBookView />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
