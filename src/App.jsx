import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import NanniesPage from "./page/NanniesPage";
import FavoritesPage from "./page/FavoritePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import Navbar from "./components/Navigation/NavBar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nannies" element={<NanniesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
};

export default App;
