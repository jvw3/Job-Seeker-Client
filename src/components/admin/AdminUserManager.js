import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSeekers, getCurrentUser } from "../managers/AuthManager";
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

export const AdminUserManager = () => {
  const [userTabActive, setUserTabActive] = useState(true);
  const [resourceTabActive, setResourceTabActive] = useState(false);
  const [seekers, setSeekers] = useState([])

    useEffect(() => {
      getAllSeekers().then((seekers) => {
        setSeekers(seekers);
      });
    }, []);

    const formatTime = (date) => {
      const interviewDate = new Date(date);
      const formattedInterviewDate = interviewDate.toLocaleString();
      return formattedInterviewDate;
    };

    

  return (
    <>
      <main className="flex justify-center">
        <div className="mt-5 p-4 w-10/12 bg-white h-75 rounded-lg">
        <div className="flex-col space-y-6">
        {
            seekers.map(seeker => {
                if (!seeker?.user?.is_staff) {
                    return <>
                    <div className="bg-pinkswirl text-white h-30 p-4 rounded-lg">
                    <div>{seeker.full_name}</div>
                    <div>{seeker.user.username}</div>
                    <div>{seeker.user.email}</div>
                    <div>{formatTime(seeker.user.date_joined)}</div>
                    {
                        seeker.user.is_active
                        ? <button className="btn bg-white text-seeker-blue">Deactivate User</button>
                        :<button className="btn bg-white text-seeker-blue">Activate User</button>}
                    </div>
                    </>
                } else {
                    return ""
                }
            })
        }
        </div>
        </div>
      </main>
    </>
  );
};
