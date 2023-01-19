import { Navigate, Outlet } from "react-router-dom"

// Authorized Component enables the rendering all of appropriate routes if the token is present.

export const Authorized = ({ token }) => {
  if (token) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}