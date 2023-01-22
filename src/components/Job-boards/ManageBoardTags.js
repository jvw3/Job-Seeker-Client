import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getSingleJobForUser, getAllTags, addTag, createBoardJobTag, getAllBoardJobTagsForBoardJob, deleteBoardJobTag } from "../managers/BoardManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Manage Board Tag Component is a Modal that allows user to change their Job Tags.

export const ManageTags = () => {
const [tags, setTags] = useState([])
const [jobTags, setJobTags] = useState([])
const [isVisible, setVisibility] = useState(true)
const [currentButton, setCurrentButton] = useState("")
const { jobId } = useParams()

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
            <h2 className="mt-2 mb-2 text-white">Current Tags</h2>
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
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition-all duration-500 ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              >
                {jobTag?.tag?.name}
              </button>
            ))}
            <h2 className="mt-2 mb-2 text-white">Selectable Tags</h2>
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
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition-all duration-500 ease-in-out bg-black rounded-lg shadow-lg hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
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
