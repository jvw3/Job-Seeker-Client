import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { createInterview, createInterviewPrep } from "../managers/InterviewManager";

// Interview Form component allows a user to create a new interview.

export const InterviewForm = () => {
    const { jobId } = useParams()

    const [interview, setInterview] = useState({
    board_job: jobId,
    prep: 0,
    date: "",
    is_complete: false,
    interview_team: "",
    interview_feedback: ""
  });
  const [interviewPrep, setInterviewPrep] = useState({
    company_info: "",
  });

  const navigate = useNavigate();

  const postRequestForInterviewPrep = (event) => {
    event.preventDefault();

    const interviewPrepToApi = {
      company_info: interviewPrep.company_info
    };

    createInterviewPrep(interviewPrepToApi).then((interviewPrepObject) => {
      postRequestForInterview(interviewPrepObject.id)
    })
  }

  const postRequestForInterview = (interviewPrepId) => {

    const interviewToApi = {
      board_job: parseInt(interview.board_job),
      prep: interviewPrepId,
      date: interview.date,
      is_complete: interview.is_complete,
      interview_team: interview.interview_team,
      interview_feedback: interview.interview_feedback,
    };
    createInterview(interviewToApi).then(() => navigate(-1));
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl text-slate-500">
        <div className="h-1/6 ">
          <h1 className="p-5 text-4xl text-white">New Interview</h1>
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
                  value={interview.interview_view}
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
                onClick={(clickEvent) => postRequestForInterviewPrep(clickEvent)}
              >
                Add New Interview!
              </button>
            </form>
          </div>
        </div>
      </main>
      ;
    </>
  );
};
