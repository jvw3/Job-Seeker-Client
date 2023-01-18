import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { HomePageLanding } from "./HomePageLanding";

// Unauthorized Views component handles the routes for a visitor to the site who is not authorized.

export const UnauthorizedViews = ({ token, setToken, setUserId, setIsStaff }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} setIsStaff={setIsStaff} setUserId={setUserId} />} />
        <Route path="/" element={<HomePageLanding setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
      </Routes>
    </>
  );
};
