

export const createInterview = (interview) => {
  return fetch("http://localhost:8000/interviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(interview),
  }).then((res) => res.json());
};

export const createCustomPrep = (prep) => {
  return fetch("http://localhost:8000/custompreps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(prep),
  }).then((res) => res.json());
};

export const getUpcomingInterviewsForUser = () => {
  return fetch(`http://localhost:8000/interviews?upcoming`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};


export const getInterviewPrepsForUser = () => {
  return fetch(`http://localhost:8000/interviewpreps?currentseeker`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const deleteInterview = (id) => {
  return fetch(`http://localhost:8000/interviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};


export const deleteCustomPrep = (id) => {
  return fetch(`http://localhost:8000/custompreps/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};

export const getSingleInterview = (id) => {
  return fetch(`http://localhost:8000/interviews/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
}

export const getSingleInterviewPrep = (id) => {
  return fetch(`http://localhost:8000/interviewpreps/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};