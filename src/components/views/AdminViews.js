
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../admin/AdminDashboard";
import { ResourceNotFound } from "../errorPages/NotFound";
import { Authorized } from "./Authorized";

// Admin Views Component handles the routes for an admin user.

export const AdminViews = ({ token }) => {
  return (
    <Routes>
      <Route path="*" element={<ResourceNotFound />} />
      <Route element={<Authorized token={token} />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
    </Routes>
  );
};
