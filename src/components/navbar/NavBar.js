import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeekerLogoZoom from "../views/HompageImages/SeekerLogoZoom.svg";

// Nav Bar Component displays the navbar for the home landing page.

export const NavBar = () => {
  const navbar = useRef();

  const location = useLocation();

  const renderNav = () => {
    if (location.pathname === "/login" ) {
      return ""
    } else if (location.pathname === "/register") {
      return ""
    } else {
      return (
        <>
          <div className="bg-pinkswirl">
            <nav className="flex justify-between h-24 pt-5">
              <div className="flex">
                <a className="navbar-item" href="/">
                  <div className="flex">
                    <img className="h-20 mt-2 ml-5 " src={SeekerLogoZoom}></img>{" "}
                    <div className="self-center ml-2 text-4xl text-white font-roboto">
                      JobSeeker
                    </div>
                  </div>
                </a>
              </div>
              <div className="flex justify-end w-3/12 mr-5" ref={navbar}>
                <Link
                  to="/login"
                  className="p-2 m-4 text-xl text-white transition-all duration-300 ease-in-out border rounded-lg font-quicksand h-fit hover:bg-white hover:text-seeker-blue"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="p-2 m-4 text-xl text-white transition-all duration-300 ease-in-out border rounded-md font-quicksand h-fit hover:bg-white hover:text-seeker-blue"
                >
                  Sign Up Free
                </Link>
              </div>
            </nav>
          </div>
        </>
      );
    }
  };
  return renderNav();
};
