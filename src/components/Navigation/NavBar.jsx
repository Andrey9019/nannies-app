import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Button from "../ui/Button";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const homePages = ["/", "/login", "/register"];
  const isHomePage = homePages.includes(location.pathname);

  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Logout failed. Try again later.");
    }
  };

  return (
    <header
      className={`flex w-screen justify-between items-center text-white px-24 py-5 border-b border-gray-200 ${
        isHomePage ? "fixed z-10 " : "static bg-[#103931]"
      }`}
    >
      <p className="text-2xl font-bold">Nanny.Services</p>
      <nav className="flex">
        <ul className="flex items-center mr-24 gap-10">
          <li>
            <Link to="/" className="">
              Home
            </Link>
          </li>
          <li>
            <Link to="/nannies" className="">
              Nannies
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/favorites" className="">
                Favorites
              </Link>
            </li>
          )}
        </ul>
        <div className="flex gap-2">
          {user ? (
            <div className="flex">
              <div className="flex items-center mr-6">
                <div className="flex items-center justify-center text-[#103931] bg-white w-10 h-10 rounded-xl mr-3">
                  <FaUser />
                </div>
                <span className="font-bold mr-4">
                  {user.displayName || user.email}
                </span>
              </div>
              <Button text="Logout" onClick={handleLogout} />
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button
                  className=""
                  text="Log In"
                  border="true"
                  backgroundColor="transparent"
                />
              </Link>
              <Link to="/register">
                <Button className="" text="Registration" />
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
