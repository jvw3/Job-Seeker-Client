import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeekerLogoZoom from "../views/HompageImages/SeekerLogoZoom.svg"
export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const navbar = useRef();

  const NavLogoText = "< JobSeeker />"

  const location = useLocation();

  const renderNav = () => {
    if (location.pathname !== "/login" || location.pathname !== "/register") {
      return (
        <>
          <nav
            className="h-20 flex justify-between bg-pinkswirl
          backdrop-filter"
          >
            <div className="flex">
              <a className="navbar-item" href="/">
                <div className="flex">
                  <img className=" h-20 ml-5 mt-2" src={SeekerLogoZoom}></img>{" "}
                  <div className="self-center ml-2 text-4xl font-roboto text-white">
                    JobSeeker
                  </div>
                </div>
              </a>
            </div>
            <div className="flex w-3/12  " ref={navbar}>
              <Link
                to="/login"
                className="text-white text-xl m-4 border rounded p-2 font-quicksand"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-white text-xl font-quicksand  rounded-md h-fit m-4 bg-home-blue border p-2"
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
