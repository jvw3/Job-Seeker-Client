import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBoard, getAllCategories } from "../managers/BoardManager";
import { getSingleContact, updateContact } from "../managers/NetworkManager";

export const ContactEdit = () => {
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

  const { contactId } = useParams();

  useEffect(() => {
    getSingleContact(contactId).then((userContact) => {
      setContact(userContact);
    });
  }, []);

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

    updateContact(contactToApi, contactId).then(() => navigate("/network"));
  };

  return (
    <>
      <main className="flex-col w-full bg-pinkswirl">
        <div className="h-1/6 ">
          <h1 className="text-white text-4xl p-5">New Contact</h1>
        </div>
        <div className="w-full h-5/6 flex justify-center">
          <div className="border p-10 rounded -md bg-white w-4/5 h-5/6 flex-col">
            <form className="flex-col">
              <fieldset className="">
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
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
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={contact.name}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.name = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Current Role:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What is the current role of this contact?"
                    value={contact.current_role}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.current_role = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Current Company:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What does this contact currently work?"
                    value={contact.current_company}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.current_company = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Date of Last Contact:
                  </label>
                  <input
                    required
                    autoFocus
                    type="date"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={contact.last_contact}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.last_contact = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Number Of Contacts:
                  </label>
                  <input
                    required
                    autoFocus
                    type="number"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="What are your job requirements?"
                    value={contact.number_of_contacts}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.number_of_contacts = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Connection Level:
                  </label>
                  <input
                    required
                    autoFocus
                    type="number"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="How would you rate your connection with this contact?"
                    value={contact.connection_level}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.connection_level = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    LinkedIn:
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    placeholder="Add LinkedIn for Contact. Do not include 'https://' in the link."
                    value={contact.linked_in}
                    onChange={(evt) => {
                      const copy = { ...contact };
                      copy.linked_in = evt.target.value;
                      setContact(copy);
                    }}
                  />
                </div>
                <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Notes:
                  </label>
                  <input
                    required
                    autoFocus
                    type="textarea"
                    className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
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
                size="lg"
                color="violet"
                className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                onClick={(clickEvent) => putRequestForContact(clickEvent)}
              >
                Save Changes!
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
