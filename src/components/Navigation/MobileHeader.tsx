import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { getAuth, signOut, User } from "firebase/auth";
import Button from "../ui/Button";
import Swal from "sweetalert2";

const MobileHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const user: User | undefined = auth.currentUser || undefined;

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      navigate("/");

      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Logout error:", (error as Error).message);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Logout failed. Try again later.",
      });
    }
  };

  const toggleMenu = (): void => setMenuOpen((prev) => !prev);
  const closeMenu = (): void => setMenuOpen(false);

  return (
    <>
      <header className="flex h-16 bg-[--prime] text-white px-6 py-4 justify-between items-center">
        <p className="text-xl font-bold">Nanny.Services</p>
        <button onClick={toggleMenu} className="text-xl">
          <FaBars />
        </button>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={closeMenu}
          ></div>

          <nav className="flex flex-col fixed top-0 left-0 w-full bg-[--prime] text-white px-6 py-4 z-50  ">
            <div className="flex justify-between  mb-6">
              <p className="text-xl font-bold ">Nanny.Services</p>
              <button onClick={toggleMenu} className="text-xl">
                <FaTimes />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "font-bold" : "hover:underline"}`
                  }
                  onClick={closeMenu}
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
                  onClick={closeMenu}
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
                    onClick={closeMenu}
                  >
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="mt-6">
              {user ? (
                <Button
                  text="Logout"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full bg-red-500  py-2 rounded-lg"
                ></Button>
              ) : (
                <div className="flex flex-col gap-4">
                  <NavLink
                    to="/login"
                    className="text-center py-2 border rounded-lg"
                    onClick={closeMenu}
                  >
                    Log In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-center py-2 bg-white text-[--prime] rounded-lg"
                    onClick={closeMenu}
                  >
                    Registration
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default MobileHeader;
