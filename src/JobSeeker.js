import { useState } from "react"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/navbar/NavBar"
import { SidebarNav } from "./components/views/SideBar"
import { UnauthorizedViews } from "./components/views/UnauthorizedViews"


export const JobSeeker = () => {
  const [token, setTokenState] = useState(localStorage.getItem('seeker_token'))

  const setToken = (newToken) => {
    localStorage.setItem('seeker_token', newToken)
    setTokenState(newToken)
  }


  return (
    <>
      <div className="grid-cols-1">
        {token ? (
          <>
            <main className="flex">
              <SidebarNav token={token} setToken={setToken} />
              <ApplicationViews token={token} setToken={setToken} />
            </main>
          </>
        ) : (
          <>
            <NavBar token={token} setToken={setToken} />
            <UnauthorizedViews token={token} setToken={setToken} />
          </>
        )}
      </div>
    </>
  );
}
