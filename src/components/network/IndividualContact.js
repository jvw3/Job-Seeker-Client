import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteContact,
  getSingleContact,
  getScheduledNetworkMeetings,
  deleteNetworkMeeting,
} from "../managers/NetworkManager";
import { IconTrash, IconCalendarEvent, IconBrandLinkedin } from "@tabler/icons";
import { ContactEdit } from "./ContactEdit";
import { NetworkMeetingForm } from "./NetworkMeetingForm";
import { ToastContainer, toast } from "react-toastify";

export const IndividualContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    getSingleContact(contactId).then((contact) => {
      setContact(contact);
    });
  }, []);

  useEffect(() => {
    getScheduledNetworkMeetings().then((meetings) => {
      setMeetings(meetings);
    });
  }, []);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const renderEditContactModal = (contact) => {
    return (
      <>
        <label
          htmlFor="my-modal-editcontact"
          className="px-4 py-2 mb-2 text-sm font-medium text-center text-white shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
        >
          Edit
        </label>
        <input
          type="checkbox"
          id="my-modal-editcontact"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="relative modal-box bg-neutral">
            <label
              htmlFor="my-modal-editcontact"
              className="absolute btn btn-sm btn-circle right-2 top-2"
            >
              ✕
            </label>
            <h3 className="mb-4 text-2xl font-bold text-white">Edit Contact</h3>
            <div>
              <ContactEdit
                sendEditContactToast={sendEditContactToast}
                contactId={contact.id}
              />
            </div>
            <div className="modal-action">
              <label
                onClick={() => {
                  getSingleContact(contactId).then((userContact) => {
                    setContact(userContact);
                  });
                }}
                htmlFor="my-modal-editcontact"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderDeleteButtonForContact = (id) => {
    return (
      <>
        <button
          className="px-4 py-2 mb-2 text-sm font-medium text-center text-white shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50 dark:focus:ring-blue-800"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this Contact?")
            ) {
              deleteRequestForContact(id);
            }
          }}
        >
          {" "}
          <IconTrash />
        </button>
      </>
    );
  };

  const renderDeleteButtonForNetworkMeeting = (id) => {
    return (
      <>
        <button
          className="absolute px-4 py-2 mb-2 text-sm font-medium text-center text-white shadow-lg top-1 right-1 btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50 dark:focus:ring-blue-800"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this Meeting?")
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

  const deleteRequestForContact = (id) => {
    deleteContact(id).then(() => {
      navigate("/network");
    });
  };

  const deleteRequestForNetworkMeeting = (id) => {
    deleteNetworkMeeting(id).then(() => {
      getScheduledNetworkMeetings().then((meetings) => {
        setMeetings(meetings)
      })
    });
  };

  const renderCreateMeetingModal = (contact) => {
    return (
      <>
        <label
          htmlFor="my-modal-createmeeting"
          className="px-4 py-2 mb-2 text-sm font-medium text-center text-white rounded-r-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br "
        >
          <IconCalendarEvent />
        </label>

        <input
          type="checkbox"
          id="my-modal-createmeeting"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="relative modal-box bg-neutral">
            <label
              htmlFor="my-modal-createmeeting"
              className="absolute btn btn-sm btn-circle right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-xl font-bold text-white">
              Add Meeting for: {contact.name}
            </h3>
            <p className="py-4">
              <NetworkMeetingForm
                sendCreateNetworkMeetingToast={sendCreateNetworkMeetingToast}
                contactId={contact.id}
              />
            </p>
            <div className="modal-action">
              <label
                onClick={() => {
                  getScheduledNetworkMeetings().then((meetings) => {
                    setMeetings(meetings);
                  });
                }}
                htmlFor="my-modal-createmeeting"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const sendCreateNetworkMeetingToast = () => {
    toast.success("A new meeting has been created.", {
      toastId: "success1",
    });
  };

  const sendEditContactToast = () => {
    toast.success("Your contact has been updated.", {
      toastId: "success1",
    });
  };

  const formatTime = (date) => {
    const interviewDate = new Date(date);
    const formattedInterviewDate = interviewDate.toLocaleString("en-US");
    return formattedInterviewDate;
  };

  return (
    <main className="w-screen h-screen bg-pinkswirl">
      <div className="flex-col">
        <h1 className="mt-5 ml-5 text-4xl text-white font-quicksand">
          {contact.name}
        </h1>
        <h2 className="ml-5 text-white">
          {contact.current_role} @ {contact.current_company}
        </h2>
        <div className="mt-2 mb-2 ml-5 btn-group">
          {renderEditContactModal(contact)}
          {renderCreateMeetingModal(contact)}
          <button
            onClick={() => openLinkInNewTab(`https://${contact.linked_in}`)}
            className="px-4 py-2 mb-2 text-sm font-medium text-center text-white shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
          >
            <IconBrandLinkedin color="white" />
          </button>
          {renderDeleteButtonForContact(contact.id)}
        </div>
        <h2 className="ml-5 text-xl text-white">
          Last Contact: {contact.last_contact}
        </h2>
        <h2 className="ml-5 text-xl text-white">
          Number Of Contacts: {contact.number_of_contacts}
        </h2>
        <h2 className="ml-5 text-xl text-white">
          Connection Level: {contact.connection_level}
        </h2>
      </div>
      <div className="flex-col pl-5 space-y-10 h-1/2">
        <div className="flex w-full mt-10 h-1/2">
          <div className="flex-col w-1/2 h-full p-2 rounded-md bg-slate-50">
            <h3 className="mt-1 mb-2 text-2xl text-seeker-blue">Notes</h3>
            <p className=" text-slate-500">{contact.notes}</p>
          </div>
        </div>
        <h3 className="text-3xl text-center text-white font-quicksand">
          Upcoming Meetings with {contact.name}
        </h3>
        <div className="flex justify-center w-3/4 ml-10 mr-10 space-x-5 h-2/6 ">
          {meetings.map((meeting) => {
            return (
              <div className="relative flex-col w-1/4 h-full pt-3 pl-3 rounded-md bg-slate-50">
                <div className="w-3/4 text-2xl text-seeker-blue">
                  {meeting.description}
                </div>
                <div className="text-slate-500">
                  {formatTime(meeting.meeting_date)}
                </div>
                {renderDeleteButtonForNetworkMeeting(meeting.id)}
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
