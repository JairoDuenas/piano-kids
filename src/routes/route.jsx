import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as the app grows */}
      </Routes>
    </BrowserRouter>
  );
}
