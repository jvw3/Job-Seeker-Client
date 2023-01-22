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
  updateBoardJob,
} from "../managers/BoardManager";
import { BoardCategoryContent } from "./BoardCatergoryContent";
import { Select } from "react-select";

export const JobEdit = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [boardJob, setBoardJob] = useState({});

  // When using serializers with Django, and you're creating an edit form. You have to basically create a copy of your state so you can create a custom object that can be sent to the server.
  useEffect(() => {
    getSingleJobForUser(jobId).then((singleBoardJob) => {
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
      work_status: boardJob.work_status,
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: parseInt(boardJob.board),
      category: parseInt(boardJob.category),
    };

    updateBoardJob(boardJobToApi, jobId).then(() => navigate(-1));
  };

  const renderCustomJobForm = () => {
    return (
      <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-fit">
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
  };

  const renderCustomCompanyForm = () => {
    return (
      <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-fit">
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
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6 ">
          <h1 className="p-5 text-4xl text-white">Edit Job</h1>
        </div>
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-2/5 p-10 bg-white border rounded -md h-5/6">
            <form className="space-y-2">
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
                  {boardJob.job === "1" ? renderCustomJobForm() : ""}
                </div>
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
                    Company
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
              <div className="flex w-4/12 text-slate-600 ">
                <input
                  className="mr-2 checkbox checkbox-sm checkbox-secondary text-slate-700"
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
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-fit">
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
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-fit">
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
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-fit">
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
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  placeholder="On-site, Hybrid, or Remote"
                  value={boardJob.work_status}
                  onChange={(evt) => {
                    const copy = { ...boardJob };
                    copy.work_status = evt.target.value;
                    setBoardJob(copy);
                  }}
                />
              </div>
              <button
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br shadow-blue-500/50"
                onClick={(clickEvent) => putRequestForJob(clickEvent)}
              >
                Save Changes!
              </button>
            </form>
          </div>
        </div>
      </main>
      ;
    </>
  );
};
