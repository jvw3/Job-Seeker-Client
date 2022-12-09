import { useState } from "react"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/navbar/NavBar"


export const JobSeeker = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} />
  </>
}
