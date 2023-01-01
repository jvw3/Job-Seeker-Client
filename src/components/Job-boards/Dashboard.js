import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../managers/AuthManager";
import { getAllBoardsForUser } from "../managers/BoardManager";
import { getUpcomingInterviewsForUser } from "../managers/InterviewManager";

export const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [upcomingInterviews, setUpcomingInterviews] = useState([])
  const [activeTab, setActiveTab] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getAllBoardsForUser().then((userBoards) => {
      setBoards(userBoards);
    });
  }, []);

  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  useEffect(() => {
    getUpcomingInterviewsForUser().then((upcomingInterviews) => {
      setUpcomingInterviews(upcomingInterviews);
    });
  }, []);


  const returnTimeAdjustWelcomeText = () => {
    let today = new Date();
    if (today.getHours() < 12) {
      return "Good Morning, ";
    } else if (today.getHours() >= 12 && today.getHours() <= 17) {
      return "Good Afternoon, ";
    } else {
      return "Good Evening, ";
    }
  };

    const renderInterviewPrepButton = (prep) => {
      return (
        <>
          {prep === null ? (
            <button className="btn transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 pb-12 text-center mr-2 mb-2">
              Create your interview Prep!
            </button>
          ) : (
            <button className="btn transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
              Prepare for interview
            </button>
          )}
        </>
      );
    };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6">
          <h1 className="text-3xl text-white mt-4 ml-4">
            {" "}
            {returnTimeAdjustWelcomeText()} {currentUser.firstName}{" "}
          </h1>
        </div>
        <div className="h-1/5 m-4 rounded-md bg-pinkswirl bg-cover">
          <button
            className=" btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
            onClick={() => {
              navigate(`/createboard`);
            }}
          >
            Create New Board
          </button>
        </div>
        <div className="h-1/4 m-4  rounded-md p-2 bg-pinkswirl bg-cover text-white shadow-2xl bg-opacity-70">
          {boards.map((board) => (
            <>
              <div key={`board--${board.id}`}>
                <h2 className="text-2xl">{board.title}</h2>
                <button
                  className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                  onClick={() => {
                    navigate(`/boards/${board.id}`);
                  }}
                >
                  View Board
                </button>
                <h3 className="text-xl">Goal</h3>
                <h4>{board.goal}</h4>
                <h3 className="text-xl">Requirements</h3>
                <h4>{board.requirements}</h4>
              </div>
            </>
          ))}
        </div>

        <div className="">Upcoming Interviews</div>
        <div className="flex h-1/4 justify-evenly">
          {upcomingInterviews.map((upcomingInterview) => (
            <div className="w-1/4 border flex-col card bg-white shadow-xl justify-evenly p-4">
              <div className="card-title">
                {upcomingInterview?.board_job?.job?.title}
              </div>
              <div>{upcomingInterview?.board_job?.company?.name}</div>
              <div>{upcomingInterview.date}</div>
              {renderInterviewPrepButton(upcomingInterview?.prep)}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
