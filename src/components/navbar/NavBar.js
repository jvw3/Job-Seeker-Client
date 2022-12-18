import { useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"


export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()
  const { pathname } = useLocation()

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }
  // console.log(pathname)

  const renderNav = () => {
    if (pathname !== "/" || pathname !== "/login") {
      return (
        <>
          <nav
            className="navbar is-success mb-3"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <h1 className="title is-4">Job Seeker</h1>
              </a>

              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={showMobileNavbar}
                ref={hamburger}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className="navbar-menu" ref={navbar}>
              <div className="navbar-start">
                    <Link to="/dashboard" className="navbar-item">
                      Dashboard
                    </Link>
                    <Link to="/boards" className="navbar-item">
                      My Boards
                    </Link>
                    <Link to="/myposts" className="navbar-item">
                      Network
                    </Link>
                    <Link to="/categories" className="navbar-item">
                      Interview Prep
                    </Link>
                    <Link to="/tags" className="navbar-item">
                      Resources
                    </Link>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                      <button
                        className="button is-outlined"
                        onClick={() => {
                          localStorage.removeItem("seeker_token");
                          window.location.reload("/");
                        }}
                      >
                        Logout
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return "";
    }
  }
  return (
    renderNav()
  )
}