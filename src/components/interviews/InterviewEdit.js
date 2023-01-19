import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createInterview, getSingleInterview } from "../managers/InterviewManager";

// Interview Edit Component allows a user to update their interview data.

export const InterviewEdit = () => {
  const { interviewId } = useParams();

  const [interview, setInterview] = useState({
    board_job: 0,
    date: "",
    is_complete: false,
    interview_feedback: "",
  });


  useEffect(() => {
    getSingleInterview(interviewId).then((currentInterview) => {
      setInterview(currentInterview);
    });
  }, []);

  const navigate = useNavigate();

  const postRequestForBoard = (event) => {
    event.preventDefault();

    const interviewToApi = {
      board_job: parseInt(interview.board_job),
      date: interview.date,
      is_complete: interview.is_complete,
      interview_feedback: interview.interview_feedback,
    };

    createInterview(interviewToApi).then(() => navigate("/dashboard"));
  };

  return (
    <>
      <main>
        <h1 className="text-3xl">New Interview</h1>
      </main>
      <form>
        <fieldset className="formSection">
          <label htmlFor="name">Interview Date & Time:</label>
          <input
            required
            autoFocus
            type="datetime-local"
            className="form-control"
            placeholder="How would you describe your job search?"
            value={interview.date}
            onChange={(evt) => {
              const copy = { ...interview };
              copy.date = evt.target.value;
              setInterview(copy);
            }}
          />
        </fieldset>
        <button
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
          size="lg"
          color="violet"
          onClick={(clickEvent) => postRequestForBoard(clickEvent)}
        >
          Add New Interview!
        </button>
      </form>
    </>
  );
};
