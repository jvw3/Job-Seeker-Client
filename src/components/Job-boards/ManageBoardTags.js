import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getSingleJobForUser, getAllTags, addTag, createBoardJobTag, getAllBoardJobTagsForBoardJob, deleteBoardJobTag } from "../managers/BoardManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

      const handleCreateJobTag = (data) => {
        if (data.hasOwnProperty("message")) {
          toast.info(data.message);
        } else {
          return data;
        }
      };

  return (
    <>
      <main className="flex-col w-full h-full">
        <div className="flex-col justify-center w-full">
          <div className="w-1/2">
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

                  createBoardJobTag(boardJobTag)
                    .then((data) => {
                      handleCreateJobTag(data);
                    })
                    .then(() => {
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
          </div>
        </div>
      </main>
    </>
  );
};
