import { useState, useEffect } from "react";
import { ApplicationViews } from "./components/views/ApplicationViews";
import { NavBar } from "./components/navbar/NavBar";
import { UnauthorizedViews } from "./components/views/UnauthorizedViews";
import { SideBarNavigation } from "./components/views/SideBarNavigation"
import { getCurrentUser } from "./components/managers/AuthManager";

export const JobSeeker = () => {
  const [token, setTokenState] = useState(localStorage.getItem("seeker_token"));
  const [userId, setUserIdState] = useState(localStorage.getItem("userId"));
  const [isStaff, setIsStaffState] = useState(localStorage.getItem("isStaff"));
  const [currentUser, setCurrentUser] = useState({})

  const setToken = (newToken) => {
    localStorage.setItem("seeker_token", newToken);
    setTokenState(newToken);
  };

  const setUserId = (newUser) => {
    localStorage.setItem("userId", newUser);
    setUserIdState(newUser);
  };

  const setIsStaff = (staffStatus) => {
    localStorage.setItem("isStaff", staffStatus);
    setIsStaffState(staffStatus);
  };


  return (
    <>
      <div className="grid-cols-1">
        {token ? (
          <>
            <main className="flex">
              <SideBarNavigation token={token} setToken={setToken} isStaff={isStaff} />
              <ApplicationViews token={token} setToken={setToken} isStaff={isStaff} />
            </main>
          </>
        ) : (
          <>
            <NavBar token={token} setToken={setToken} />
            <UnauthorizedViews
              token={token}
              setToken={setToken}
              setUserId={setUserId}
              userId={userId}
              setIsStaff={setIsStaff}
              isStaff={isStaff}
            />
          </>
        )}
      </div>
    </>
  );
};
