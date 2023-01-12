import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInterviewPrepsForUser,
  getUpcomingInterviewsForUser,
} from "../managers/InterviewManager";

export const InterviewPrep = () => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewPreps, setInterviewPreps] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    getUpcomingInterviewsForUser().then((upcomingInterviews) => {
      setUpcomingInterviews(upcomingInterviews);
    });
  }, []);
  useEffect(() => {
    getInterviewPrepsForUser().then((interviewPreps) => {
      setUpcomingInterviews(interviewPreps);
    });
  }, []);

  const renderInterviewPrepButton = (prep, interviewId) => {
    return (
      <>
          <button
            onClick={() => {
              navigate(`/interviews/${interviewId}`);
            }}
            className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
      <main className="bg-pinkswirl w-full h-screen pt-8 pl-8">
        <h1 className="text-5xl font-quicksand text-white">Interview Prep</h1>
        <h2 className="text-3xl pt-5 pb-5 text-center font-roboto text-white">
          Upcoming Interviews
        </h2>
        <div className="flex justify-center h-1/2 space-x-10">
          {upcomingInterviews.map((upcomingInterview) => (
            <div className="bg-white w-1/4 h-2/4 p-5 rounded-lg">
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
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
