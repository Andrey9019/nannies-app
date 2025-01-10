import { Routes, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import NanniesPage from "./page/NanniesPage";
import FavoritesPage from "./page/FavoritePage";
// import { BrowserRouter as Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import FavoritesProvider from "./components/Favorite/content/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        {/* <App /> */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
