


export const getContactsForUser = () => {
  return fetch(`http://localhost:8000/contacts`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};