import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../managers/AuthManager";
import { getActiveBoard, getAllBoardsForUser } from "../managers/BoardManager";
import { getUpcomingInterviewsForUser } from "../managers/InterviewManager";
import { getUpcomingMeetingsForUser } from "../managers/NetworkManager"
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
              className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
            >
              Create your interview Prep!
            </button>
          ) : (
            <button
              onClick={() => {
                navigate(`/interviews/${interviewId}`);
              }}
              className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
              className="w-1/4 h-3/4 mt-7 border flex-col card bg-white shadow-xl justify-evenly p-4 hover:-translate-y-2 transition-all ease-in-ou duration-300"
            >
              <div className="card-title text-slate-600">
                {upcomingInterview?.board_job?.job?.title}
              </div>
              <div className="text-seeker-blue">
                {upcomingInterview?.board_job?.company?.name}
              </div>
              <div className="text-seeker-blue">
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
              className="w-1/4 h-3/4 mt-7 border flex-col card bg-white shadow-xl justify-evenly p-4 hover:-translate-y-2 transition-all ease-in-ou duration-300"
            >
              <div className="card-title text-slate-600">
                {setUpcomingMeetings?.board_job?.job?.title}
              </div>
              <div className="text-seeker-blue">
                {upcomingMeeting?.board_job?.company?.name}
              </div>
              <div className="text-seeker-blue">{upcomingMeeting.date}</div>
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
          <div className="flex h-full place-content-center m-12">
            <div className="text-5xl text-white">No Upcoming Interviews</div>
          </div>
        );
      } else if (meetingTabActive && upcomingMeetings.length > 0) {
        return renderUpcomingMeetings()
      } else if (meetingTabActive && upcomingMeetings.length === 0) {
        return (
          <div className="flex h-full place-content-center m-12">
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

    const renderPrioritiesForActiveJobBoard = (board) => {
      {
        board?.priorities?.map((priority) => {
          return (
            <div key={`priority--${priority.id}`} className="flex w-52 gap-x-4">
              {priority?.name} {renderPriorityandIcon(priority.name)}
            </div>
          );
        });
      }
    }

  return (
    <>
      <main className="flex-col w-full h-screen bg-pinkswirl">
        <div className="mb-10">
          <h1 className="text-5xl mt-4 ml-4 font-quicksand text-white pt-4 pl-4">
            {" "}
            {returnTimeAdjustWelcomeText()} {currentUser.firstName}{" "}
          </h1>
        </div>
        <div className="h-3/6 flex-col justify-evenly space-y-20">
          <div className="h-96 bg-cover rounded-md ml-16 mr-16">
            <div className="rounded-md h-full">
              {activeBoard.map((activeBoard) => (
                <>
                  <div
                    className="w-1/3 bg-slate-50 rounded-lg"
                    key={`activeBoard--${activeBoard.id}`}
                  >
                    <div className="w-full flex justify-center">
                      <div className="flex-col">
                        <h2 className="text-4xl text-seeker-blue pt-3 pb-3">
                          {activeBoard.title}
                        </h2>
                        <button
                          className="ml-28 mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                          onClick={() => {
                            navigate(`/boards/${activeBoard.id}`);
                          }}
                        >
                          View Board
                        </button>
                      </div>
                    </div>
                    <div  className=" bg-secondary tabs tabs-boxed w-fit ml-14 mt-3">
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
                    <div className="flex mt-2 h-54">
                      {priorityTabActive ? (
                        <div className="w-full  m-5 p-4 rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700  shadow-xl shadow-blue-500/50 text-white">
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
                      {
                        goalTabActive
                        ? <div className="w-full  m-5 p-4 rounded-md bg-white text-white shadow-xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                        <h3 className="text-3xl">Goal</h3>
                        <h4 className="mt-4">{activeBoard.goal}</h4>
                      </div>
                      : ""
                      }
                      {
                        requirementsTabActive
                        ? <div className="w-full  m-5 p-4 rounded-md bg-white text-white shadow-xl shadow-blue-500/50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                        <h3 className="text-3xl ">Requirements</h3>
                        <h4 className="mt-4">{activeBoard.requirements}</h4>
                      </div>
                      : ""
                      }
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div
            data-theme="othertheme"
            className="tabs bg-secondary tabs-boxed w-96"
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
