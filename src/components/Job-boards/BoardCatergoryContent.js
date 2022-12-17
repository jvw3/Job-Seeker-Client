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
      <h2>{categoryName}</h2>
      {boardJobs.map((boardJob) => (
        <>
        { categoryId === boardJob?.category
          ? <>
          <div>{boardJob?.job?.title}</div>
          <div>{boardJob?.company?.name}</div>
          {
            boardJob?.tags?.map(tag => <div>{tag.name}</div>)
          }
          <button
            onClick={() => {
              navigate(`/boards/${boardId}/jobs/${boardJob.id}`);
            }}
          >
            {" "}
            View Details
          </button>
            </>
          :""
        }
        </>
      ))}
    </>
  );
};
