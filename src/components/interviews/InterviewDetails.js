import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  deleteBoardJob,
  getSingleInterviewForUser,
} from "../managers/BoardManager";
import { deleteCustomPrep, deleteInterview } from "../managers/InterviewManager";
import { AddCustomPreps } from "./AddCustomPreps";
import { IconX } from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";

export const IndividualInterviewDetails = () => {
  const [interview, setInterview] = useState({});

  const { interviewId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getSingleInterviewForUser(interviewId).then((userInterview) => {
      setInterview(userInterview);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-r-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this Interview?")
            ) {
              deleteRequestForInterview(id);
            }
          }}
        >
          {" "}
          Delete Interview
        </button>
      </>
    );
  };

    const deleteRequestForCustomPrep = (id) => {
      deleteCustomPrep(id)
        .then(() => {
          getSingleInterviewForUser(interviewId).then((userInterview) => {
            setInterview(userInterview);
          });
        })
        
    };

  const deleteRequestForInterview = (id) => {
    deleteInterview(id).then(() => navigate(-1));
  };

  const sendToast = () => {
    toast.success("New prep has been added.")
  }

  const renderAddCustomPrepModal = () => {
    return (
      <>
        <label htmlFor="my-modal" className="btn">
          Add Custom Preps
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-slate-50">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <AddCustomPreps sendToast={sendToast} prepId={interview?.prep?.id} />
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleInterviewForUser(interviewId).then(
                    (userInterview) => {
                      setInterview(userInterview);
                    }
                  );
                }}
                htmlFor="my-modal"
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderAddPrepQuestionModal = () => {
    return (
      <>
        <label htmlFor="my-modal" className="btn">
          Add Prep Question
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-slate-50">
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <AddCustomPreps />
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleInterviewForUser(interviewId).then(() => {
                    toast.success("You have created a new custom prep.");
                  });
                }}
                htmlFor="my-modal"
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const doFunc = (id) => {
    renderDeleteModal(id)
  }

  const renderDeleteModal = (id) => {
    return (
      <>
        <input
          type="checkbox"
          id="deletecustomprep-modal"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this custom prep?
            </h3>
            <div className="flex justify-end gap-x-3">
              <div className="modal-action ">
                <label onClick={() => {
                  deleteRequestForCustomPrep(id)
                }} htmlFor="deletecustomprep-modal" className="btn">
                  Yes
                </label>
              </div>
              <div className="modal-action">
                <label htmlFor="deletecustomprep-modal" className="btn">
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <h1 className="text-3xl">
          {interview?.board_job?.company?.name} Interview
        </h1>
        <h2 className="text-2xl">{interview?.board_job?.job?.title}</h2>
        <br></br>
        <button
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center  mb-2"
          onClick={() => {
            navigate(`/editinterview/${interviewId}`);
          }}
        >
          Edit Interview
        </button>
        {renderDeleteButton(interviewId)}
        <div></div>
        <h2 className="text-2xl">Company Info:</h2>
        <p>{interview?.prep?.company_info}</p>
        <h2 className="text-2xl">Preparation Material:</h2>
        {renderAddCustomPrepModal()}
        <div className="w-1/2 flex-col">
          {interview?.prep?.custom_preps?.map((customPrep) => (
            <>
              <div className="bg-slate-50 border rounded-md h-36 w-5/6 flex-col relative">
                <label
                  htmlFor="deletecustomprep-modal"
                  onClick={() => {}}
                  className="btn btn-sm right-2 top-2 absolute w-12"
                >
                  <IconX />
                </label>
                <div>Title: {customPrep?.title}</div>
                <div>Description: {customPrep?.description}</div>
                <div>Content: {customPrep?.content}</div>
                {doFunc(customPrep?.id)}
              </div>
            </>
          ))}
        </div>
        <h2 className="text-2xl">Questions To Ask:</h2>
        {interview?.prep?.questions.map((question) => (
          <div>{question.content}</div>
        ))}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {renderAddPrepQuestionModal()}
        <ToastContainer />
      </main>
    </>
  );
};
