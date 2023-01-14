import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { getAllJobsForBoard, getSingleBoardForUser, getSingleJob, getSingleJobForUser, updateBoardJob } from "../managers/BoardManager";

export const BoardCategoryContent = ({
  categoryId,
  categoryName,
  boardId,
  priorityRankings,
  userBoardCategories,
  setBoardOfTopLevelComponent,
  boardJobs
}) => {
  // const [boardJobs, setBoardJobs] = useState([]);
  const navigate = useNavigate();
  const [fetchValue, setFetchValue] = useState(0);
  const [boardJob, setBoardJob] = useState({});

  // useEffect(() => {
  //   getAllJobsForBoard(boardId).then((userJobs) => {
  //     setBoardJobs(userJobs);
  //   });
  // }, []);

  useEffect(() => {
    if (fetchValue > 0) {
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
          board: parseInt(boardId),
          category: singleBoardJob.category,
        };
        setBoardJob(updatedBoardJob);
      });
    } else {
      return;
    }
  }, [fetchValue]);

  // const handleOnDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;

  // if destination doesn't exist aka user dropped item outside of all dropzones.
  // if (!destination) {
  //   return;
  // }
  // if these conditions both evaluate to true, then the user dropped the draggable item back to its initial position and column.
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const reorderedJobs = Array.from(boardJobs);
  //   const [reorderedItem] = reorderedJobs.splice(source.index, 1);
  //   reorderedJobs.splice(destination.index, 0, reorderedItem);

  //   setBoardJobs(reorderedJobs);
  // };

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
      board: parseInt(boardJob.board),
      category: parseInt(catId),
    };

    updateBoardJob(boardJobToApi, boardJobId)
.then(() => getSingleBoardForUser(boardId)).then((board) => {
        setBoardOfTopLevelComponent(board)
      })
      
  };


  const returnConditional = (boardJob) => {
    if (categoryId === boardJob?.category) {
      return (
        <>
          <div
            className={` bg-white border-solid border basis-1/6  p-2.5 rounded-md shadow-xl
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
                  className=" text-white bg-seeker-blue    shadow-blue-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center mr-2 mb-2"
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
      <div className="w-60 flex-1 overflow-y-auto pl-3 pr-3">
        <div className="sticky top-0 bg-slate-50">
          <h2 className="text-xl text-secondary text-center">
            {categoryName}
          </h2>
        </div>
        <div className="space-y-5">
          {boardJobs?.map((boardJob) => {
            return <div>{returnConditional(boardJob)}</div>;
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
