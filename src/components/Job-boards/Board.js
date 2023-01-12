import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getAllJobsForBoard,
  getSingleBoardForUser,
  getAllBoardCategoriesForBoard,
  getAllCategories,
  deleteBoardCategory,
  createBoardCategory,
  getSinglePriorityRankForBoard,
  updatePriorityRankForBoard,
} from "../managers/BoardManager";
import { JobList } from "./JobList";
import {
  IconMapPin,
  IconCurrencyDollar,
  IconBrandCashapp,
  IconCrown,
  IconFriends,
  IconMap2,
  IconUsers,
  IconX,
  IconTie,
  IconReportMoney,
  IconSend
} from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "react-toastify/dist/ReactToastify.css";

export const BoardView = () => {
  const [categories, setCategories] = useState([]);
  const [boardCategories, setBoardCategories] = useState([]);
  const [priorityRankings, setPriorityRankings] = useState([]);
  const [board, setBoard] = useState({});
  const { boardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);

  useEffect(() => {
    getSinglePriorityRankForBoard(boardId).then((rank) => {
      setPriorityRankings(rank);
    });
  }, []);

  // Function: This function handles receiving responses that are a message from the server, versus the requested
  const handleCreateBoardCategory = (data) => {
    if (data.hasOwnProperty("message")) {
      toast.info(data.message);
    } else {
      return data;
    }
  };

  const manageBoardCategories = () => {
    return (
      <div>
        <h1 className="text-3xl">Manage Categories </h1>
        <h2 className="text-xl">Current Categories</h2>
        {boardCategories.map((boardCategory) => (
          <button
            onClick={() => {
              deleteBoardCategory(boardCategory.id).then(() => {
                getAllBoardCategoriesForBoard(boardId).then(
                  (updateUserBoardCategories) => {
                    setBoardCategories(updateUserBoardCategories);
                  }
                );
              });
            }}
            className="transition-all duration-500 ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          >
            {boardCategory?.category?.name}
          </button>
        ))}
        <h2 className="text-xl">Selectable Categories</h2>
        {categories.map((category) => (
          <button
            onClick={(evt) => {
              evt.preventDefault();

              const boardCategory = {
                board: parseInt(boardId),
                category: category.id,
              };

              createBoardCategory(boardCategory)
                .then((data) => {
                  handleCreateBoardCategory(data);
                })
                .then(() => {
                  getAllBoardCategoriesForBoard(boardId).then(
                    (updateUserJobTags) => {
                      setBoardCategories(updateUserJobTags);
                    }
                  );
                });
            }}
            className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getSingleBoardForUser(boardId).then((userJobs) => {
      setBoard(userJobs);
    });
  }, [priorityRankings]);

  useEffect(() => {
    getAllBoardCategoriesForBoard(boardId).then((categories) => {
      setBoardCategories(categories);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300
          shadow-lg shadow-blue-500/50
          dark:focus:ring-blue-800 font-medium rounded-r-lg text-sm px-4 py-2 text-center mb-2"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this Board?")) {
              deleteRequestForBoard(id);
            }
          }}
        >
          {" "}
          Delete Board
        </button>
      </>
    );
  };

  const deleteRequestForBoard = (id) => {
    deleteBoard(id)
      .then(() => {
        getAllBoardsForUser();
      })
      .then(() => navigate("/dashboard"));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(priorityRankings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPriorityRankings(items);
  };

  const updatePriorityRankings = () => {
    const arrayCopy = [...priorityRankings];
    arrayCopy.forEach((ranking) => {
      ranking.rank_value =
        arrayCopy.findIndex((item) => item.name === ranking.name) + 1;
    });
    setPriorityRankings(arrayCopy);
  };

  const sendPriorityRankingsPutRequests = (event) => {
    event.preventDefault();

    priorityRankings.map((rank) => {
      let priorityRankingToApi = {
        board: parseInt(boardId),
        name: rank.name,
        rank_value: rank.rank_value,
      };

      updatePriorityRankForBoard(priorityRankingToApi, rank.id).then(() => {
        getSinglePriorityRankForBoard(boardId).then((rank) => {
          setPriorityRankings(rank);
        });
      });
    });
  };

  // function: conditionally renders the matching icon for the draggable element title.
  const renderIconForDraggableListItem = (itemName) => {
    if (itemName === "salary") {
      return <IconBrandCashapp />;
    } else if (itemName === "location") {
      return <IconMapPin />;
    } else if (itemName === "culture") {
      return <IconFriends />;
    } else if (itemName === "leadership") {
      return <IconCrown />;
    } else {
      return <IconUsers />;
    }
  };

  // function: renders vertical drag and drop list responsible for controlling priority rankings.
  const renderPriorityDragList = () => {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="priorities">
          {(provided) => {
            return (
              <ul
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                {priorityRankings.map((priority, index) => {
                  return (
                    <Draggable
                      draggableId={priority.name}
                      key={priority.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <li
                            className="border rounded-md h-8 text-blue-500 flex gap-x-2"
                            key={priority.id}
                            index={index}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {priority.name}{" "}
                            {renderIconForDraggableListItem(priority.name)}
                          </li>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <>
      <main className="bg-pinkswirl h-screen w-screen overflow-y-auto">
        <div className="p-4 text-white">
          <h1 className="text-4xl font-quicksand ">{board.title}</h1>
        </div>
        <div className="ml-4 text-sm text-white breadcrumbs">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="">My Board</li>
          </ul>
        </div>
        <div className="ml-10 mr-10 mt-5">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className="  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center mb-2 btn-outline"
              onClick={() => {
                navigate(`/boards/${boardId}/edit`);
              }}
            >
              Edit Board
            </button>
            {renderDeleteButton(boardId)}
          </div>
          <div className="flex justify-evenly h-72">
            <div className="p-4 rounded-md bg-white shadow-lg w-3/12">
              <h2 className="text-2xl text-black">Priorities</h2>
              {renderPriorityDragList()}
              <button
                className="btn glass ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium text-sm px-4 py-2 text-center "
                onClick={(event) => {
                  updatePriorityRankings();
                  sendPriorityRankingsPutRequests(event)
                    .then(() => {
                      getSingleBoardForUser(boardId);
                    })
                    .then((board) => {
                      setBoard(board);
                    });
                  toast.success("Your priority rankings have been updated.");
                }}
              >
                Update Rankings
              </button>
            </div>
            <div className="space-y-8">
              <div className="flex justify-evenly">
                <div className="border p-4 rounded-md bg-white shadow-lg w-5/12">
                  <h2 className="text-2xl text-black">Goal</h2>
                  <div>{board.goal}</div>
                </div>
                <div className="border p-4 rounded-md bg-white shadow-lg w-5/12">
                  <h2 className="text-2xl text-black">Requirements</h2>
                  <div>{board.requirements}</div>
                </div>
              </div>
              <div className="flex justify-center pl-3 pr-3">
                <div className="stats shadow w-11/12">
                  <div className="stat">
                    <div className="stat-title text-seeker-blue">
                      Total Applications <IconSend />
                    </div>
                    <div className="stat-value text-seeker-blue">
                      {board.board_application_count}
                    </div>
                  </div>

                  <div className="stat h-36 border">
                    <div className="stat-title text-seeker-blue">
                      Total Completed Interviews <IconTie />
                    </div>
                    <div className="stat-value text-seeker-blue">
                      {board.board_completed_interview_count}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-seeker-blue">
                      Total Offers <IconReportMoney />
                    </div>
                    <div className="stat-value text-seeker-blue">
                      {board.board_offer_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <h2 className="text-3xl">Current Jobs</h2>
          <div class="shadow-sm btn-group">
            <button
              className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-4 py-2 text-center mb-2"
              onClick={() => {
                navigate(`/${boardId}/createjob`);
              }}
            >
              {" "}
              Add New Job
            </button>
            <label
              htmlFor="category-modal"
              className="btn rounded-r-md text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-4 py-2 text-center mb-2"
            >
              Manage Categories
            </label>
            <input
              type="checkbox"
              id="category-modal"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box">
                <label
                  htmlFor="category-modal"
                  className="btn btn-sm btn-square absolute right-2 top-2"
                  onClick={() => {
                    getSingleBoardForUser(boardId).then((userJob) => {
                      setBoard(userJob);
                    });
                  }}
                >
                  <IconX />
                </label>
                <h3 className="font-bold text-lg">Manage Board Categories</h3>
                {manageBoardCategories()}
                <div className="modal-action">
                  <label
                    onClick={() => {
                      getSingleBoardForUser(boardId)
                        .then((userBoard) => {
                          setBoard(userBoard);
                        })
                        .then(() => {
                          toast.success("Your categories have been saved.");
                        });
                    }}
                    htmlFor="category-modal"
                    className="btn"
                  >
                    Save Changes
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-89 bg-slate-50 p-5 rounded-md ml-5 mr-5 mb-4">
          <JobList
            userBoardCategories={board?.categories}
            boardJobs={board?.jobs}
            boardId={boardId}
            setBoardOfTopLevelComponent={setBoard}
            priorityRankings={priorityRankings}
          />
        </div>
        <ToastContainer pauseOnHover={false} autoClose={2500} />
      </main>
    </>
  );
};
