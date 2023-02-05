import { IconTrash } from "@tabler/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteNetworkMeeting, getCompletedNetworkMeetings, getMySchedule } from "../managers/NetworkManager";

// My Schedule Component renders upcoming and completed network meetings.

export const MySchedule = () => {
  const [mySchedule, setMySchedule] = useState([]);
  const [completedMeetings, setCompletedMeetings] = useState([]);

  useEffect(() => {
    getMySchedule().then((meetings) => {
      setMySchedule(meetings);
    });
  }, []);

  useEffect(() => {
    getCompletedNetworkMeetings().then((meetings) => {
      setCompletedMeetings(meetings);
    });
  }, []);

  const formatTime = (date) => {
    const interviewDate = new Date(date);
    const formattedInterviewDate = interviewDate.toLocaleString();
    return formattedInterviewDate;
  };

    const deleteRequestForNetworkMeeting = (id) => {
      deleteNetworkMeeting(id)
        .then(() => getMySchedule())
        .then((meetings) => {
          setMySchedule(meetings);
        });
    };

      const renderDeleteButton = (id) => {
        return (
          <>
            <button
              className="absolute right-0 px-3 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg top-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this meeting?")
                ) {
                  deleteRequestForNetworkMeeting(id);
                }
              }}
            >
              {" "}
              <IconTrash />
            </button>
          </>
        );
      };

  return (
    <>
      <main className="flex w-full h-full">
        <div className="flex w-full h-full ">
          <div className="w-1/2">
            <h2 className="mt-5 text-3xl text-center text-white">
              My Schedule
            </h2>
            <div className="mt-5 space-y-8 overflow-y-auto h-5/6">
              {mySchedule.map((meeting) => {
                return (
                  <div className="relative p-5 ml-10 mr-1 bg-white border rounded-lg">
                    <div className="w-5/6 text-2xl text-seeker-blue">
                      Meeting with: {meeting.contact.name} -{" "}
                      {meeting.contact.current_role} @{" "}
                      {meeting.contact.current_company}
                    </div>
                    <div className="text-slate-700">
                      Topic: {meeting.description}
                    </div>
                    <div className="text-slate-700">
                      {formatTime(meeting.meeting_date)}
                    </div >
                    <div className="ml-2">{renderDeleteButton(meeting.id)}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="mt-5 text-3xl text-center text-white">
              Completed Meetings
            </h2>
            <div className="mt-5 space-y-8 overflow-y-auto h-5/6">
              {completedMeetings.map((meeting) => {
                return (
                  <div className="relative pt-3 pb-3 pl-3 ml-10 mr-10 bg-white border rounded-lg rep-5">
                    <div className="text-2xl text-seeker-blue">
                      {meeting.contact.name}
                    </div>
                    <div className="text-slate-700">
                      {meeting.contact.current_role}
                    </div>
                    <div className="text-slate-700">
                      {meeting.contact.current_company}
                    </div>
                    <div className="text-slate-700">Topic: {meeting.description}</div>
                    <div className="text-slate-700">
                      {formatTime(meeting.meeting_date)}
                    </div>
                    <div className="ml-2">{renderDeleteButton(meeting.id)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
