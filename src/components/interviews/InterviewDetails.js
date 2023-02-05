import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { deleteCustomPrep, deleteInterview, getSingleInterview, updateInterview } from "../managers/InterviewManager";
import { AddCustomPreps } from "./AddCustomPreps";
import { IconTrash,} from "@tabler/icons";
import { ToastContainer, toast } from "react-toastify";

// Individual Interview Details Component displays all interview related information for a user's interview.

export const IndividualInterviewDetails = () => {
  const [interview, setInterview] = useState({});

  const { interviewId } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    getSingleInterview(interviewId).then((userInterview) => {
      setInterview(userInterview);
    });
  }, []);

  const renderDeleteButtonForInterview = (id) => {
    return (
      <>
        <button
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-r-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
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
  const renderDeleteButtonForCustomPrep = (id) => {
    return (
      <>
        <button
          className="absolute top-0 right-0 px-4 py-2 mt-1 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this Custom Prep?")
            ) {
              deleteRequestForCustomPrep(id);
            }
          }}
        >
          {" "}
          <IconTrash />
        </button>
      </>
    );
  };

    const deleteRequestForCustomPrep = (id) => {
      deleteCustomPrep(id)
        .then(() => {
          getSingleInterview(interviewId).then((userInterview) => {
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
        <label
          htmlFor="my-modal"
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Add Custom Preps
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-neutral">
            <h3 className="text-2xl font-bold text-white">
              Add New Custom Prep
            </h3>
            <AddCustomPreps
              sendToast={sendToast}
              prepId={interview?.prep?.id}
            />
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleInterview(interviewId).then(
                    (userInterview) => {
                      setInterview(userInterview);
                    }
                  );
                }}
                htmlFor="my-modal"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
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
            <h3 className="text-lg font-bold">
              Congratulations random Internet user!
            </h3>
            <AddCustomPreps />
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleInterview(interviewId).then(() => {
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

  const putRequestForInterviewStatusScheduled = (event, interview) => {
    event.preventDefault();

    const interviewToApi = {
      board_job: interview.board_job.id,
      prep: interview.prep.id,
      date: interview.date,
      is_complete: false,
      interview_team: interview.interview_team,
      interview_feedback: interview.interview_feedback,
    };

    updateInterview(interviewToApi, interview.id)
      .then(() => getSingleInterview(interview.id))
      .then((interview) => setInterview(interview));

    toast.success(`Your interview has been updated to: Scheduled.`);
  };

  const putRequestForInterviewStatusComplete = (event, interview) => {
    event.preventDefault();

    const interviewToApi = {
      board_job: interview.board_job.id,
      prep: interview.prep.id,
      date: interview.date,
      is_complete: true,
      interview_team: interview.interview_team,
      interview_feedback: interview.interview_feedback,
    };

    updateInterview(interviewToApi, interview.id)
      .then(() => getSingleInterview(interview.id))
      .then((interview) => setInterview(interview))

    toast.success(`Your interview has been updated to: Complete.`);
  };



  return (
    <>
      <main className="flex-col w-full pt-5 pl-5 bg-pinkswirl">
        <h1 className="text-4xl text-white font-quicksand">
          {interview?.board_job?.custom_company === ""
            ? interview?.board_job?.company?.name
            : interview?.board_job?.custom_company}{" "}
          Interview
        </h1>
        <h2 className="text-2xl text-white font-quicksand">
          {interview?.board_job?.custom_company === ""
            ? interview?.board_job?.job?.title
            : interview?.board_job?.custom_company}
        </h2>
        <br></br>
        <button
          className="px-4 py-2 mb-2 text-sm font-medium text-center text-white rounded-l-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
          onClick={() => {
            navigate(`/editinterview/${interviewId}/interviewprep/${interview.prep.id}`);
          }}
        >
          Edit Interview
        </button>
        {renderDeleteButtonForInterview(interviewId)}
        <div className="mt-4 mb-4">
          <div
            data-theme="othertheme"
            className="bg-white tabs tabs-boxed w-fit"
          >
            <a
              onClick={(event) => {
                putRequestForInterviewStatusScheduled(event, interview);
              }}
              className={`tab text-seeker-blue ${
                !interview?.is_complete ? "tab-active text-primary" : "text-seeker-blue"
              }`}
            >
              Scheduled
            </a>
            <a
              onClick={(event) => {
                 putRequestForInterviewStatusComplete(event, interview);
              }}
              className={`tab ${
                interview?.is_complete ? "tab-active text-primary" : "text-seeker-blue"
              } `}
            >
              Complete
            </a>
          </div>
        </div>
        <h2 className="text-2xl text-white">Company Info:</h2>
        <p className="text-white">{interview?.prep?.company_info}</p>
        <h2 className="text-2xl text-white">Preparation Material:</h2>
        {renderAddCustomPrepModal()}
        <div className="flex-col w-1/2 mt-5 space-y-5">
          {interview?.prep?.custom_preps?.map((customPrep) => (
            <>
              <div className="relative flex-col w-5/6 p-5 border rounded-md bg-slate-50 h-36">
                <div className="text-2xl text-seeker-blue">
                  Title: {customPrep?.title}
                </div>
                <div className=" text-slate-600">
                  Description: {customPrep?.description}
                </div>
                <div className="text-slate-600">
                  Content: {customPrep?.content}
                </div>
                {renderDeleteButtonForCustomPrep(customPrep?.id)}
              </div>
            </>
          ))}
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

