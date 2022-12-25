import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getAllBoardsForUser, getAllJobsForBoard, getSingleBoardForUser } from "../managers/BoardManager";
import { JobList } from "./JobList";

export const BoardView = () => {
  const [board, setBoard] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBoardForUser(id).then((userJobs) => {
      setBoard(userJobs);
    });
  }, []);

const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-r-lg text-sm px-4 py-2 text-center mb-2"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this Board?")) {
              deleteRequestForBoard(id);
            }
          }}
        >
          {" "}
          Delete Board
        </button>
      </>
    );
  };


  const deleteRequestForBoard = (id) => {
    deleteBoard(id)
      .then(() => {
        getAllBoardsForUser();
      })
      .then(() => navigate("/dashboard"));
  };

  return (
    <>
      <main className="ml-10 mt-10">
        <h1 className="text-4xl">{board.title}</h1>
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="transition-all duration-500 ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center mb-2"
            onClick={() => {
              navigate(`/boards/${id}/edit`);
            }}
          >
            Edit Board
          </button>
          {renderDeleteButton(id)}
        </div>
        <h2 className="text-2xl">Priorities</h2>
        <h2 className="text-2xl">Goal</h2>
        <div>{board.goal}</div>
        <h2 className="text-2xl">Requirements</h2>
        <div>{board.requirements}</div>
        <br></br>
        <div className="mt-4 bg-white pb-12 sm:pb-8">
          <div className="relative">
            <div className="absolute inset-0 h-1/2" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black-500">
                      Total Applications
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-blue-600">
                      {board.board_application_count}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black-500">
                      Total Completed Interviews
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-blue-600">
                      {board.board_completed_interview_count}
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-black-500">
                      Total Offers
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-blue-600">
                      {board.board_offer_count}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl">Current Jobs</h2>
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-l-lg text-sm px-4 py-2 text-center mb-2"
            onClick={() => {
              navigate(`/${id}/createjob`);
            }}
          >
            {" "}
            Add New Job
          </button>
          <button
            className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-r-lg text-sm px-4 py-2 text-center mb-2"
            onClick={() => {
              navigate(`/boards/${id}/managecategories`);
            }}
          >
            {" "}
            Manage Categories
          </button>
        </div>
        <JobList userBoardCategories={board?.categories} boardId={id} />
      </main>
    </>
  );
};
