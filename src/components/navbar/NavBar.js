import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeekerLogoZoom from "../views/HompageImages/SeekerLogoZoom.svg"

// Nav Bar Component displays the navbar for the home landing page.

export const NavBar = () => {
  const navbar = useRef();

  const location = useLocation();

  const renderNav = () => {
    if (location.pathname !== "/login" || location.pathname !== "/register") {
      return (
        <>
          <nav
            className="flex justify-between h-20 bg-pinkswirl backdrop-filter"
          >
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
            <div className="flex w-3/12 " ref={navbar}>
              <Link
                to="/login"
                className="p-2 m-4 text-xl text-white border rounded font-quicksand"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="p-2 m-4 text-xl text-white border rounded-md font-quicksand h-fit bg-home-blue"
              >
                Sign Up Free
              </Link>
            </div>
          </nav>
        </>
      );
    } else {
      return "";
    }
  };
  return renderNav();
};
