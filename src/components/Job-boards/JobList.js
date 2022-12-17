import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getAllJobsForBoard,
  getAllJobsForBoardAndCategory,
  getSingleBoardForUser,
} from "../managers/BoardManager";
import { BoardCategoryContent } from "./BoardCatergoryContent";


export const JobList = ({ userBoardCategories, boardId }) => {



  return (
    <>
    {userBoardCategories?.map((boardCategory) => (
        <BoardCategoryContent
        key={`category--${boardCategory.id}`}
        categoryId={boardCategory?.id}
        categoryName={boardCategory?.name}
        boardId={boardId}
        />
      ))}
    </>
  );
};

// boardJobs?.map((boardJob) => {
//   renderBoardJobsInMatchingCategoryColumn(boardJob, cat);
// });
