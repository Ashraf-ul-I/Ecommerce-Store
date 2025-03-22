import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPages from "./pages/SignUpPages";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import "../src/style.css";  // Import CSS file
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="gradient-bg"></div>
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPages />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;
