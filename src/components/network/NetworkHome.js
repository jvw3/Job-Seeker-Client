import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getContactsForUser,
  getAllContactsByNameSearch,
  sendConnectionFilterRequest,
  sendAscendingSortNameRequest,
  sendDescendingSortNameRequest,
  sendAscendingSortContactNumberRequest,
  sendDescendingSortContactNumberRequest,
  sendAscendingSortConnectionLevelRequest,
  sendDescendingSortConnectionLevelRequest,
  sendAscendingSortLastContactRequest,
  sendDescendingSortLastContactRequest
} from "../managers/NetworkManager";
import { IconBrandLinkedin, IconTrash, IconSearch} from "@tabler/icons";


export const NetworkHome = () => {
  const [contacts, setContacts] = useState([]);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [connectionFilterValue, setConnectionFilterValue] = useState("");

  const navigate = useNavigate();



  // UseEffect: Fetches All Contacts for a User.
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
        <table className="shadow-2xl w-10/12">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-transparent rounded-tl-md"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border-transparent"
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
                Date of Last Contact
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
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border-transparent rounded-tr-md"
              >
                Meeting Manager
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border-transparent rounded-tr-md"
              >
                Manage Contact
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
                  <td className="hitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {contact.last_contact}
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
                      View Details
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/network/contact/${contact.id}`)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4  text-center mr-2 mb-2"
                    >
                      {" "}
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/network/contact/${contact.id}`)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4  text-center mr-2 mb-2"
                    >
                      {" "}
                      <IconTrash />
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 h-10">
            <tr>
              <th className="rounded-bl-md border-separate" scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th className="rounded-br-md border-separate" scope="row"></th>
            </tr>
          </tfoot>
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

  const sendSortRequestToApi = (sortValue) => {
    if (sortValue == "8") {
      sendAscendingSortNameRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "7") {
      sendDescendingSortNameRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "6") {
      sendAscendingSortContactNumberRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "5") {
      sendDescendingSortContactNumberRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "4") {
      sendAscendingSortConnectionLevelRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "3") {
      sendDescendingSortConnectionLevelRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "2") {
      sendAscendingSortLastContactRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    } else if (sortValue == "1") {
      sendDescendingSortLastContactRequest().then((filteredContactsArray) => {
        setContacts(filteredContactsArray);
      });
    }
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
        <button
          className=" btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            getContactsForUser()
              .then((userContacts) => {
                setContacts(userContacts);
                setSortValue("0");
                setConnectionFilterValue("0");
              })
              .then(() => setSearchedTitle(""));
          }}
        >
          Reset
        </button>
        <div className="input-group w-1/4">
          <input
            type="text"
            className="w-56 rounded-md h-10"
            placeholder="Search contacts by name"
            onKeyDown={handleKeyPress}
            onChange={(changeEvent) => {
              let searchCopy = changeEvent.target.value;
              setSearchedTitle(searchCopy);
            }}
          ></input>
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm h-10 px-4 py-2 text-center mr-2 mb-2"
            onClick={() => {
              sendContactSearchRequestToApi(searchedTitle);
            }}
          >
            <IconSearch />
          </button>
        </div>
      </>
    );
  };

  const renderSortAndFilterBars = () => {
    return (
      <>
        <div>
          <select
            onChange={(evt) => {
              const copy = evt.target.value;
              setSortValue(copy);
            }}
            className="h-10 rounded-md"
          >
            <option value={0}>Sort Options</option>
            <option value={8}>Name ↑</option>
            <option value={7}>Name ↓</option>
            <option value={6}>Number Of Contacts ↑</option>
            <option value={5}>Number Of Contacts ↓</option>
            <option value={4}>Connection Level ↑</option>
            <option value={3}>Connection Level ↓</option>
            <option value={2}>Last Contact Date ↑</option>
            <option value={1}>Last Contact Date ↓</option>
          </select>
          <button
            onClick={() => {
              sendSortRequestToApi(sortValue);
            }}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm h-10 px-4 py-2 text-center mr-2 mb-2"
          >
            Sort Contacts
          </button>
        </div>
        <div>
          <select
            className="h-10 rounded-md"
            value={connectionFilterValue}
            onChange={(evt) => {
              const copy = evt.target.value;
              setConnectionFilterValue(copy);
            }}
          >
            <option value={0}>Connection Level</option>
            <option value={5}>Level 5</option>
            <option value={4}>Level 4</option>
            <option value={3}>Level 3</option>
            <option value={2}>Level 2</option>
            <option value={1}>Level 1</option>
            <option value={">3"}>Contacts above level 3</option>
            <option value={"<3"}>Contacts below level 3</option>
          </select>
          <button
            onClick={() => {
              sendConnectionFilterRequest(connectionFilterValue).then(
                (userContacts) => {
                  setContacts(userContacts);
                }
              );
            }}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm h-10 px-4 py-2 text-center mr-2 mb-2"
          >
            Filter
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="w-full flex-col bg-pinkswirl">
        <h1 className="text-5xl text-white font-roboto mt-2 mb-2">My Network</h1>
        <div>
          <div>
            <button
              className="btn text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
              onClick={() => {
                navigate(`/createcontact`);
              }}
            >
              Add Contact
            </button>
          </div>
          <div className="flex-col">
            <div className="flex">
            {renderSearchBar()}
            {renderSortAndFilterBars()}
            </div>
          <div className="flex justify-center mt-10">
            {renderNetworkTable()}
          </div>
        </div>
        </div>
      </main>
    </>
  );
};
