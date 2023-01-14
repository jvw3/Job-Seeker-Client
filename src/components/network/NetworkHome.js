import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../managers/AuthManager";
import { getAllBoardsForUser } from "../managers/BoardManager";
import { getUpcomingInterviewsForUser } from "../managers/InterviewManager";
import { ContactList } from "./ContactList";
import { MySchedule } from "./MySchedule"

export const NetworkHome = () => {
  const [contactTabActive, setContactTabActive] = useState(true);
  const [scheduleTabActive, setScheduleTabActive] = useState(false);

  const controlContactTab = () => {
    if (!contactTabActive) {
      setContactTabActive(true);
      setScheduleTabActive(false);
    } else {
      return;
    }
  };

  const controlScheduleTab = () => {
    if (!scheduleTabActive) {
      setScheduleTabActive(true);
      setContactTabActive(false);
    } else {
      return;
    }
  };

  return (
    <>
      <main className="flex-col h-screen w-screen bg-pinkswirl pt-8 pl-8">
        <div className="h-1/6">
          <h1 className="text-5xl text-white font-quicksand">
            My Network
          </h1>
          <div
            data-theme="othertheme"
            className=" tabs tabs-boxed bg-secondary w-fit box-border mt-5"
          >
            <a
              onClick={() => {
                controlContactTab();
              }}
              className={`tab tab-lg ${
                contactTabActive ? "tab-active" : "text-primary"
              }`}
            >
              Contacts
            </a>
            <a
              onClick={() => {
                controlScheduleTab();
              }}
              className={`tab tab-lg ${
                scheduleTabActive ? "tab-active" : "text-primary"
              }`}
            >
              My Schedule
            </a>
          </div>
        </div>
        <div className="h-5/6">
          {contactTabActive ? <ContactList /> : ""}
          {scheduleTabActive ? <MySchedule /> : ""}
        </div>
      </main>
    </>
  );
};
