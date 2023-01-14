import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCompletedNetworkMeetings, getMySchedule } from "../managers/NetworkManager";

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

  return (
    <>
      <main className="w-full h-full flex">
        <div className=" w-full flex h-full">
          <div className="w-1/2">
            <h2 className="text-center text-3xl mt-5 text-white">
              My Schedule
            </h2>
            <div className="mt-5 space-y-8 h-5/6 overflow-y-auto">
              {mySchedule.map((meeting) => {
                return (
                  <div className="p-5 border rounded-lg ml-10 mr-10 bg-white">
                    <div className="text-seeker-blue">
                      {meeting.contact.name}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.current_role}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.current_company}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.linked_in}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.description}
                    </div>
                    <div className="text-seeker-blue">
                      {formatTime(meeting.meeting_date)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-center text-3xl mt-5 text-white">
              Completed Meetings
            </h2>
            <div className="mt-5 space-y-8 overflow-y-auto h-5/6">
              {completedMeetings.map((meeting) => {
                return (
                  <div className="p-5 border rounded-lg ml-10 mr-10 bg-white">
                    <div className="text-seeker-blue">
                      {meeting.contact.name}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.current_role}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.current_company}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.contact.linked_in}
                    </div>
                    <div className="text-seeker-blue">
                      {meeting.description}
                    </div>
                    <div className="text-seeker-blue">
                      {formatTime(meeting.meeting_date)}
                    </div>
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
