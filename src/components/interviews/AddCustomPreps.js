import { useState, useEffect } from "react";
import { createCustomPrep, getSingleInterviewPrep } from "../managers/InterviewManager";

// Add Custom Preps Component is a modal that handles the creation of new Custom Preps material.

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
      </main>
      <form>
        <fieldset className="mt-3 mb-3 space-y-3">
          <div className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
              className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
              placeholder="Name this interview prep"
              value={customPrep.title}
              onChange={(evt) => {
                const copy = { ...customPrep };
                copy.title = evt.target.value;
                setCustomPrep(copy);
              }}
            />
          </div>
          <div className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
              className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
              placeholder="Describe this interview prep"
              value={customPrep.description}
              onChange={(evt) => {
                const copy = { ...customPrep };
                copy.description = evt.target.value;
                setCustomPrep(copy);
              }}
            />
          </div>
          <div className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
              className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
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
          onClick={(clickEvent) => newPrep(clickEvent)}
          className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
        >
          Add Custom Prep
        </button>
      </form>
    </>
  );
};
