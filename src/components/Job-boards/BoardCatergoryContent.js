import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getAllJobsForBoard,
  getSingleBoardForUser,
} from "../managers/BoardManager";

export const BoardCategoryContent = ({ categoryId, categoryName, boardId }) => {
  const [boardJobs, setBoardJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllJobsForBoard(boardId).then((userJobs) => {
      setBoardJobs(userJobs);
    });
  }, []);

  return (
    <>
      <div className="flex-column">
        <h2 className="text-2xl text-center">{categoryName}</h2>
        {boardJobs.map((boardJob) => (
          <>
            {categoryId === boardJob?.category ? (
              <>
                <div>
                  <div className="border-solid border object-fit p-2.5 rounded-md shadow-lg
                  hover:scale-105
                  hover:shadow-xl
                  transition-all">
                    <div className="text-xl font-medium">{boardJob?.job?.title}</div>
                    <div>{boardJob?.company?.name}</div>
                    <div className="flex flex-wrap">
                      {boardJob?.tags?.map((tag) => (
                        <span className="bg-black text-white text-sm font-medium mt-1 mb-1 mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-blue-800">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div>
                      <button
                        className="transition duration-500 ease-in-out text-white bg-seeker-blue hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center mr-2 mb-2"
                        onClick={() => {
                          navigate(`/boards/${boardId}/jobs/${boardJob.id}`);
                        }}
                      >
                        {" "}
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </>
  );
};
