import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getAllCategories } from "../managers/BoardManager";
import { getSingleContact, updateContact } from "../managers/NetworkManager";

// Contact Edit Component allows user to edit contact data.

export const ContactEdit = ({ contactId, sendEditContactToast }) => {
  const [contact, setContact] = useState({
    name: "",
    current_role: "",
    current_company: "",
    last_contact: "",
    number_of_contacts: 0,
    connection_level: 0,
    linked_in: "",
    notes: "",
  });

  console.log(contactId);

  useEffect(() => {
    getSingleContact(contactId).then((userContact) => {
      setContact(userContact);
    });
  }, [contactId]);

  const navigate = useNavigate();

  const putRequestForContact = (event) => {
    event.preventDefault();

    const contactToApi = {
      name: contact.name,
      current_role: contact.current_role,
      current_company: contact.current_company,
      last_contact: contact.last_contact,
      number_of_contacts: contact.number_of_contacts,
      connection_level: contact.connection_level,
      linked_in: contact.linked_in,
      notes: contact.notes,
    };

    updateContact(contactToApi, contactId);
  };

  const updateContactHelperFunction = (clickEvent) => {
    sendEditContactToast();
    putRequestForContact(clickEvent);
  };

  return (
    <>
      <main className="flex-col w-full h-full space-y-4 bg-neutral">
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-4/5 p-10 bg-white border rounded -md h-5/6">
            <form className="flex-col">
              <fieldset className="mb-2 space-y-2">
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={contact.name}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.name = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Current Role:
                  </label>
                  <input
                    required
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What is the current role of this contact?"
                    value={contact.current_role}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.current_role = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Current Company:
                  </label>
                  <input
                    required
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What does this contact currently work?"
                    value={contact.current_company}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.current_company = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Date of Last Contact:
                  </label>
                  <input
                    required
                    type="date"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    value={contact.last_contact}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.last_contact = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Number Of Contacts:
                  </label>
                  <input
                    required
                    type="number"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={contact.number_of_contacts}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.number_of_contacts = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Connection Level:
                  </label>
                  <input
                    required
                    type="number"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you rate your connection with this contact?"
                    value={contact.connection_level}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.connection_level = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    LinkedIn:
                  </label>
                  <input
                    required
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="Add LinkedIn for Contact. Do not include 'https://' in the link."
                    value={contact.linked_in}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.linked_in = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Notes:
                  </label>
                  <input
                    required
                    type="textarea"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={contact.notes}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.notes = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
                onClick={(clickEvent) =>
                  updateContactHelperFunction(clickEvent)
                }
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
