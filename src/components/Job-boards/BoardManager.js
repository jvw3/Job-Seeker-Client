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

export const BoardManager = () => {
  const [activeBoard, setActiveBoard] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const navigate = useNavigate();
  const [interviewTabActive, setInterviewTabActive] = useState(true);
  const [meetingTabActive, setMeetingTabActive] = useState(false);

  useEffect(() => {
    getActiveBoard().then((userBoard) => {
      setActiveBoard(userBoard);
    });
  }, []);

  useEffect(() => {
    getAllBoardsForUser().then((userBoards) => {
      setAllBoards(userBoards);
    });
  }, []);


  return (
    <>
      <main className="flex-col w-full h-screen bg-pinkswirl">
        <div className="mb-10">
          <h1 className="text-3xl text-white mt-4 ml-4">Current Board</h1>
        </div>
        <div className="h-2/5 flex-col justify-evenly space-y-20">
          <div className="h-96 bg-pinkswirl bg-cover rounded-md ml-4 mr-4">
            <div className="rounded-md  backdrop-filter backdrop-blur-lg backdrop-brightness-75 h-full">
              {activeBoard.map((activeBoard) => (
                <>
                  <div key={`activeBoard--${activeBoard.id}`}>
                    <div className="w-full flex justify-center">
                      <div className="flex-col">
                        <h2 className="text-4xl">{activeBoard.title}</h2>
                        <button
                          className="ml-28 mt-2 btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                          onClick={() => {
                            navigate(`/boards/${activeBoard.id}`);
                          }}
                        >
                          View Board
                        </button>
                      </div>
                    </div>
                    <div className="flex mt-2 h-54">
                      <div className="w-2/6 border m-5 p-4 rounded-md bg-white text-seeker-blue">
                        <h3 className="text-3xl">Priorities</h3>
                        {activeBoard?.priorities?.map((priority) => {
                          return (
                            <div className="flex w-52 gap-x-4">
                              {priority?.name}{" "}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-2/6 border m-5 p-4 rounded-md bg-white text-seeker-blue">
                        <h3 className="text-3xl">Goal</h3>
                        <h4 className="mt-4">{activeBoard.goal}</h4>
                      </div>
                      <div className="w-2/6 border m-5 p-4 rounded-md bg-white text-seeker-blue">
                        <h3 className="text-3xl">Requirements</h3>
                        <h4 className="mt-4">{activeBoard.requirements}</h4>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <h2 className="text-center mt-5 text-3xl">Board List</h2>
        <button
          className=" btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mt-5 mb-5 ml-10"
          onClick={() => {
            navigate(`/createboard`);
          }}
        >
          Create New Board
        </button>
        <div className="h-1/2 overflow-y-auto">
          {allBoards.map((board) => {
            return (
              <div className="border rounded-lg ml-40 mr-40 h-1/4 bg-white">
                <div className="text-3xl ml-3 mt-3">{board.title}</div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};
