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
    {userBoardCategories?.map((category) => (
        <BoardCategoryContent
        key={`category--${category.id}`}
        categoryId={category.id}
        categoryName={category.name}
        boardId={boardId}
        />
      ))}
    </>
  );
};

// boardJobs?.map((boardJob) => {
//   renderBoardJobsInMatchingCategoryColumn(boardJob, cat);
// });
