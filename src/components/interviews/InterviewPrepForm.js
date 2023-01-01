import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createInterview } from "../managers/InterviewManager";

export const InterviewPrepForm = () => {

//     const [interviewPrep, setInterviewPrep] = useState({
//     board_job: jobId,
//     date: "",
//     is_complete: false,
//     interview_feedback: ""
//   });

//   const navigate = useNavigate();

//   const postRequestForBoard = (event) => {
//     event.preventDefault();

//     const interviewToApi = {
//       board_job: parseInt(interview.board_job),
//       date: interview.date,
//       is_complete: interview.is_complete,
//       interview_feedback: interview.interview_feedback,
//     };

//     createInterview(interviewToApi).then(() => navigate("/dashboard"));
//   };

//   return (
//     <>
//       <main>
//         <h1 className="text-3xl">New Interview</h1>
//       </main>
//       <form>
//         <fieldset className="formSection">
//           <label htmlFor="name">Interview Date & Time:</label>
//           <input
//             required
//             autoFocus
//             type="datetime-local"
//             className="form-control"
//             placeholder="How would you describe your job search?"
//             value={interview.date}
//             onChange={(evt) => {
//               const copy = { ...interview };
//               copy.date = evt.target.value;
//               setInterview(copy);
//             }}
//           />
//         </fieldset>
//         <button
//           className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
//           size="lg"
//           color="violet"
//           onClick={(clickEvent) => postRequestForBoard(clickEvent)}
//         >
//           Add New Interview!
//         </button>
//       </form>
//     </>
//   );
};