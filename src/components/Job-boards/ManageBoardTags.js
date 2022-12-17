import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getSingleJobForUser, getAllTags, addTag, createBoardJobTag, getAllBoardJobTagsForBoardJob, deleteBoardJobTag } from "../managers/BoardManager";
import "./ManageBoardTags.css"
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
          onClick={() => {
            navigate(-1);
          }}
        >Back To Job</button>
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
            className=""
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
            className=""
          >
            {tag.name}
          </button>
        ))}
      </main>
    </>
  );
};
