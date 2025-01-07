import { Routes, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import NanniesPage from "./page/NanniesPage";
import FavoritesPage from "./page/FavoritePage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/nannies" element={<NanniesPage />} />
        {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
