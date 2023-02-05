import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../managers/AuthManager";
import { getActiveBoard } from "../managers/BoardManager";
import { getUpcomingInterviewsForUser } from "../managers/InterviewManager";
import { getUpcomingMeetingsForUser } from "../managers/NetworkManager"
import {
  IconMapPin,
  IconBrandCashapp,
  IconCrown,
  IconFriends,
  IconUsers,
} from "@tabler/icons";

export const Dashboard = () => {
  const [activeBoard, setActiveBoard] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [upcomingInterviews, setUpcomingInterviews] = useState([])
  const [upcomingMeetings, setUpcomingMeetings] = useState([])
  const [interviewTabActive, setInterviewTabActive] = useState(true)
  const [meetingTabActive, setMeetingTabActive] = useState(false)
  const [priorityTabActive, setPriorityTabActive] = useState(true)
  const [goalTabActive, setGoalTabActive] = useState(false)
  const [requirementsTabActive, setRequirementsTabActive] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    getActiveBoard().then((userBoards) => {
      setActiveBoard(userBoards);
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

  useEffect(() => {
    getUpcomingMeetingsForUser().then((upcomingMeetings) => {
      setUpcomingMeetings(upcomingMeetings);
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

    const renderInterviewPrepButton = (interviewId) => {
      return (
        <>
          {interviewId === null ? (
            <button
              onClick={() => {
                navigate(`/createinterview`);
              }}
              className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
            >
              Create your interview Prep!
            </button>
          ) : (
            <button
              onClick={() => {
                navigate(`/interviews/${interviewId}`);
              }}
              className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
            >
              Prepare for interview
            </button>
          )}
        </>
      );
    };

    const controlInterviewTab = () => {
      if (!interviewTabActive) {
        setInterviewTabActive(true)
        setMeetingTabActive(false)
      } else {
        return
      }
    }

    const controlMeetingTab = () => {
      if (!meetingTabActive) {
        setMeetingTabActive(true)
        setInterviewTabActive(false)
      } else {
        return
      }
    }
    const controlPriorityTab = () => {
      if (!priorityTabActive) {
        setPriorityTabActive(true)
        setGoalTabActive(false)
        setRequirementsTabActive(false)
      } else {
        return
      }
    }
    const controlGoalTab = () => {
      if (!goalTabActive) {
        setGoalTabActive(true)
        setPriorityTabActive(false)
        setRequirementsTabActive(false)
      } else {
        return
      }
    }
    const controlRequirementsTab = () => {
      if (!requirementsTabActive) {
        setRequirementsTabActive(true)
        setGoalTabActive(false)
        setPriorityTabActive(false)
      } else {
        return
      }
    }

    const formatTime = (date) => {
      const interviewDate = new Date(date);
      const formattedInterviewDate = interviewDate.toLocaleString();
      return formattedInterviewDate;
    };

    const renderUpcomingInterviews = () => {
      return (
        <div className="flex h-1/3 justify-evenly">
          {upcomingInterviews.map((upcomingInterview) => (
            <div
              key={`interview--${upcomingInterview.id}`}
              className="flex-col w-1/4 p-4 transition-all duration-300 ease-in-out bg-white border shadow-xl h-3/4 mt-7 card justify-evenly hover:-translate-y-2"
            >
              <div className="card-title text-seeker-blue">
                {upcomingInterview?.board_job?.job?.title}
              </div>
              <div className="text-slate-700">
                {upcomingInterview?.board_job?.custom_company === ""
                  ? upcomingInterview?.board_job?.company?.name
                  : upcomingInterview?.board_job?.custom_company}
              </div>
              <div className="text-slate-700">
                {formatTime(upcomingInterview.date)}
              </div>
              {renderInterviewPrepButton(upcomingInterview?.id)}
            </div>
          ))}
        </div>
      );
    }


    const renderUpcomingMeetings = () => {
      return (
        <div className="flex h-1/3 justify-evenly">
          {upcomingMeetings.map((upcomingMeeting) => (
            <div
              key={`activeBoard--${upcomingMeeting.id}`}
              className="flex-col w-1/4 p-4 transition-all duration-300 bg-white border shadow-xl h-3/4 mt-7 card justify-evenly hover:-translate-y-2 ease-in-ou"
            >
              <div className="card-title text-seeker-blue">
                {upcomingMeeting?.contact?.name}
              </div>
              <div className="text-slate-700">
                {upcomingMeeting?.contact?.current_role} @{" "}
                {upcomingMeeting?.contact?.current_company}
              </div>
              <div className="text-slate-700">
                {upcomingMeeting.description}
              </div>
              <div className="text-slate-700">
                {formatTime(upcomingMeeting.meeting_date)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const renderTabMenu = () => {
      if (interviewTabActive && upcomingInterviews.length > 0) {
        return renderUpcomingInterviews()
      } else if (interviewTabActive && upcomingInterviews.length > 0) {
        return (
          <div className="flex h-full m-12 place-content-center">
            <div className="text-5xl text-white">No Upcoming Interviews</div>
          </div>
        );
      } else if (meetingTabActive && upcomingMeetings.length > 0) {
        return renderUpcomingMeetings()
      } else if (meetingTabActive && upcomingMeetings.length === 0) {
        return (
          <div className="flex m-12 place-content-center">
            <div className="text-5xl text-white">No Upcoming Meetings</div>
          </div>
        );
      }
    }

    const renderPriorityandIcon = (priorityName) => {
      if (priorityName === "salary") {
        return  <IconBrandCashapp />;
      } else if (priorityName === "location") {
        return <IconMapPin />;
      } else if (priorityName === "culture") {
        return <IconFriends />;
      } else if (priorityName === "leadership") {
        return <IconCrown />;
      } else {
        return <IconUsers />;
      }
    }

  return (
    <>
      <main className="flex-col w-full h-screen bg-pinkswirl">
        <div className="mb-10">
          <h1 className="pt-4 pl-4 mt-4 ml-4 text-5xl text-white font-quicksand">
            {" "}
            {returnTimeAdjustWelcomeText()} {currentUser.firstName}{" "}
          </h1>
        </div>
        <div className="flex-col space-y-20 h-3/6 justify-evenly">
          <div className="ml-16 mr-16 bg-cover rounded-md h-96">
            <div className="flex justify-center h-full space-x-10 rounded-md">
              {activeBoard.map((activeBoard) => (
                <>
                  <div
                    className="w-1/3 transition-all duration-300 ease-in-out rounded-lg bg-slate-50 hover:-translate-y-2"
                    key={`activeBoard--${activeBoard.id}`}
                  >
                    <div className="flex justify-center w-full">
                      <div className="flex-col">
                        <h2 className="pt-3 pb-3 text-4xl text-seeker-blue">
                          {activeBoard.title}
                        </h2>
                        <button
                          className="px-4 py-2 mt-2 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg ml-28 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                          onClick={() => {
                            navigate(`/boards/${activeBoard.id}`);
                          }}
                        >
                          View Board
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center w-full">
                    <div className="mt-3 bg-secondary tabs tabs-boxed w-fit">
                      <a
                        onClick={() => {
                          controlPriorityTab();
                        }}
                        className={`tab ${
                          priorityTabActive
                            ? "tab-active bg-white"
                            : "text-primary"
                        }`}
                      >
                        Priorities
                      </a>
                      <a
                        className={`tab ${
                          goalTabActive ? "tab-active bg-white" : "text-primary"
                        }`}
                        onClick={() => {
                          controlGoalTab();
                        }}
                      >
                        Goal
                      </a>
                      <a
                        className={`tab ${
                          requirementsTabActive
                            ? "tab-active bg-white"
                            : "text-primary"
                        }`}
                        onClick={() => {
                          controlRequirementsTab();
                        }}
                      >
                        Requirements
                      </a>
                    </div>
                      
                    </div>
                    <div className="flex mt-1 h-52">
                      {priorityTabActive ? (
                        <div className="w-full p-2 m-5 text-white rounded-md shadow-xl h-44 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/50">
                          <h3 className="text-3xl">Priorities</h3>
                          {activeBoard?.priorities?.map((priority) => {
                            return (
                              <div
                                key={`priority--${priority.id}`}
                                className="flex w-52 gap-x-4"
                              >
                                {priority?.name}{" "}
                                {renderPriorityandIcon(priority.name)}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                      {goalTabActive ? (
                        <div className="w-full p-4 m-5 text-white bg-white rounded-md shadow-xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                          <h3 className="text-3xl">Goal</h3>
                          <h4 className="mt-4">{activeBoard.goal}</h4>
                        </div>
                      ) : (
                        ""
                      )}
                      {requirementsTabActive ? (
                        <div className="w-full p-4 m-5 text-white bg-white rounded-md shadow-xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                          <h3 className="text-3xl ">Requirements</h3>
                          <h4 className="mt-4">{activeBoard.requirements}</h4>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-center w-full">
              <button
                onClick={() => {
                  navigate("/boardmanager");
                }}
                className="px-4 py-2 mt-5 mb-5 ml-10 text-sm font-medium text-center text-white rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
              >
                Manage Boards
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div
            data-theme="othertheme"
            className="tabs bg-secondary tabs-boxed w-92"
          >
            <a
              onClick={() => {
                controlInterviewTab();
              }}
              className={` transition-all ease-in-out tab ${
                interviewTabActive ? "tab-active" : "text-primary"
              }`}
            >
              Upcoming Interviews
            </a>
            <a
              onClick={() => {
                controlMeetingTab();
              }}
              className={`tab ${
                meetingTabActive ? "tab-active" : "text-primary"
              }`}
            >
              Upcoming Meetings
            </a>
          </div>
        </div>
        {renderTabMenu()}
      </main>
    </>
  );
};
