import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleInterview, getSingleInterviewPrep, updateInterviewPrep, updateInterview } from "../managers/InterviewManager";

// Interview Edit Component allows a user to update their interview data.

export const InterviewEdit = ({}) => {
  const { interviewId } = useParams();
  const { prepId } = useParams()

  const [interview, setInterview] = useState({
    board_job: 0,
    prep: 0,
    date: "",
    is_complete: false,
    interview_team: "",
    interview_feedback: "",
  });

  const [interviewPrep, setInterviewPrep] = useState({
    company_info: "",
  });


  useEffect(() => {
    getSingleInterview(interviewId).then((currentInterview) => {
      const updatedInterview = {
        board_job: currentInterview.board_job.id,
        prep: currentInterview.prep.id,
        date: currentInterview.date,
        is_complete: currentInterview.is_complete,
        interview_team: currentInterview.interview_team,
        interview_feedback: currentInterview.interview_feedback,
      };
      setInterview(updatedInterview);
    });
  }, []);

  useEffect(() => {
    getSingleInterviewPrep(prepId).then((currentInterviewPrep) => {
      setInterviewPrep(currentInterviewPrep);
    });
  }, []);

  const navigate = useNavigate();

  const putRequestForInterviewPrep = (event) => {
    event.preventDefault();

    const interviewPrepToApi = {
      company_info: interviewPrep.company_info,
    };

    updateInterviewPrep(interviewPrepToApi, prepId).then(() => {
      putRequestForInterview()
    })
  };

  const putRequestForInterview = () => {
    const interviewToApi = {
      board_job: interview.board_job,
      prep: interview.prep,
      date: interview.date,
      is_complete: interview.is_complete,
      interview_team: interview.interview_team,
      interview_feedback: interview.interview_feedback,
    };
    updateInterview(interviewToApi, interviewId).then(() => navigate(-1));
  };


  return (
    <>
      <main className="flex-col w-full bg-pinkswirl text-slate-500">
        <div className="h-1/6 ">
          <h1 className="p-5 text-4xl text-white">Edit Interview</h1>
        </div>
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-2/5 p-10 bg-white border rounded -md h-5/6">
            <form className="space-y-5 w-96">
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  {" "}
                  Date
                </label>
                <input
                  required
                  autoFocus
                  type="datetime-local"
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={interview.date}
                  onChange={(evt) => {
                    const copy = { ...interview };
                    copy.date = evt.target.value;
                    setInterview(copy);
                  }}
                />
              </div>
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 ">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Interviewer(s)
                </label>
                <input
                  required
                  type="text"
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={interview.interview_team}
                  onChange={(evt) => {
                    const copy = { ...interview };
                    copy.interview_team = evt.target.value;
                    setInterview(copy);
                  }}
                />
              </div>
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 ">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Company Info
                </label>
                <input
                  required
                  type="text"
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={interviewPrep.company_info}
                  onChange={(evt) => {
                    const copy = { ...interviewPrep };
                    copy.company_info = evt.target.value;
                    setInterviewPrep(copy);
                  }}
                />
              </div>
              <button
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
                size="lg"
                color="violet"
                onClick={(clickEvent) =>
                  putRequestForInterviewPrep(clickEvent)
                }
              >
                Update Interview
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
