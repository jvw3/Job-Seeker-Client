import { useState } from "react";
import { ContactList } from "./ContactList";
import { MySchedule } from "./MySchedule"

// Network Home Component renders My schedule and Contact List component.

export const NetworkHome = () => {
  const [contactTabActive, setContactTabActive] = useState(true);
  const [scheduleTabActive, setScheduleTabActive] = useState(false);

  // function: controls the schedule tab of contact.
  const controlContactTab = () => {
    if (!contactTabActive) {
      setContactTabActive(true);
      setScheduleTabActive(false);
    } else {
      return;
    }
  };

  // function: controls the schedule tab of network.
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
      <main className="flex-col w-screen h-screen pt-8 pl-8 pr-8 bg-pinkswirl">
        <div className="h-1/6">
          <h1 className="text-5xl text-white font-quicksand">My Network</h1>
          <div
            data-theme="othertheme"
            className="box-border mt-5 tabs tabs-boxed bg-secondary w-fit"
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
