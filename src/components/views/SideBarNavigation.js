import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconMenu2,
  IconLayoutDashboard,
  IconListDetails,
  IconNetwork,
  IconUserCheck,
  IconLogout,
  IconTie,
  IconFiles,
  IconBrowserCheck,
} from "@tabler/icons";

// SidebarNavigation component renders the sidebar for seeker and admin views.

export const SideBarNavigation = ({isStaff}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const location = useLocation();

  const renderSeekerSideBar = () => {
    return (
      <>
        <main
          className={`min-h-screen ${
            open ? "w-72" : "w-20"
          } duration-500 bg-pinkswirl bg-cover text-white px-4`}
        >
          <div className="flex justify-end py-3">
            <IconMenu2 onClick={() => setOpen(!open)} />
          </div>
          <div className="relative flex flex-col gap-4 mt-4">
            <Link
              to="/dashboard"
              className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md ${
                location.pathname === "/dashboard" ? "bg-blue-500" : ""
              }`}
            >
              <div className="">
                <IconLayoutDashboard />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 overflow-hidden" : ""
                }`}
              >
                Dashboard
              </h2>
            </Link>
            <Link
              to="/boardmanager"
              className={`flex items-center text-sm gap-3.5 font-medium p-2 pr-0 hover:bg-blue-900 rounded-md ${
                location.pathname === "/boards" ? "bg-blue-500" : ""
              }`}
            >
              <div>
                <IconListDetails />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 overflow-hidden" : ""
                }`}
              >
                Manage Boards
              </h2>
            </Link>
            <Link
              to="/interviewprep"
              className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md ${
                location.pathname === "/interviewprep" ? "bg-blue-500" : ""
              }`}
            >
              <div>
                <IconTie />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 overflow-hidden" : ""
                }`}
              >
                Interview Prep
              </h2>
            </Link>
            <Link
              to="/network"
              className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md ${
                location.pathname === "/network" ? "bg-blue-500" : ""
              }`}
            >
              <div>
                <IconNetwork />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 " : ""
                }`}
              >
                Network
              </h2>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md ${
                location.pathname === "/profile" ? "bg-blue-500" : ""
              }`}
            >
              <div>
                <IconUserCheck />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 " : ""
                }`}
              >
                Profile
              </h2>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md"
            >
              <div>
                <IconLogout />
              </div>
              <h2
                onClick={() => {
                  localStorage.removeItem("seeker_token");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("isStaff");
                  navigate("/");
                  window.location.reload("/");
                }}
                className={`whitespace-pre duration-500 ${
                  !open ? "opacity-0 overflow-hidden" : ""
                }`}
              >
                Logout
              </h2>
            </Link>
          </div>
        </main>
      </>
    );
  };

  const renderAdminSideBar = () => {
    return (
      <main
        className={`min-h-screen ${
          open ? "w-72" : "w-20"
        } duration-500 bg-pinkswirl bg-cover text-white px-4`}
      >
        <div className="flex justify-end py-3">
          <IconMenu2 onClick={() => setOpen(!open)} />
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          <Link
            to="/dashboard"
            className={`flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md ${
              location.pathname === "/dashboard" ? "bg-blue-500" : ""
            }`}
          >
            <div className="">
              <IconLayoutDashboard />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open ? "opacity-0 overflow-hidden" : ""
              }`}
            >
              Home
            </h2>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-900 rounded-md"
          >
            <div>
              <IconLogout
                onClick={() => {
                  localStorage.removeItem("seeker_token");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("isStaff");
                  navigate("/");
                  window.location.reload("/");
                }}
              />
            </div>
            <h2
              onClick={() => {
                localStorage.removeItem("seeker_token");
                localStorage.removeItem("userId");
                localStorage.removeItem("isStaff");
                navigate("/");
                window.location.reload("/");
              }}
              className={`whitespace-pre duration-500 ${
                !open ? "opacity-0 overflow-hidden" : ""
              }`}
            >
              Logout
            </h2>
          </Link>
        </div>
      </main>
    );
  }

  return <>{renderSeekerSideBar()}</>;
};
