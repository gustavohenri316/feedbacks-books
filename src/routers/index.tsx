import { parseCookies } from "nookies";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LayoutDefault = lazy(() => import("../Layout"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Book = lazy(() => import("../pages/Book"));

export default function Routers() {
  const { FeedbackBooks_Token: token } = parseCookies();
  if (!token) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id/:name" element={<Profile />} />
          <Route path="/book/:id/" element={<Book />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
