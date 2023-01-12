import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getAllJobsForBoard,
  getAllJobsForBoardAndCategory,
  getSingleBoardForUser,
} from "../managers/BoardManager";
import { BoardCategoryContent } from "./BoardCatergoryContent";


export const JobList = ({
  userBoardCategories,
  boardId,
  boardJobs,
  setBoardOfTopLevelComponent,
  priorityRankings,
}) => {
  return (
    <>
      <div className="flex bg-slate-50 w-full overflow-auto">
        {userBoardCategories?.map((boardCategory) => (
          <BoardCategoryContent
            key={`category--${boardCategory.id}`}
            categoryId={boardCategory?.id}
            categoryName={boardCategory?.name}
            boardId={boardId}
            boardJobs={boardJobs}
            setBoardOfTopLevelComponent={setBoardOfTopLevelComponent}
            priorityRankings={priorityRankings}
            userBoardCategories={userBoardCategories}
          />
        ))}
      </div>
    </>
  );
};

// boardJobs?.map((boardJob) => {
//   renderBoardJobsInMatchingCategoryColumn(boardJob, cat);
// });
