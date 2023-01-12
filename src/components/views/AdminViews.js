
import { Route, Routes } from "react-router-dom";
import { AdminDashboard } from "../admin/AdminDashboard";
import { ResourceNotFound } from "../errorPages/NotFound";
import { Authorized } from "./Authorized";

export const AdminViews = ({ token }) => {


  return (
    <Routes>
      <Route path="*" element={<ResourceNotFound />} />
      <Route element={<Authorized token={token} />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};
