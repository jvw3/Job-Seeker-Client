import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createBoard,
  createBoardJob,
  getAllBoardJobTagsForBoardJob,
  getAllCategories,
  getAllCompanies,
  getAllJobs,
  getAllTags,
  getSingleJobForUser,
  updateBoardJob
} from "../managers/BoardManager";
import { BoardCategoryContent } from "./BoardCatergoryContent";
import { Select } from "react-select"

export const JobEdit = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [boardJob, setBoardJob] = useState({
    job: 0,
    custom_job: "",
    company: 0,
    custom_company: "",
    has_applied: false,
    has_interviewed: false,
    interview_rounds: 0,
    received_offer: false,
    salary: 0,
    location: "",
    salary_rating: 0,
    location_rating: 0,
    culture_rating: 0,
    leadership_rating: 0,
    team_rating: 0,
    board: boardId,
    category: 0
  });

// When using serializers with Django, and you're creating an edit form. You have to basically create a copy of your state so you can create a custom object that can be sent to the server.
  useEffect(() => {
    getSingleJobForUser(jobId)
      .then((singleBoardJob) => {
        const updatedBoardJob = {
          job: singleBoardJob?.job?.id,
          custom_job: singleBoardJob.custom_job,
          company: singleBoardJob.company.id,
          custom_company: singleBoardJob.custom_job,
          has_applied: singleBoardJob.has_applied,
          has_interviewed: singleBoardJob.has_interviewed,
          interview_rounds: singleBoardJob.interview_rounds,
          received_offer: singleBoardJob.received_offer,
          salary: singleBoardJob.salary,
          location: singleBoardJob.location,
          salary_rating: singleBoardJob.salary_rating,
          location_rating: singleBoardJob.location_rating,
          culture_rating: singleBoardJob.culture_rating,
          leadership_rating: singleBoardJob.leadership_rating,
          team_rating: singleBoardJob.team_rating,
          board: parseInt(boardId),
          category: singleBoardJob.category,
        };
        setBoardJob(updatedBoardJob);
      })
  }, []);


  useEffect(() => {
    getAllJobs().then((allJobs) => {
      setJobs(allJobs);
    });
  }, []);


  useEffect(() => {
    getAllCompanies().then((allCompanies) => {
      setCompanies(allCompanies);
    });
  }, []);

  useEffect(() => {
    getAllCategories().then((allCategories) => {
      setCategories(allCategories);
    });
  }, []);


  // const handleChange = (event) => {
  //   let updatedList = [...checkedOptions];
  //   if (event.target.checked) {
  //     updatedList = [...checkedOptions, parseInt(event.target.value)];
  //   } else {
  //     if (checkedOptions.indexOf(parseInt(event.target.value)) >= 1) {
  //       updatedList.splice(checkedOptions.indexOf(parseInt(event.target.value)), 1);
  //     } else {
  //       updatedList.shift()
  //     }
  //   }
  //   setCheckedOptions(updatedList);
  // };


  // const checkTag = (tagId) => {
  //   for (const check of checkedOptions) {
  //     if (check === tagId) {
  //       return true
  //     }
  //   }
  //   return false
  // }




  const putRequestForJob = (event) => {
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
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: parseInt(boardJob.board),
      category: parseInt(boardJob.category)
    };

    updateBoardJob(boardJobToApi, jobId)
      .then(() => navigate(-1));
  };

  return (
    <>
      <main>
        <h1>Edit Job</h1>
      </main>
      <form>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="job">
              What is the name of the position?
            </label>
            <select
              className="form-control"
              value={boardJob.job}
              required
              autoFocus
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.job = evt.target.value;
                setBoardJob(copy);
              }}
            >
              <option value="0">Choose job title</option>
              {jobs.map((job) => {
                return (
                  <option value={job.id} key={job.id}>
                    {job.title}
                  </option>
                );
              })}
            </select>
            {boardJob.job === "1" ? <div>Create Custom Job</div> : ""}
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="job">
              What is the name of the Company?
            </label>
            <select
              className="form-control"
              value={boardJob.company}
              required
              autoFocus
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.company = evt.target.value;
                setBoardJob(copy);
              }}
            >
              <option value="0">Choose Company</option>
              {companies.map((company) => {
                return (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="category">
              Choose a category:
            </label>
            <select
              className="form-control"
              value={boardJob.category}
              required
              autoFocus
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.category = evt.target.value;
                setBoardJob(copy);
              }}
            >
              <option value="0">Choose Category</option>
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <div className="radio">
          <label htmlFor="applied-yes"></label>
          <input
            type="checkbox"
            id="applied-yes"
            name="applicationstatus"
            value={boardJob.has_applied}
            checked={boardJob.has_applied}
            onChange={(evt) => {
              const copy = { ...boardJob };
              copy.has_applied = evt.target.checked;
              setBoardJob(copy);
            }}
          />
          Have you Applied?
        </div>
        <fieldset className="formSection">
          <label htmlFor="name">What is the Salary?</label>
          <input
            required
            autoFocus
            type="number"
            className="form-control"
            placeholder="Amount in dollars"
            value={boardJob.salary}
            onChange={(evt) => {
              const copy = { ...boardJob };
              copy.salary = evt.target.value;
              setBoardJob(copy);
            }}
          />
        </fieldset>
        <fieldset className="formSection">
          <label htmlFor="name">Where is the job located?</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Amount in dollars"
            value={boardJob.location}
            onChange={(evt) => {
              const copy = { ...boardJob };
              copy.location = evt.target.value;
              setBoardJob(copy);
            }}
          />
        </fieldset>
        <button
          size="lg"
          color="violet"
          onClick={(clickEvent) => putRequestForJob(clickEvent)}
        >
          Save Changes!
        </button>
      </form>
    </>
  );
};
