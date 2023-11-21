import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function LayoutDefault() {
  return (
    <div className="w-screen h-screen bg-neutral-100 text-neutral-950 overflow-auto">
      <div className="container xl mx-auto">
        <div className="bg-neutral-100 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4 ">
          <div className="bg-neutral-100 rounded-md py-4 px-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
