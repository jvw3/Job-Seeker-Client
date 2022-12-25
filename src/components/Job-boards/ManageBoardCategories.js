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
        <h1 className="text-3xl">Manage Categories </h1>
        <button
          className="transition duration-500 ease-in-out text-white bg-black hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back To board
        </button>
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

              createBoardCategory(boardCategory).then(() => {
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
      </main>
    </>
  );
};
