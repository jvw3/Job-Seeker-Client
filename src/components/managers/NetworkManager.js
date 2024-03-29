
// Network Manager Component holds all Network related requests.

export const getContactsForUser = () => {
  return fetch(`http://localhost:8000/contacts`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getMeetingTypes = () => {
  return fetch(`http://localhost:8000/meetingtypes`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getMySchedule = () => {
  return fetch(`http://localhost:8000/networkmeetings?myschedule`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getCompletedNetworkMeetings = () => {
  return fetch(`http://localhost:8000/networkmeetings?completed`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getScheduledNetworkMeetings = () => {
  return fetch(`http://localhost:8000/networkmeetings?scheduled`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getUpcomingMeetingsForUser = () => {
  return fetch(`http://localhost:8000/networkmeetings?upcoming`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const createContact = (contact) => {
  return fetch("http://localhost:8000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(contact),
  }).then((res) => res.json());
};

export const createNetworkMeeting = (contact) => {
  return fetch("http://localhost:8000/networkmeetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(contact),
  }).then((res) => res.json());
};

export const getSingleContact = (id) => {
  return fetch(`http://localhost:8000/contacts/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const updateContact = (contact, contactId) => {
  return fetch(`http://localhost:8000/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(contact),
  });
};

export const getAllContactsByNameSearch = (searched) => {
  return fetch(`http://localhost:8000/contacts?name=${searched}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};


export const sendConnectionFilterRequest = (connectionValue) => {
  return fetch(`http://localhost:8000/contacts?connection=${connectionValue}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendAscendingSortNameRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=name&order=asc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendDescendingSortNameRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=name&order=desc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendAscendingSortContactNumberRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=contactnumber&order=asc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendDescendingSortContactNumberRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=contactnumber&order=desc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendAscendingSortConnectionLevelRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=contactnumber&order=asc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendDescendingSortConnectionLevelRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=connection&order=desc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};


export const sendAscendingSortLastContactRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=lastcontact&order=asc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const sendDescendingSortLastContactRequest = () => {
  return fetch(`http://localhost:8000/contacts?sortby=lastcontact&order=desc`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const deleteContact = (id) => {
  return fetch(`http://localhost:8000/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};

export const deleteNetworkMeeting = (id) => {
  return fetch(`http://localhost:8000/networkmeetings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};