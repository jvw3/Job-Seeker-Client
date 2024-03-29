import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { getAllJobsForBoard, getSingleBoardForUser, getSingleJob, getSingleJobForUser, updateBoardJob } from "../managers/BoardManager";

// Board Category Content Component displays an individual column for a User's Board.

export const BoardCategoryContent = ({
  categoryId,
  categoryName,
  boardId,
  userBoardCategories,
  setBoardOfTopLevelComponent,
  boardJobs
}) => {
  const navigate = useNavigate();
  const [fetchValue, setFetchValue] = useState("");
  const [boardJob, setBoardJob] = useState({});

// This UseEffect is observing the state of fetchValue. fetchValue is a stateVariable that can be updated by a onMouseDown function. When a user clicks the button to change a job's category, the state variable is updated and the boardJob data is fetched. onMouseUp this boardJob data is used to send a put request to the server.

  useEffect(() => {
    if (fetchValue !== "") {
      getSingleJobForUser(fetchValue).then((singleBoardJob) => {
        const updatedBoardJob = {
          job: singleBoardJob?.job?.id,
          custom_job: singleBoardJob.custom_job,
          company: singleBoardJob.company.id,
          custom_company: singleBoardJob.custom_company,
          has_applied: singleBoardJob.has_applied,
          has_interviewed: singleBoardJob.has_interviewed,
          interview_rounds: singleBoardJob.interview_rounds,
          received_offer: singleBoardJob.received_offer,
          salary: singleBoardJob.salary,
          location: singleBoardJob.location,
          work_status: singleBoardJob.work_status,
          salary_rating: singleBoardJob.salary_rating,
          location_rating: singleBoardJob.location_rating,
          culture_rating: singleBoardJob.culture_rating,
          leadership_rating: singleBoardJob.leadership_rating,
          team_rating: singleBoardJob.team_rating,
          board: boardId,
          category: singleBoardJob.category,
        };
        setBoardJob(updatedBoardJob);
      });
    } else {
      return;
    }
  }, [fetchValue]);

  // Put request to update a job's category
  const JobCategoryPutRequest = (event, boardJobId, catId) => {
    event.preventDefault();

    const boardJobToApi = {
      job: parseInt(boardJob.job),
      custom_job: boardJob.custom_job,
      company: parseInt(boardJob.company),
      custom_company: boardJob.custom_company,
      has_applied: boardJob.has_applied,
      has_interviewed: boardJob.has_interviewed,
      interview_rounds: boardJob.interview_rounds,
      received_offer: boardJob.received_offer,
      salary: boardJob.salary,
      location: boardJob.location,
      work_status: boardJob.work_status,
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: boardJob.board,
      category: parseInt(catId),
    };

    updateBoardJob(boardJobToApi, boardJobId)
.then(() => getSingleBoardForUser(boardId)).then((board) => {
        setBoardOfTopLevelComponent(board)
      })
      
  };

  // function: conditionally renders all jobs in their correct categories
  const conditionallyRenderCorrectJobsInCategories = (boardJob) => {
    if (categoryId === boardJob?.category) {
      return (
        <>
          <div
            className={` bg-white border-solid border basis-1/6  p-2.5 rounded-md shadow-md shadow-blue-500 ml-2 mr-2
                      `}
          >
            <div className="flex-col">
              <div className={`text-xl font-medium text-seeker-blue`}>
                {boardJob?.custom_job === ""
                  ? boardJob?.job?.title
                  : boardJob?.custom_job}
              </div>
              <div className="text-slate-700">
                {boardJob?.custom_company === ""
                  ? boardJob?.company?.name
                  : boardJob?.custom_company}
              </div>
              <div className="text-slate-700">{boardJob.work_status}</div>
              <div className="">
                <div className="flex flex-wrap">
                  {boardJob?.tags?.map((tag) => (
                    <span className=" text-white text-sm font-medium mt-1 mb-1 mr-2 px-2.5 py-0.5 rounded bg-black">
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="text-3xl font-bold tracking-tight text-blue-600">
                  {boardJob.job_score}
                </div>
              </div>
              <div>
                <button
                  className="px-2 py-2 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg bg-seeker-blue shadow-blue-500/50"
                  onClick={() => {
                    navigate(`/boards/${boardId}/jobs/${boardJob.id}`);
                  }}
                >
                  {" "}
                  View Details
                </button>
              </div>
            </div>
            <div className="tabs tabs-boxed bg-seeker-blue">
              {userBoardCategories?.map((cat) => {
                return (
                  <a
                    onMouseDown={() => {
                      setFetchValue(boardJob?.id);
                    }}
                    onMouseUp={(event) => {
                      JobCategoryPutRequest(event, boardJob?.id, cat?.id);
                    }}
                    className={`tab tab-xs ${
                      boardJob.category === cat.id ? "tab-active" : ""
                    }`}
                  >
                    {cat?.name}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      );
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="flex-initial w-1/5 pl-3 pr-3 overflow-y-auto ">
        <div className="sticky top-0 pt-2 pb-2 bg-slate-50">
          <h2 className="text-2xl text-center text-secondary">
            {categoryName}
          </h2>
        </div>
        <div className="space-y-5">
          {boardJobs?.map((boardJob) => {
            return <div>{conditionallyRenderCorrectJobsInCategories(boardJob)}</div>;
          })}
        </div>
      </div>
    </>
  );
};

//  <DragDropContext onDragEnd={handleOnDragEnd}>
//    <Droppable key={`${categoryId}`} droppableId={`${categoryId}`}>
//      {(provided, snapshot) => {
//        return (
//          <div
//            className={`${
//              snapshot.isDraggingOver ? "bg-slate-600" : "bg-slate-50"
//            }`}
//            {...provided.droppableProps}
//            ref={provided.innerRef}
//          >
//            <h2 className="text-2xl text-center">{categoryName}</h2>
//            <div className="border ">
//              {boardJobs.map((boardJob, index) => {
//                return (
//                  <Draggable
//                    key={boardJob.id}
//                    draggableId={boardJob?.job_score}
//                    index={index}
//                  >
//                    {(provided, snapshot) => {
//                      {
//                        if (snapshot.isDragging) {
//                        }
//                      }
//                      return (
//                        <div
//                          className={`mt-4 w-48 static`}
//                          {...provided.draggableProps}
//                          {...provided.dragHandleProps}
//                          ref={provided.innerRef}
//                        >
//                          {returnConditional(provided, boardJob)}
//                        </div>
//                      );
//                    }}
//                  </Draggable>
//                );
//              })}
//              {provided.placeholder}
//            </div>
//          </div>
//        );
//      }}
//    </Droppable>
//  </DragDropContext>;
