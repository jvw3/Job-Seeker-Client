import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, createBoardJob, getAllCategories, getAllCompanies, getAllJobs, getAllTags } from "../managers/BoardManager";
import { Listbox } from '@headlessui/react'

export const JobForm = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState(new Set())


  const { boardId } = useParams();
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

  useEffect(() => {
    getAllJobs().then((allJobs) => {
      setJobs(allJobs);
    });
  }, []);

  useEffect(() => {
    getAllJobs().then((allJobs) => {
      setJobs(allJobs);
    });
  }, []);

  useEffect(() => {
    getAllTags().then((allTags) => {
      setTags(allTags);
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
  //   let updatedList = [...checkedOptions]
  //   if (event.target.checked) {
  //     updatedList = [...checkedOptions, parseInt(event.target.value)];
  //   } else {
  //     updatedList.splice(checkedOptions.indexOf(event.target.value), 1);
  //   }
  //   setCheckedOptions(updatedList);
  // };

  const postRequestForJob = (event) => {
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
      category: parseInt(boardJob.category),
      tags: Array.from(checkedOptions)
    };

    createBoardJob(boardJobToApi).then(() => navigate(`/boards/${boardId}`));
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6 ">
          <h1 className="text-white text-4xl p-5">Add New Job</h1>
        </div>
        <div className="w-full h-5/6 flex justify-center">
          <div className="border p-10 rounded -md bg-white w-4/5 h-5/6 flex-col">
        <form className="flex-col">
        <fieldset>
          <div className="forminputfield">
            <select
              className="rounded-md"
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
            <select
              className="form-control rounded-md"
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
            <select
              className="rounded-md"
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
        <div className=" flex w-3/12">
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
        <fieldset className="flex-col">
          <label htmlFor="name">What is the Salary?</label>
          <input
            required
            autoFocus
            type="number"
            className="rounded-md"
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
            className="form-input rounded-md"
            placeholder="Amount in dollars"
            value={boardJob.location}
            onChange={(evt) => {
              const copy = { ...boardJob };
              copy.location = evt.target.value;
              setBoardJob(copy);
            }}
          />
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="age">Tags:</label>
            {tags.map((tag) => (
              <div className="flex">
                {tag.name}
                <input
                  className="checkbox checkbox-sm"
                  value={tag.id}
                  onChange={(event) => {
                    const copy = new Set(checkedOptions)
                    if (copy.has(tag.id)) {
                      copy.delete(tag.id)
                    } else {
                      copy.add(tag.id)
                    }setCheckedOptions(copy)
                  }}
                  type="checkbox"
                />
              </div>
            ))}
          </div>
        </fieldset>
        <button
          size="lg"
          className="btn transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          color="violet"
          onClick={(clickEvent) => postRequestForJob(clickEvent)}
        >
          Create New Job!
        </button>
      </form>
          </div>
        </div>

      </main>
    </>
  );
};
