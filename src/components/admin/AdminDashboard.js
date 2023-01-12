import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../managers/AuthManager";
import { getActiveBoard, getAllBoardsForUser } from "../managers/BoardManager";
import { getUpcomingInterviewsForUser } from "../managers/InterviewManager";
import { getUpcomingMeetingsForUser } from "../managers/NetworkManager";
import {
  IconMapPin,
  IconCurrencyDollar,
  IconBrandCashapp,
  IconCrown,
  IconFriends,
  IconMap2,
  IconUsers,
  IconX,
} from "@tabler/icons";
import { AdminUserManager } from "./AdminUserManager";

export const AdminDashboard = () => {
    const [userTabActive, setUserTabActive] = useState(true);
    const [resourceTabActive, setResourceTabActive] = useState(false);


        const controlUserTab = () => {
          if (!userTabActive) {
            setUserTabActive(true);
            setResourceTabActive(false);
          } else {
            return;
          }
        };

        const controlResourceTab = () => {
          if (!resourceTabActive) {
            setResourceTabActive(true);
            setUserTabActive(false);
          } else {
            return;
          }
        };


        const renderTabMenu = () => {
          
        };


  return (
    <>
      <main className="flex-col w-full h-screen bg-pinkswirl">
        <div className="mb-10">
          <h1 className="text-3xl text-white mt-4 ml-4">
            
          </h1>
        </div>
        <div className="w-full flex justify-center">
          <div
            data-theme="othertheme"
            className="tabs bg-secondary tabs-boxed"
          >
            <a
              onClick={() => {
                controlUserTab();
              }}
              className={` transition-all ease-in-out tab tab-lg ${
                userTabActive ? "tab-active" : "text-primary"
              }`}
            >
              Users
            </a>
            <a
              onClick={() => {
                controlResourceTab();
              }}
              className={`tab tab-lg ${
                resourceTabActive ? "tab-active" : "text-primary"
              }`}
            >
              Resource Manager
            </a>
          </div>
        </div>
        <div>
            {
                userTabActive
                ? <AdminUserManager />
                : ""
            }
        </div>
      </main>
    </>
  );
};
