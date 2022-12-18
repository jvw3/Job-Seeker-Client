import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createBoard,
  getSingleJobForUser,
  getAllTags,
  addTag,
  createBoardJobTag,
  getAllBoardJobTagsForBoardJob,
  deleteBoardJobTag,
  getAllBoardCategoriesForBoard,
  getAllCategories,
  deleteBoardCategory,
  createBoardCategory,
} from "../managers/BoardManager";

export const ManageBoardCategories = () => {
  const [categories, setCategories] = useState([]);
  const [jobTags, setJobTags] = useState([]);
  const [boardCategories, setBoardCategories] = useState([]);
  const [currentButton, setCurrentButton] = useState("");
  const [currentBoardJob, setCurrentBoardJob] = useState({
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
    category: 0,
  });

  const navigate = useNavigate()

  const { jobId } = useParams();
  const { boardId } = useParams();

  useEffect(() => {
    getAllBoardCategoriesForBoard(boardId).then((categories) => {
      setBoardCategories(categories);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);


  return (
    <>
      <main>
        <h1>Manage Tags </h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back To board
        </button>
        <h2>Current Tags</h2>
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
            className=""
          >
            {boardCategory?.category?.name}
          </button>
        ))}
        <h2>Selectable Tags</h2>
        {categories.map((category) => (
          <button
            onClick={(evt) => {
              evt.preventDefault();

              const boardCategory = {
                board: parseInt(boardId),
                category: category.id,
              };

              createBoardCategory(boardCategory).then(() => {
                getAllBoardCategoriesForBoard(boardId).then(
                  (updateUserJobTags) => {
                    setBoardCategories(updateUserJobTags);
                  }
                );
              });
            }}
            className=""
          >
            {category.name}
          </button>
        ))}
      </main>
    </>
  );
};
