import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInterviewPrepsForUser,
  getUpcomingInterviewsForUser,
} from "../managers/InterviewManager";

export const InterviewPrep = () => {
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviewPreps, setInterviewPreps] = useState([]);

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

  const renderInterviewPrepButton = (prep) => {
    return (
      <>
        {prep === null ? (
          <button className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
            Create your interview Prep!
          </button>
        ) : (
          <button className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
            Prepare for interview
          </button>
        )}
      </>
    );
  };

  return (
    <>
      <main className="ml-10 mt-10">
        <h1 className="text-4xl">Interview Prep</h1>
        <button className="transition-all duration-500 ease-in-out text-white bg-black hover:bg-grey focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
          Create New Interview Prep
        </button>
        <h2 className="text-2xl">Upcoming Interviews</h2>
        <div className="flex justify-center justify-evenly">
          {upcomingInterviews.map((upcomingInterview) => (
            <div>
              <div>{upcomingInterview?.board_job?.job?.title}</div>
              <div>{upcomingInterview?.board_job?.company?.name}</div>
              <div>{upcomingInterview.date}</div>
              {renderInterviewPrepButton(upcomingInterview?.prep)}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
