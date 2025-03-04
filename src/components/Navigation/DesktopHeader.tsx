import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";

import Button from "../ui/Button";
import { FaUser } from "react-icons/fa";

import Swal from "sweetalert2";

const DesktopHeader: React.FC = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const homePages = ["/", "/login", "/register"];
  const isHomePage: boolean = homePages.includes(location.pathname);

  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      Swal.fire({
        title: "Logout successful!",
        text: "You have been logged out.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Logout failed!",
        text: "Try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Logout error:", (error as Error).message);
    }
  };

  return (
    <header
      className={`flex justify-between items-center text-white px-3 lg:px-24 py-5 border-b border-gray-200 ${
        isHomePage ? "fixed z-10 w-screen" : "static bg-[--prime] "
      }`}
    >
      <p className="text-xl lg:text-2xl font-bold mr-4">Nanny.Services</p>
      <nav className="flex">
        <ul className="flex items-center mr-12 lg:mr-24 gap-5 lg:gap-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative text-white text-lg font-medium ${
                  isActive
                    ? "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-white after:rounded-full"
                    : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nannies"
              className={({ isActive }) =>
                `relative text-white text-lg font-medium ${
                  isActive
                    ? "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-white after:rounded-full"
                    : ""
                }`
              }
            >
              Nannies
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `relative text-white text-lg font-medium ${
                    isActive
                      ? "after:content-[''] after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:w-2 after:h-2 after:bg-white after:rounded-full"
                      : ""
                  }`
                }
              >
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
        <div className="flex gap-2">
          {user ? (
            <div className="flex">
              <div className="flex items-center mr-6">
                <div className="flex items-center justify-center text-[--prime] bg-white w-10 h-10 rounded-xl mr-3">
                  <FaUser />
                </div>
                <span className="font-bold mr-4">
                  {user.displayName && user.displayName.length > 12
                    ? `${user.displayName.slice(0, 10)}...`
                    : user.displayName}
                </span>
              </div>
              <Button text="Logout" onClick={handleLogout} />
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <Button
                  className=""
                  text="Log In"
                  // border
                  backgroundColor="transparent"
                />
              </NavLink>
              <NavLink to="/register">
                <Button className="" text="Registration" />
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
