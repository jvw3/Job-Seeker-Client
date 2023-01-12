import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createInterview } from "../managers/InterviewManager";

export const InterviewForm = () => {
    const { jobId } = useParams()

    const [interview, setInterview] = useState({
    board_job: jobId,
    date: "",
    is_complete: false,
    interview_team: "",
    interview_feedback: ""
  });

  const navigate = useNavigate();

  const postRequestForBoard = (event) => {
    event.preventDefault();

    const interviewToApi = {
      board_job: parseInt(interview.board_job),
      date: interview.date,
      is_complete: interview.is_complete,
      interview_team: interview.interview_team,
      interview_feedback: interview.interview_feedback,
    };

    createInterview(interviewToApi).then(() => navigate("/dashboard"));
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl text-slate-500">
        <div className="h-1/6 ">
          <h1 className="text-white text-4xl p-5">New Interview</h1>
        </div>
        <div className="w-full h-5/6 flex justify-center">
          <div className="border p-10 rounded -md bg-white w-2/5 h-5/6 flex-col">
            <form className="space-y-5 w-96">
              <div className="formSection rounded-md border border-slate-500 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
                  className="form-input block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  value={interview.date}
                  onChange={(evt) => {
                    const copy = { ...interview };
                    copy.date = evt.target.value;
                    setInterview(copy);
                  }}
                />
              </div>
              <div className="formSection rounded-md border border-slate-500 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 ">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Interviewer(s)
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-input block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  value={interview.interview_view}
                  onChange={(evt) => {
                    const copy = { ...interview };
                    copy.interview_team = evt.target.value;
                    setInterview(copy);
                  }}
                />
              </div>
              <button
                className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                size="lg"
                color="violet"
                onClick={(clickEvent) => postRequestForBoard(clickEvent)}
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
