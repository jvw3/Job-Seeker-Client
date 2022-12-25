import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";
import { getContactsForUser } from "../managers/NetworkManager";
import { IconBrandLinkedin} from "@tabler/icons"

export const NetworkHome = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContactsForUser().then((userContacts) => {
      setContacts(userContacts);
    });
  }, []);

  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  }

  return (
    <>
      <h1 className="text-4xl">Network</h1>
      <div>
        <div>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
            onClick={() => {
              navigate(`/createboard`);
            }}
          >
            Add Contact
          </button>
        </div>
        <table className="">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Role
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {contacts.map((contact) => (
              <>
                <tr
                  className="flex justify-evenly mt-6 border gap-x-4"
                  key={`contact--${contact.id}`}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {contact.current_role}
                  </td>
                  <div className="">{contact.current_company}</div>
                  <div className="">{contact.last_contact}</div>
                  <div className="">{contact.number_of_contacts}</div>
                  <div className="">{contact.connection_level}</div>
                  <button
                    onClick={() =>
                      openLinkInNewTab(`https://${contact.linked_in}`)
                    }
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4  text-center mr-2 mb-2"
                  >
                    <IconBrandLinkedin />
                  </button>
                  <div className="">{contact.notes}</div>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
