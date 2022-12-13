import { useState } from "react"
import { ApplicationViews } from "./components/views/ApplicationViews"
import { NavBar } from "./components/navbar/NavBar"


export const JobSeeker = () => {
  const [token, setTokenState] = useState(localStorage.getItem('seeker_token'))

  const setToken = (newToken) => {
    localStorage.setItem('seeker_token', newToken)
    setTokenState(newToken)
  }

  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} />
  </>
}
