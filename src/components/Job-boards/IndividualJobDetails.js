import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBoardJob,
  getSingleJobForUser,
  getAllInterviewsForBoardJob,
  updateBoardJob,
  getSingleBoardForUser,
  getSinglePriorityRankForBoard,
} from "../managers/BoardManager";
import {
  IconMapPin,
  IconCurrencyDollar,
  IconBrandCashapp,
  IconCrown,
  IconFriends,
  IconMap2,
  IconUsers,
  IconX,
  IconInfoCircle,
  IconDeviceDesktop,
  IconBuilding,
  IconDeviceLaptop,
  IconTrash,
} from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ManageTags } from "./ManageBoardTags";
import { deleteInterview } from "../managers/InterviewManager";

export const IndividualJobDetails = () => {
  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [priorityRankings, setPriorityRankings] = useState([]);
  const [boardJob, setBoardJob] = useState({
    job: 0,
    custom_job: "",
    company: 0,
    custom_company: "",
    has_applied: false,
    has_interviewed: false,
    interview_rounds: 0,
    received_offer: false,
    salary: 0,
    location: "",
    salary_rating: 0,
    location_rating: 0,
    culture_rating: 0,
    leadership_rating: 0,
    team_rating: 0,
    board: boardId,
    category: 0,
  });
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    getSingleJobForUser(jobId).then((userJob) => {
      setBoardJob(userJob);
    });
  }, []);

  useEffect(() => {
    getSinglePriorityRankForBoard(boardId).then((ranks) => {
      setPriorityRankings(ranks);
    });
  }, []);

  useEffect(() => {
    getAllInterviewsForBoardJob(jobId).then((userInterviews) => {
      setInterviews(userInterviews);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-r-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this Job?")) {
              deleteRequestForBoardJob(id);
            }
          }}
        >
          {" "}
          Delete Job
        </button>
      </>
    );
  };

  const putRequestForJob = (event) => {
    event.preventDefault();

    const boardJobToApi = {
      job: parseInt(boardJob.job.id),
      custom_job: boardJob.custom_job,
      company: parseInt(boardJob.company.id),
      custom_company: boardJob.custom_company,
      has_applied: boardJob.has_applied,
      has_interviewed: boardJob.has_interviewed,
      interview_rounds: boardJob.interview_rounds,
      received_offer: boardJob.received_offer,
      salary: boardJob.salary,
      location: boardJob.location,
      work_status: boardJob.work_status,
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: boardJob.board.id,
      category: parseInt(boardJob.category),
    };

    updateBoardJob(boardJobToApi, jobId);

    toast.success("Your Job Ratings have been saved.");
  };

  const renderJobRatingsBox = () => {
    return (
      <>
        <div className="mb-1 text-2xl text-white">Job Ratings</div>
        <label
          htmlFor="jobrating-modal"
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Edit Ratings
        </label>
        <div className="flex-col">
          <input
            type="checkbox"
            id="jobrating-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="relative modal-box bg-neutral">
              <label
                htmlFor="jobrating-modal"
                className="absolute btn btn-sm btn-circle right-2 top-2"
                onClick={() => {
                  getSingleJobForUser(jobId).then((userJob) => {
                    setBoardJob(userJob);
                  });
                }}
              >
                <IconX />
              </label>
              <h3 className="text-xl font-bold">Update Job Ratings</h3>
              <p>Salary Rating</p>
              <input
                type="range"
                min="0"
                max="10"
                value={boardJob.salary_rating}
                onChange={(evt) => {
                  const copy = { ...boardJob };
                  copy.salary_rating = evt.target.value;
                  setBoardJob(copy);
                }}
                className="w-full"
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <p>Location Rating</p>
              <input
                type="range"
                min="0"
                max="10"
                value={boardJob.location_rating}
                onChange={(evt) => {
                  const copy = { ...boardJob };
                  copy.location_rating = evt.target.value;
                  setBoardJob(copy);
                }}
                className="w-full"
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <p>Culture Rating</p>
              <input
                type="range"
                min="0"
                max="10"
                value={boardJob.culture_rating}
                onChange={(evt) => {
                  const copy = { ...boardJob };
                  copy.culture_rating = evt.target.value;
                  setBoardJob(copy);
                }}
                className="w-full"
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <p>Leadership Rating</p>
              <input
                type="range"
                min="0"
                max="10"
                value={boardJob.leadership_rating}
                onChange={(evt) => {
                  const copy = { ...boardJob };
                  copy.leadership_rating = evt.target.value;
                  setBoardJob(copy);
                }}
                className="w-full"
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <p>Team Rating</p>
              <input
                type="range"
                min="0"
                max="10"
                value={boardJob.team_rating}
                onChange={(evt) => {
                  const copy = { ...boardJob };
                  copy.team_rating = evt.target.value;
                  setBoardJob(copy);
                }}
                className="w-full"
                step="1"
              />
              <div className="flex justify-between w-full px-2 text-xs">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
              <div className="modal-action">
                <label
                  onClick={(clickEvent) => {
                    putRequestForJob(clickEvent).then((userJob) => {
                      setBoardJob(userJob);
                    });
                  }}
                  htmlFor="jobrating-modal"
                  className="text-white btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 "
                >
                  Save Ratings
                </label>
                <label
                  onClick={() => {
                    getSingleJobForUser(jobId).then((userJob) => {
                      setBoardJob(userJob);
                    });
                  }}
                  htmlFor="jobrating-modal"
                  className="text-white btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 "
                >
                  Close
                </label>
              </div>
            </div>
          </div>
          <div className="text-blue-500 shadow stats">
            <div className="stat bg-slate-50 ">
              <div className="text-blue-500 stat-figure">
                <IconBrandCashapp size={30} />
              </div>
              <div className="text-blue-500 stat-title">Salary Rating</div>
              <div className="text-blue-500 stat-value">
                {boardJob?.salary_rating}
              </div>
              <div className="text-blue-500 stat-desc">
                {priorityRankings.map((rank) => {
                  if (rank.name === "salary") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
            <div className="stat bg-slate-50">
              <div className="text-blue-500 stat-figure">
                <IconMap2 size={30} />
              </div>
              <div className="stat-title">Location Rating</div>
              <div className="stat-value">{boardJob?.location_rating}</div>
              <div className="stat-desc">
                {priorityRankings.map((rank) => {
                  if (rank.name === "location") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
            <div className="stat bg-slate-50">
              <div className="text-blue-500 stat-figure">
                <IconFriends size={30} />
              </div>
              <div className="stat-title">Culture Rating</div>
              <div className="stat-value">{boardJob?.culture_rating}</div>
              <div className="stat-desc">
                {priorityRankings.map((rank) => {
                  if (rank.name === "culture") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
            <div className="stat bg-slate-50">
              <div className="text-blue-500 stat-figure">
                <IconCrown size={30} />
              </div>
              <div className="stat-title">Leadership Rating</div>
              <div className="stat-value">{boardJob?.leadership_rating}</div>
              <div className="stat-desc">
                {priorityRankings.map((rank) => {
                  if (rank.name === "leadership") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
            <div className="stat bg-slate-50">
              <div className="text-blue-500 stat-figure">
                <IconUsers size={30} />
              </div>
              <div className="stat-title">Team Rating</div>
              <div className="stat-value">{boardJob?.team_rating}</div>
              <div className="stat-desc">
                {priorityRankings.map((rank) => {
                  if (rank.name === "team") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const deleteRequestForBoardJob = (id) => {
    deleteBoardJob(id).then(() => navigate(`/boards/${boardId}`));
  };

  const deleteRequestForInterview = (id) => {
    deleteInterview(id)
      .then(() => {
        getAllInterviewsForBoardJob(jobId);
      })
      .then((userInterviews) => {
        setInterviews(userInterviews);
      });
  };

  const renderTagsBox = () => {
    return (
      <div className="mt-4 mb-4 ml-5">
        <label
          htmlFor="category-modal"
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Manage Tags
        </label>
        <input type="checkbox" id="category-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-neutral">
            <label
              htmlFor="category-modal"
              className="absolute btn btn-sm btn-square right-2 top-2"
              onClick={() => {
                getSingleJobForUser(jobId).then((userBoard) => {
                  setBoardJob(userBoard);
                });
              }}
            >
              <IconX />
            </label>
            <h3 className="text-2xl font-bold text-white">Manage Tags</h3>
            <ManageTags />
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleJobForUser(jobId)
                    .then((userBoard) => {
                      setBoardJob(userBoard);
                    })
                    .then(() => {
                      toast.success("Your tags have been saved.");
                    });
                }}
                htmlFor="category-modal"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition-all duration-500 ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              >
                Save Changes
              </label>
            </div>
          </div>
        </div>
        {boardJob?.tags?.map((tag) => (
          <span className="bg-white text-seeker-blue text-sm font-medium mr-2 px-2.5 py-2 rounded">
            {tag.name}
          </span>
        ))}
      </div>
    );
  };

  const renderWorkStatusIcon = (workStatus) => {
    if (workStatus === "On-site") {
      return (
        <div className="mr-1">
          <IconBuilding size={30} />
        </div>
      );
    } else if (workStatus === "Remote") {
      return (
        <div className="mr-1">
          <IconDeviceDesktop size={30} />
        </div>
      );
    } else {
      return (
        <>
          <div className="mr-1">
            <IconBuilding size={30} /> <IconDeviceLaptop size={30} />
          </div>
        </>
      );
    }
  };

  const formatTime = (date) => {
    const interviewDate = new Date(date);
    const formattedInterviewDate = interviewDate.toLocaleString();
    return formattedInterviewDate;
  };

  return (
    <main className="w-screen h-screen pt-5 pl-5 overflow-y-auto bg-pinkswirl">
      <div className="flex">
        <div className="text-white basis-3/4">
          <h1 className="text-3xl font-quicksand">
            {boardJob?.custom_job === ""
              ? boardJob?.job?.title
              : boardJob?.custom_job}
          </h1>
          <h2 className="text-2xl font-quicksand">
            {boardJob?.custom_company === ""
              ? boardJob?.company?.name
              : boardJob?.custom_company}
          </h2>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              className="px-4 py-2 mb-2 text-sm font-medium text-center text-white rounded-l-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              onClick={() => {
                navigate(`/boards/${boardId}/jobs/${boardJob.id}/editjob`);
              }}
            >
              Edit Job
            </button>
            {renderDeleteButton(jobId)}
          </div>
          <div className="flex w-1/2 mt-2 mb-2">
            <div className="flex basis-1/4">
              <div>
                <IconCurrencyDollar size={30} />
              </div>
              <div className="text-xl">{boardJob.salary}</div>
            </div>
            <div className="flex basis-1/4">
              {renderWorkStatusIcon(boardJob.work_status)}
              <div className="text-lg">{boardJob.work_status}</div>
            </div>
            <div className="flex basis-1/2">
              <div className="mr-1">
                <IconMapPin size={30} />
              </div>
              <div className="text-lg">{boardJob.location}</div>
            </div>
          </div>

          <div className="text-sm breadcrumbs">
            <ul>
              <li className="text-slate-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="text-slate-500">
                <Link to={`/boards/${boardId}`}>My Board</Link>
              </li>
              <li>Job Details</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <div className="mt-4 mr-4 bg-cover rounded-lg h-42 bg-home">
            <div className="flex-col w-full h-20 pl-3 mr-6 text-white rounded-md text-9xl">
              <div>{boardJob.job_score}</div>
              <div className="flex justify-end">
                <div className="flex mr-2 dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-circle btn-ghost btn-xs text-info"
                  >
                    <IconInfoCircle color="white" />
                  </label>
                  <div
                    tabIndex={0}
                    className="w-64 shadow card compact dropdown-content bg-base-100 rounded-box"
                  >
                    <div className="card-body">
                      <h2 className="text-blue-500 card-title">
                        This is your job score!
                      </h2>
                      <p className="text-slate-500">
                        It is calculated by using a weighted average formula to
                        score each rating on a job based on the priorities that
                        you set on your board. These are your current priority
                        rankings:
                      </p>
                      <div className="text-slate-500">
                        {priorityRankings.map((rank) => {
                          return (
                            <div className="text-sm">
                              {rank.rank_value} {rank.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="ml-5 mr-5">{renderJobRatingsBox()}</div>
      {renderTagsBox()}
      <div className="p-5 ml-10 mr-10 bg-white border rounded-md h-2/6">
        <h2 className="text-2xl text-secondary">My Interviews</h2>
        <button
          onClick={() => {
            navigate(`/jobs/${boardJob.id}/createinterview`);
          }}
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Add New Interview
        </button>
        <div className="flex h-full pt-4 pb-4 space-x-5 overflow-x-auto">
          {interviews.map((interview) => (
            <>
              <div className="relative border hover:-translate-y-1.5 rounded-lg w-2/12 h-3/4 p-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all ease-in-ou duration-300">
                <button className="absolute top-1 right-1">
                  <IconTrash
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this Interview?"
                        )
                      ) {
                        deleteRequestForInterview(interview.id);
                      }
                    }}
                    color="white"
                  />
                </button>
                <div className="text-primary">
                  Date of Interview: {formatTime(interview.date)}
                </div>
                <div className="text-primary">
                  Interviewers: {interview.interview_team}
                </div>
                <button
                  onClick={() => {
                    navigate(`/interviews/${interview.id}`);
                  }}
                  className="px-4 py-2 mt-2 mb-2 mr-2 text-sm font-medium text-center transition ease-in-out bg-white rounded-lg shadow-lg text-seeker-blue focus:ring-blue-300 shadow-blue-500/50"
                >
                  Prepare For Interview
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
      <ToastContainer pauseOnHover={false} autoClose={2500} />
    </main>
  );
};
