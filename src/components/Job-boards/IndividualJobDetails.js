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
} from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ManageTags } from "./ManageBoardTags";

export const IndividualJobDetails = () => {
  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [priorityRankings, setPriorityRankings] = useState([])
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
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-r-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
      board: parseInt(boardJob.board.id),
      category: parseInt(boardJob.category),
    };

    updateBoardJob(boardJobToApi, jobId);

    toast.success("Your Job Ratings have been saved.");
  };

  const renderJobRatingsBox = () => {
    return (
      <>
        <div className="text-2xl mb-1 text-white">Job Ratings</div>
        <label
          htmlFor="jobrating-modal"
          className="btn transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
            <div className="modal-box relative">
              <label
                htmlFor="jobrating-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => {
                  getSingleJobForUser(jobId).then((userJob) => {
                    setBoardJob(userJob);
                  });
                }}
              >
                <IconX />
              </label>
              <h3 className="font-bold text-xl">Update Job Ratings</h3>
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
              <div className="w-full flex justify-between text-xs px-2">
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
              <div className="w-full flex justify-between text-xs px-2">
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
              <div className="w-full flex justify-between text-xs px-2">
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
              <div className="w-full flex justify-between text-xs px-2">
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
              <div className="w-full flex justify-between text-xs px-2">
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
                  className="btn"
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
                  className="btn"
                >
                  Close
                </label>
              </div>
            </div>
          </div>
          <div className="stats shadow text-blue-500">
            <div className="stat bg-slate-50 ">
              <div className="stat-figure text-blue-500">
                <IconBrandCashapp size={30} />
              </div>
              <div className="stat-title text-blue-500">Salary Rating</div>
              <div className="stat-value text-blue-500">
                {boardJob?.salary_rating}
              </div>
              <div className="stat-desc text-blue-500">
                {priorityRankings.map((rank) => {
                  if (rank.name === "salary") {
                    return `Current Rank: ${rank.rank_value}`;
                  }
                })}
              </div>
            </div>
            <div className="stat bg-slate-50">
              <div className="stat-figure text-blue-500">
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
              <div className="stat-figure text-blue-500">
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
              <div className="stat-figure text-blue-500">
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
              <div className="stat-figure text-blue-500">
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

  const renderTagsBox = () => {
    return (
      <div className="mt-4 mb-4 ml-5">
        <label
          htmlFor="category-modal"
          className="btn transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        >
          Manage Tags
        </label>
        <input type="checkbox" id="category-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <label
              htmlFor="category-modal"
              className="btn btn-sm btn-square absolute right-2 top-2"
              onClick={() => {
                getSingleJobForUser(jobId).then((userBoard) => {
                  setBoardJob(userBoard);
                });
              }}
            >
              <IconX />
            </label>
            <h3 className="font-bold text-lg">Manage Tags</h3>
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
                className="btn"
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
      return <IconBuilding />
    } else if (workStatus === "Remote") {
      return <IconDeviceDesktop />
    } else {
      return <>
      <IconBuilding /> <IconDeviceLaptop />
      </>
    }
  }

  const formatTime = (date) => {
    const interviewDate = new Date(date);
    const formattedInterviewDate = interviewDate.toLocaleString();
    return formattedInterviewDate;
  };

  return (
    <main className="bg-pinkswirl w-full pl-5 pt-5">
      <div className="flex">
        <div className="text-white  basis-3/4">
          <h1 className="text-3xl">
            {boardJob?.custom_job === ""
              ? boardJob?.job?.title
              : boardJob?.custom_job}
          </h1>
          <h2 className="text-2xl">
            {boardJob?.custom_company === ""
              ? boardJob?.company?.name
              : boardJob?.custom_company}
          </h2>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center  mb-2"
              onClick={() => {
                navigate(`/boards/${boardId}/jobs/${boardJob.id}/editjob`);
              }}
            >
              Edit Job
            </button>
            {renderDeleteButton(jobId)}
          </div>
          <div className="flex justify-evenly w-1/4 mt-2 ml-16 mb-2 space-x-8">
            <div className="flex justify-between">
              <div>
                <IconCurrencyDollar size={30} />
              </div>
              <div className="text-xl">{boardJob.salary}</div>
            </div>
            <div className="flex">
              <div className="basis-1">
                <IconMapPin size={30} />
              </div>
              <div className="text-xl basis-4">{boardJob.location}</div>
            </div>
            <div className="flex">
              {renderWorkStatusIcon(boardJob.work_status)}
              {boardJob.work_status}
            </div>
          </div>

          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to={`/boards/${boardId}`}>My Board</Link>
              </li>
              <li>Job Details</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end flex-1">
          <div className="bg-home  bg-cover mt-4 mr-4 rounded-lg h-60">
            <div className="mr-6 rounded-md backdrop-filter backdrop-blur-lg text-white h-60 w-full text-9xl flex-col ">
              <div>{boardJob.job_score}</div>
              <div className="flex justify-center">
                <div>
              {priorityRankings.map((rank) => {
                  return (
                    <div className="text-sm">
                      {rank.name} {rank.rank_value}
                    </div>
                  );

              })}
                </div>
              <div className="dropdown dropdown-end justify-self-start">
                <label
                  tabIndex={0}
                  className="btn btn-circle btn-ghost btn-xs text-info"
                >
                  <IconInfoCircle color="white" />
                </label>
                <div
                  tabIndex={0}
                  className="card compact dropdown-content shadow bg-base-100 rounded-box w-64"
                >
                  <div className="card-body">
                    <h2 className="card-title text-blue-500">
                      This is your job score!
                    </h2>
                    <p className="text-slate-500">
                      It is calculated by using a weighted average of your
                      current priorities rankings.
                    </p>
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
      <div className="border bg-white ml-10 mr-10 p-5 rounded-md h-2/4">
        <h2 className="text-2xl text-secondary">My Interviews</h2>
        <button
          onClick={() => {
            navigate(`/jobs/${boardJob.id}/createinterview`);
          }}
          className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        >
          Add New Interview
        </button>
        <div className="overflow-y-auto h-full">
        {interviews.map((interview) => (
          <>
            <div className="text-secondary">Date of Interview: {formatTime(interview.date)}</div>
            <div className="text-secondary">Feedback: {interview.interview_feedback}</div>
            <button
              onClick={() => {
                navigate(`/interviews/${interview.id}`);
              }}
              className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
            >
              View Details
            </button>
          </>
        ))}
        </div>
      </div>
      <ToastContainer pauseOnHover={false} autoClose={2500} />
    </main>
  );
};
