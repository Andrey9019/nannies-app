import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Logout failed. Try again later.");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="h-16 bg-[#103931] text-white px-6 py-4 flex justify-between items-center">
      <p className="text-xl font-bold">Nanny.Services</p>
      <button onClick={toggleMenu} className="text-xl">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#103931] text-white p-6 z-50">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg ${isActive ? "font-bold" : "hover:underline"}`
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nannies"
                className={({ isActive }) =>
                  `text-lg ${isActive ? "font-bold" : "hover:underline"}`
                }
                onClick={toggleMenu}
              >
                Nannies
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "font-bold" : "hover:underline"}`
                  }
                  onClick={toggleMenu}
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
          <div className="mt-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/login"
                  className="text-center py-2 border rounded-lg"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-center py-2 bg-white text-[#103931] rounded-lg"
                >
                  Registration
                </NavLink>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;
