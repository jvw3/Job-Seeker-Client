


export const getContactsForUser = () => {
  return fetch(`http://localhost:8000/contacts`, {
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