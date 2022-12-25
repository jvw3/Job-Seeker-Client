import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  const NavLogoText = "< JobSeeker />"
  const renderNav = () => {
      return (
        <>
          <nav className="h-20 flex justify-between bg-gradient-to-r from-home-orange via-home-blue to-home-orange">
            <div className="flex">
              <a className="navbar-item" href="/">
                <h1 className="text-white text-2xl p-4 font-mono ">
                  {NavLogoText}
                </h1>
              </a>
            </div>
            <div className="flex w-3/12 gap-4 " ref={navbar}>
              <Link to="/about" className="text-white text-xl font-mono">
                About
              </Link>
              <Link to="/features" className="text-white text-xl font-mono">
                Features
              </Link>
              <Link to="/contact" className="text-white text-xl font-mono">
                Contact 
              </Link>
              <Link to="/login" className="text-white text-xl font-mono">
                Log in
              </Link>
              <Link to="/register" className="text-white text-xl font-mono  rounded-md h-fit p-2 bg-home-blue">
                Sign Up Free
              </Link>
            </div>
          </nav>
        </>
      );
  };
  return renderNav();
};
