import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBoard, getActiveBoard, getAllBoardsForUser, updateBoard } from "../managers/BoardManager";
import {
  IconMapPin,
  IconBrandCashapp,
  IconCrown,
  IconFriends,
  IconUsers,
  IconTrash
} from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";

// Manage Board Component allows users to update their board status and delete their boards.

export const BoardManager = () => {
  const [activeBoard, setActiveBoard] = useState([]);
  const [allBoards, setAllBoards] = useState([]);
  const [priorityTabActive, setPriorityTabActive] = useState(true);
  const [goalTabActive, setGoalTabActive] = useState(false);
  const [requirementsTabActive, setRequirementsTabActive] = useState(false);
  const navigate = useNavigate();

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

  const controlPriorityTab = () => {
    if (!priorityTabActive) {
      setPriorityTabActive(true);
      setGoalTabActive(false);
      setRequirementsTabActive(false);
    } else {
      return;
    }
  };
  const controlGoalTab = () => {
    if (!goalTabActive) {
      setGoalTabActive(true);
      setPriorityTabActive(false);
      setRequirementsTabActive(false);
    } else {
      return;
    }
  };
  const controlRequirementsTab = () => {
    if (!requirementsTabActive) {
      setRequirementsTabActive(true);
      setGoalTabActive(false);
      setPriorityTabActive(false);
    } else {
      return;
    }
  };

  const renderPriorityandIcon = (priorityName) => {
    if (priorityName === "salary") {
      return <IconBrandCashapp />;
    } else if (priorityName === "location") {
      return <IconMapPin />;
    } else if (priorityName === "culture") {
      return <IconFriends />;
    } else if (priorityName === "leadership") {
      return <IconCrown />;
    } else {
      return <IconUsers />;
    }
  };

  const putRequestForBoardStatusActive = (event,board) => {
    event.preventDefault();

    const boardToApi = {
      title: board.title,
      goal: board.goal,
      requirements: board.requirements,
      is_active: true
    };

    updateBoard(boardToApi, board.id)
      .then(() => getAllBoardsForUser())
      .then((boards) => setAllBoards(boards))
      .then(() => getActiveBoard())
      .then((boards) => setActiveBoard(boards));

    toast.success(`Your board: ${board.title} has been updated to: Active.`);
  }

  const putRequestForBoardStatusInactive = (event,board) => {
    event.preventDefault();

    const boardToApi = {
      title: board.title,
      goal: board.goal,
      requirements: board.requirements,
      is_active: false
    };

    updateBoard(boardToApi, board.id)
      .then(() => getAllBoardsForUser())
      .then((boards) => setAllBoards(boards))
      .then(() => getActiveBoard())
      .then((boards) => setActiveBoard(boards));

    toast.success(`Your board: ${board.title} has been updated to: Inactive.`);
  }



      const renderDeleteBoardButton = (id) => {
        return (
          <>
            <button
              className="absolute top-0 right-0 px-4 py-2 mt-1 mb-2 mr-1 text-sm font-medium text-center text-white rounded-md shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50 dark:focus:ring-blue-800"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this Board?"
                  )
                ) {
                  deleteRequestForBoard(id);
                }
              }}
            >
              {" "}
              <IconTrash size={20} />
            </button>
          </>
        );
      };

      const deleteRequestForBoard = (id) => {
        deleteBoard(id).then(() => {
          getAllBoardsForUser().then((boards) => setAllBoards(boards));
        });
      };

  return (
    <>
      <main className="flex-col w-screen h-screen bg-pinkswirl">
        <div className="mb-10">
          <h1 className="mt-4 ml-4 text-4xl text-white font-quicksand">Active Boards</h1>
        </div>
        <div className="flex-col space-y-20 h-2/5 justify-evenly">
          <div className="ml-4 mr-4 bg-cover rounded-md h-96">
            <div className="flex justify-center h-full space-x-10 rounded-md">
              {activeBoard.map((activeBoard) => (
                <>
                  <div
                    className="w-1/3 rounded-lg bg-slate-50"
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
                    <div>
                      
                    <div className="mt-3 bg-secondary tabs tabs-boxed w-fit ml-14">
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
          </div>
        </div>
        <h2 className="mt-5 text-3xl text-center text-white font-quicksand">Board List</h2>
        <button
          className="px-4 py-2 mt-5 mb-5 ml-10 text-sm font-medium text-center text-white rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
          onClick={() => {
            navigate(`/createboard`);
          }}
        >
          Create New Board
        </button>
        <div className="flex ml-10 space-x-5 h-1/2 wrap">
          {allBoards.map((board) => {
            return (
              <div className="relative w-1/4 bg-white border rounded-lg h-1/4">
                <div className="mt-3 ml-3 mr-3 text-3xl text-seeker-blue">{board.title}</div>
                <div className="flex justify-evenly">
                  <button
                    className="px-4 py-2 mt-4 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                    onClick={() => {
                      navigate(`/boards/${board.id}`);
                    }}
                  >
                    View Board
                  </button>
                    <div className="tabs tabs-boxed bg-secondary h-fit">
                      <a
                        onClick={(event) => {
                          putRequestForBoardStatusActive(event, board);
                        }}
                        className={`tab ${
                          board?.is_active ? "tab-active" : "text-white"
                        }`}
                      >
                        Active
                      </a>
                      <a
                        onClick={(event) => {
                          putRequestForBoardStatusInactive(event, board);
                        }}
                        className={`tab ${
                          !board?.is_active ? "tab-active" : "text-white"
                        }`}
                      >
                        Inactive
                      </a>
                    </div>
                </div>
                {renderDeleteBoardButton(board.id)}
              </div>
            );
          })}
        </div>
        <ToastContainer />
      </main>
    </>
  );
};
