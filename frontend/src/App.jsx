import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPages from "./pages/SignUpPages";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import "../src/style.css";  // Import CSS file
import { Toaster } from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const {user,checkAuth,checkingAuth}=useUserStore();

  useEffect(()=>{
   checkAuth();
  },[checkAuth])

  if(checkingAuth) return <LoadingSpinner/>
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
          <Route path="/signup" element={!user?<SignUpPages />:<Navigate to={'/'}/>}/>
          <Route path="/login" element={!user?<LoginPage />:<Navigate to={'/'}/>} />
          <Route path="/secret-dashboard" element={user?.role === 'admin'?<AdminPage />:<Navigate to={'/login'}/>} />
          <Route path="/category/:category" element={<CategoryPage/>} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;
