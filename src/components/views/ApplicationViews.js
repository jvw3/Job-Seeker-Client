import { getCurrentUser } from "../managers/AuthManager";
import { useState, useEffect } from "react";
import { AdminViews } from "./AdminViews";
import { SeekerViews } from "./SeekerViews";





export const ApplicationViews = ({ token, setToken }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);


    if (currentUser.isStaff) {
      return <AdminViews token={token} setToken={setToken} />;
    } else {
      return <SeekerViews token={token} setToken={setToken} />;
    }
};
