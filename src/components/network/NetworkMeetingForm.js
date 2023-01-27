import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMeetingTypes, createNetworkMeeting } from "../managers/NetworkManager";

// Network Meeting Form Component allows a user to create a new network meeting.


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
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-4/5 p-10 bg-white border rounded-md h-5/6">
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
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 ">
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
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={networkMeeting.description}
                  onChange={(evt) => {
                    const copy = { ...networkMeeting };
                    copy.description = evt.target.value;
                    setNetworkMeeting(copy);
                  }}
                />
              </div>
              <div className="px-3 py-2 border rounded-md shadow-sm formSection border-slate-500 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
                  className="block p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                  value={networkMeeting.meeting_date}
                  onChange={(evt) => {
                    const copy = { ...networkMeeting };
                    copy.meeting_date = evt.target.value;
                    setNetworkMeeting(copy);
                  }}
                />
              </div>
              <button
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 shadow-blue-500/50"
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
