import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createBoard,
  createBoardJob,
  getAllCategories,
  getAllCompanies,
  getAllJobs,
  getAllTags,
} from "../managers/BoardManager";
import { getMeetingTypes, createNetworkMeeting } from "../managers/NetworkManager";
import { Listbox } from "@headlessui/react";

export const NetworkMeetingForm = ({sendCreateNetworkMeetingToast, contactId}) => {
  const [meetingTypes, setMeetingTypes] = useState([]);
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [networkMeeting, setNetworkMeeting] = useState({
    contact: contactId,
    description: "",
    meeting_date: "",
    notes: "",
    is_complete: false,
    meeting_type: 0
  });

  useEffect(() => {
    getMeetingTypes().then((types) => {
      setMeetingTypes(types);
    });
  }, []);

  const postRequestForNetworkMeeting = (event) => {
    event.preventDefault();

    const networkMeetingToApi = {
      contact: 1,
      description: networkMeeting.description,
      meeting_date: networkMeeting.meeting_date,
      notes: networkMeeting.notes,
      is_complete: networkMeeting.is_complete,
      meeting_type: networkMeeting.meeting_type
    };

    createNetworkMeeting(networkMeetingToApi);
  };

  const createMeetingHelperFunction = (clickEvent) => {
    sendCreateNetworkMeetingToast();
    postRequestForNetworkMeeting(clickEvent);
  };



  return (
    <>
      <main className="flex-col w-full text-black">
        <div className="w-full h-5/6 flex justify-center">
          <div className="border p-10 rounded-md bg-white w-4/5 h-5/6 flex-col">
            <form className="flex-col space-y-4">
              <fieldset>
                <div className="forminputfield">
                  <select
                    className="rounded-md w-72"
                    value={networkMeeting.meeting_type}
                    required
                    autoFocus
                    onChange={(evt) => {
                      const copy = { ...networkMeeting };
                      copy.meeting_type = evt.target.value;
                      setNetworkMeeting(copy);
                    }}
                  >
                    <option value="0">Choose meeting type </option>
                    {meetingTypes.map((type) => {
                      return (
                        <option value={type.id} key={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </fieldset>
              <div className="formSection rounded-md border border-slate-500 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 ">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  Description
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-input block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  value={networkMeeting.description}
                  onChange={(evt) => {
                    const copy = { ...networkMeeting };
                    copy.description = evt.target.value;
                    setNetworkMeeting(copy);
                  }}
                />
              </div>
              <div className="formSection rounded-md border border-slate-500 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <label
                  className="text-xs font-medium text-gray-900"
                  htmlFor="name"
                >
                  {" "}
                  Date
                </label>
                <input
                  required
                  autoFocus
                  type="datetime-local"
                  className="form-input block border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  value={networkMeeting.meeting_date}
                  onChange={(evt) => {
                    const copy = { ...networkMeeting };
                    copy.meeting_date = evt.target.value;
                    setNetworkMeeting(copy);
                  }}
                />
              </div>
              <button
                size="lg"
                className="btn transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                color="violet"
                onClick={(clickEvent) =>
                  createMeetingHelperFunction(clickEvent)
                }
              >
                Create New Meeting
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
