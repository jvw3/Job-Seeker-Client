import { getCurrentUser } from "../managers/AuthManager";
import { useState, useEffect } from "react";
import { AdminViews } from "./AdminViews";
import { SeekerViews } from "./SeekerViews";

// Application Views Component renders the correct user view depending on the isStaff property.


export const ApplicationViews = ({ token, setToken, isStaff }) => {
    
      return <SeekerViews token={token} setToken={setToken} />;
    
};
