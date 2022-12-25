import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  deleteBoardJob,
  getSingleInterviewForUser
} from "../managers/BoardManager";
import { deleteInterview } from "../managers/InterviewManager";

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
              if (window.confirm("Are you sure you want to delete this Interview?")) {
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

    const deleteRequestForInterview = (id) => {
      deleteInterview(id).then(() => navigate(-1));
    };

  return (
    <>
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
      <h2 className="text-2xl">Company Info:</h2>
      <p>{interview?.prep?.company_info}</p>
      <h2 className="text-2xl">Preparation Material:</h2>
      {interview?.prep?.custom_preps?.map((customPrep) => (
        <>
          <div>Title: {customPrep?.title}</div>
          <div>Description: {customPrep?.description}</div>
          <div>Content: {customPrep?.content}</div>
          <h2 className="text-2xl">Questions To Ask:</h2>
          {interview?.prep?.questions.map((question) => (
            <div>{question.content}</div>
          ))}
        </>
      ))}
    </>
  );
};
