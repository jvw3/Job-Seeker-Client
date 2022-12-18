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
      <h2 className="text-2xl">{categoryName}</h2>
      {boardJobs.map((boardJob) => (
        <>
          {categoryId === boardJob?.category ? (
            <>
              <div className="border-solid border-2 w-fit">
                <div>{boardJob?.job?.title}</div>
                <div>{boardJob?.company?.name}</div>
                {boardJob?.tags?.map((tag) => (
                  <span className="bg-black-400 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-blue-800">
                    {tag.name}
                  </span>
                ))}
                <button
                  onClick={() => {
                    navigate(`/boards/${boardId}/jobs/${boardJob.id}`);
                  }}
                >
                  {" "}
                  View Details
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      ))}
    </>
  );
};
