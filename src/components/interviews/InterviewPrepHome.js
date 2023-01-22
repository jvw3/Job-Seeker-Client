import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInterviewPrepsForUser,
  getUpcomingInterviewsForUser,
} from "../managers/InterviewManager";

// Interview Prep Home Component displays all upcoming interviews for a user.

export const InterviewPrep = () => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    getUpcomingInterviewsForUser().then((upcomingInterviews) => {
      setUpcomingInterviews(upcomingInterviews);
    });
  }, []);

  const renderInterviewPrepButton = (prep, interviewId) => {
    return (
      <>
        <button
          onClick={() => {
            navigate(`/interviews/${interviewId}`);
          }}
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition-all duration-500 ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Prepare for interview
        </button>
      </>
    );
  };

  const formatTime = (date) => {
    const interviewDate = new Date(
      date
    );
    const formattedInterviewDate = interviewDate.toLocaleString();
    return formattedInterviewDate
  }

  return (
    <>
      <main className="w-full h-screen pt-8 pl-8 bg-pinkswirl">
        <h1 className="text-5xl text-white font-quicksand">Interview Prep</h1>
        <h2 className="pt-5 pb-5 text-3xl text-center text-white font-roboto">
          Upcoming Interviews
        </h2>
        <div className="flex justify-center space-x-10 h-1/2">
          {upcomingInterviews.map((upcomingInterview) => (
            <div className="relative w-1/4 pt-10 bg-white rounded-lg pl-7 pr-7 h-2/4 ">
              <div className="text-2xl text-seeker-blue">
                {upcomingInterview?.board_job?.job?.title}
              </div>
              <div className="text-xl text-seeker-blue">
                {upcomingInterview?.board_job?.company?.name}
              </div>
              <div className="text-slate-500">
                Interviewing with: {upcomingInterview?.interview_team}
              </div>
              <div className="text-slate-500">
                {formatTime(upcomingInterview.date)}
              </div>
              {renderInterviewPrepButton(
                upcomingInterview?.prep,
                upcomingInterview?.id
              )}
              <div className="absolute p-1 text-sm text-white rounded-lg top-1 right-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 ">
                {upcomingInterview?.board_job?.board?.title}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
