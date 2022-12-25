import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getSingleJobForUser, getAllTags, addTag, createBoardJobTag, getAllBoardJobTagsForBoardJob, deleteBoardJobTag } from "../managers/BoardManager";

export const ManageTags = () => {
const [tags, setTags] = useState([])
const [jobTags, setJobTags] = useState([])
const [isVisible, setVisibility] = useState(true)
const [currentButton, setCurrentButton] = useState("")

const { jobId } = useParams()
const { boardId } = useParams()
const navigate = useNavigate();

  useEffect(() => {
    getAllBoardJobTagsForBoardJob(jobId).then((tags) => {
      setJobTags(tags);
    });
  }, []);

    useEffect(() => {
    getAllTags().then((allTags) => {
        setTags(allTags);
    });
    }, []);

  return (
    <>
      <main>
        <h1>Manage Tags </h1>
        <button
          className="transition duration-500 ease-in-out text-white bg-black hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back To Job
        </button>
        <h2>Current Tags</h2>
        {jobTags?.map((jobTag) => (
          <button
            onClick={() => {
              deleteBoardJobTag(jobTag.id).then(() => {
                getAllBoardJobTagsForBoardJob(jobId).then(
                  (updateUserJobTags) => {
                    setJobTags(updateUserJobTags);
                  }
                );
              });
            }}
            className="transition-all duration-500 ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          >
            {jobTag?.tag?.name}
          </button>
        ))}
        <h2>Selectable Tags</h2>
        {tags.map((tag) => (
          <button
            onClick={(evt) => {
              evt.preventDefault();

              const boardJobTag = {
                board_job: jobId,
                tag: tag.id,
              };

              createBoardJobTag(boardJobTag).then(() => {
                getAllBoardJobTagsForBoardJob(jobId).then(
                  (updateUserJobTags) => {
                    setJobTags(updateUserJobTags);
                  }
                );
              });
            }}
            className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          >
            {tag.name}
          </button>
        ))}
      </main>
    </>
  );
};
