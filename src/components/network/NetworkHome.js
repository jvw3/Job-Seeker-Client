import { useState, useEffect } from "react";
import { Select } from "react-select";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";
import { getContactsForUser, getAllContactsByNameSearch } from "../managers/NetworkManager";
import { IconBrandLinkedin, IconArrowNarrowUp } from "@tabler/icons";

export const NetworkHome = () => {
  const [contacts, setContacts] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("")
  const sortOptions = [
    {"value": 0,
    "text": "Sort Options",
  },{
    "value": 1,
    "text": "Name",
    "icon": IconArrowNarrowUp
  }
  ]
  const navigate = useNavigate();

  const resetSearchAndFilter = () => {
    setSearchedTitle("")
    this.searchedTitle.value = ""
  }

  useEffect(() => {
    getContactsForUser().then((userContacts) => {
      setContacts(userContacts);
    });
  }, []);

  // Function: Opens LinkedIn Link for a User in a New Browser Tab.
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  //  Function: This function renders the network table that holds all of a user's contacts.
  const renderNetworkTable = () => {
    return (
      <>
        <table className="shadow-2xl border-pinkswirl">
          <thead className="bg-gray-100">
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
                Current Role
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Company
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Number Of Contacts
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Connection Level
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                LinkedIn
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Notes
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Edit
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
                  className={`flexjustify-evenly w-full mt-6 border gap-x-4 ${
                    contact.id % 2 ? "" : "bg-blue-100"
                  }  `}
                  key={`contact--${contact.id}`}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {contact.current_role}
                  </td>
                  <td className="hitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {contact.current_company}
                  </td>
                  <td className="text-center hitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.number_of_contacts}
                  </td>
                  <td className="text-center hitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.connection_level}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        openLinkInNewTab(`https://${contact.linked_in}`)
                      }
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4  text-center mr-2 mb-2"
                    >
                      <IconBrandLinkedin />
                    </button>
                  </td>
                  <td className=" py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {contact.notes}
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/network/contact/${contact.id}`)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4  text-center mr-2 mb-2"
                    >
                      {" "}
                      Edit Contact
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  // Function: Sends request to server for the clients that are filtered by the search term state typed by the user.
  const sendContactSearchRequestToApi = (value) => {
      getAllContactsByNameSearch(value).then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    };

    // Allows User to submit search on network home, by clicking enter.
    const handleKeyPress = (e) => {
      if (e.keyCode === 13) {
        sendContactSearchRequestToApi(searchedTitle);
      }
    };

    // Renders the search bar that allows users to search contacts by their name.
    const renderSearchBar = () => {
      return (
        <>
          <div className="">
            <input
              type="text"
              className="input"
              placeholder="Search contacts by name"
              onKeyDown={handleKeyPress}
              onChange={(changeEvent) => {
                let searchCopy = changeEvent.target.value;
                setSearchedTitle(searchCopy);
              }}
            ></input>
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
              onClick={() => {
                sendContactSearchRequestToApi(searchedTitle);
              }}
            >
              Submit
            </button>
          </div>
        </>
      );
    };

  return (
    <>
      <main className="w-full flex-col">
        <h1 className="text-4xl">Network</h1>
        <div>
          <div>
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
              onClick={() => {
                navigate(`/createcontact`);
              }}
            >
              Add Contact
            </button>
          </div>
          <div className="flex justify-evenly">
            <button
              onClick={() => {
                const clearSearch = ""
                resetSearchAndFilter(clearSearch)
              }}
            >
              Reset
            </button>
            {renderSearchBar()}
            <div>
              <select options={sortOptions}></select>
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
                Sort Contacts
              </button>
            </div>
            <div>
              <select>
                <option value={0}>Connection Level</option>
                <option value={5}>Level 5</option>
                <option value={4}>Level 4</option>
                <option value={3}>Level 3</option>
                <option value={2}>Level 2</option>
                <option value={1}>Level 1</option>
              </select>
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2">
                Filter
              </button>
            </div>
          </div>
          {renderNetworkTable()}
        </div>
      </main>
    </>
  );
};
