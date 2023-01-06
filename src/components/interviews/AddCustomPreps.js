import { useState, useEffect } from "react";
import { createCustomPrep, getSingleInterviewPrep } from "../managers/InterviewManager";

export const AddCustomPreps = ({ prepId, sendToast }) => {
  const [interviewPrep, setPrep] = useState(0)
  const [customPrep, setCustomPrep] = useState({
    title: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    setPrep(prepId)
  }, [prepId]);


  const postRequestForCustomPrep = (event) => {
    event.preventDefault();

    const customPrepToApi = {
      prep: interviewPrep,
      title: customPrep.title,
      description: customPrep.description,
      content: customPrep.content,
    };

    createCustomPrep(customPrepToApi)
    
  };

  const newPrep = (clickEvent) => {
    sendToast()
    postRequestForCustomPrep(clickEvent)
  }

  return (
    <>
      <main>
        <h1 className="text-3xl">New Prep</h1>
      </main>
      <form>
        <fieldset className="formSection">
          <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Title:
            </label>
            <input
              required
              autoFocus
              type="text"
              className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Name this interview prep"
              value={customPrep.title}
              onChange={(evt) => {
                const copy = { ...customPrep };
                copy.title = evt.target.value;
                setCustomPrep(copy);
              }}
            />
          </div>
          <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Description:
            </label>
            <input
              required
              autoFocus
              type="text"
              className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Describe this interview prep"
              value={customPrep.description}
              onChange={(evt) => {
                const copy = { ...customPrep };
                copy.description = evt.target.value;
                setCustomPrep(copy);
              }}
            />
          </div>
          <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
            <label
              className="block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Content:
            </label>
            <textarea
              rows={20}
              required
              autoFocus
              type="text"
              className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Write your content"
              value={customPrep.content}
              onChange={(evt) => {
                const copy = { ...customPrep };
                copy.content = evt.target.value;
                setCustomPrep(copy);
              }}
            ></textarea>
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) =>
          newPrep(clickEvent)
        }
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        >
          Add Custom Prep
        </button>
      </form>
    </>
  );
};
