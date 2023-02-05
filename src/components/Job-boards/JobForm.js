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
    work_status:"",
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
      work_status: boardJob.work_status,
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: boardJob.board,
      category: parseInt(boardJob.category),
      tags: Array.from(checkedOptions)
    };

    createBoardJob(boardJobToApi).then(() => navigate(`/boards/${boardId}`));
  };

  const renderCustomJobForm = () => {
    return (
      <div className="w-1/2 px-3 py-2 mt-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        <label className="text-xs font-medium text-gray-900" htmlFor="name">
          Job Title
        </label>
        <input
          required
          autoFocus
          type="text"
          className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
          placeholder="Name of position"
          value={boardJob.custom_job}
          onChange={(evt) => {
            const copy = { ...boardJob };
            copy.custom_job = evt.target.value;
            setBoardJob(copy);
          }}
        />
      </div>
    );
  }

  const renderCustomCompanyForm = () => {
    return (
      <div className="w-1/2 px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        <label className="text-xs font-medium text-gray-900" htmlFor="name">
          Company Name
        </label>
        <input
          required
          autoFocus
          type="text"
          className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
          placeholder="Name of position"
          value={boardJob.custom_company}
          onChange={(evt) => {
            const copy = { ...boardJob };
            copy.custom_company = evt.target.value;
            setBoardJob(copy);
          }}
        />
      </div>
    );
  }

  return (
    <>
      <main className="flex-col w-full text-black bg-pinkswirl">
        <div className="mb-3">
          <h1 className="p-5 text-4xl text-white font-quicksand">
            Add New Job
          </h1>
        </div>
        <div className="flex justify-center w-full pb-5 h-90">
          <div className="flex-col w-2/5 p-5 bg-white border rounded-md h-90">
            <form className="flex-col space-y-2">
              <fieldset>
                <div className="w-1/2 px-3 py-2 border border-gray-500 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Job Title
                  </label>
                  <select
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
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
                </div>
                  {boardJob.job === "1" ? renderCustomJobForm() : ""}
              </fieldset>
              <div className="w-1/2 px-3 py-2 border border-gray-500 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="block text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Company
                </label>
                <select
                  className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={boardJob.company}
                  required
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
              {boardJob.company === "1" ? renderCustomCompanyForm() : ""}
              <fieldset>
                <div className="w-1/2 px-3 py-2 border border-gray-500 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Category
                  </label>
                  <select
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    value={boardJob.category}
                    required
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
              <div className="flex w-4/12 ">
                <label htmlFor="applied-yes"></label>
                <input
                  className="mr-2 checkbox checkbox-sm checkbox-secondary"
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
              <div className="w-1/2 px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  What is the salary or hourly pay?
                </label>
                <input
                  required
                  type="number"
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  placeholder="Amount in dollars"
                  value={boardJob.salary}
                  onChange={(evt) => {
                    const copy = { ...boardJob };
                    copy.salary = evt.target.value;
                    setBoardJob(copy);
                  }}
                />
              </div>
              <div className="w-1/2 px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  {" "}
                  Where is the job located?
                </label>
                <input
                  required
                  type="text"
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  placeholder="Office Location"
                  value={boardJob.location}
                  onChange={(evt) => {
                    const copy = { ...boardJob };
                    copy.location = evt.target.value;
                    setBoardJob(copy);
                  }}
                />
              </div>
              <div className="w-1/2 px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  {" "}
                  Work Status
                </label>
                <input
                  required
                  type="text"
                  className="block w-full p-0 overflow-visible text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  placeholder="On-site, Hybrid, or Remote"
                  value={boardJob.work_status}
                  onChange={(evt) => {
                    const copy = { ...boardJob };
                    copy.work_status = evt.target.value;
                    setBoardJob(copy);
                  }}
                />
              </div>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="age">Tags:</label>
                  {tags.map((tag) => (
                    <div className="flex">
                      {tag.name}
                      <input
                        className="ml-2 checkbox checkbox-sm checkbox-secondary"
                        value={tag.id}
                        onChange={(event) => {
                          const copy = new Set(checkedOptions);
                          if (copy.has(tag.id)) {
                            copy.delete(tag.id);
                          } else {
                            copy.add(tag.id);
                          }
                          setCheckedOptions(copy);
                        }}
                        type="checkbox"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
              <button
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-blue-500/50"
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
