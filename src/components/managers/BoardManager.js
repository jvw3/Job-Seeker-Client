import { useEffect }  from "react";

//? This custom react hook will be used when observing initial state and fetching data.
export const useFetch = (url, setter) => {

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setter(data));
  }, []);
};


//? This custom react hook will be used when observing state changes of specified state variable and fetching data.
export const useFetchObservingState = (url, setter, observedState) => {

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setter(data));
  }, [observedState]);
};

export const getAllBoardsForUser = () => {
    return fetch("http://localhost:8000/boards", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }


export const getAllJobs = () => {
    return fetch("http://localhost:8000/jobs", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

export const getAllCompanies = () => {
    return fetch("http://localhost:8000/companies", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

export const getAllCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }


export const getSingleBoardForUser = (id) => {
    return fetch(`http://localhost:8000/boards/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

export const getSingleJobForUser = (id) => {
    return fetch(`http://localhost:8000/boardjobs/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

    // GET request to fetch all board Jobs for the current board.
export const getAllJobsForBoard = (id) => {
  return fetch(`http://localhost:8000/boardjobs?board=${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllJobsForBoardAndCategory = (boardId, categoryId) => {
  return fetch(`http://localhost:8000/boardjobs?board=${boardId}&category=${categoryId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const createBoard = (board) => {
  return fetch("http://localhost:8000/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(board),
  }).then((res) => res.json());
};

export const createBoardJob = (boardJob) => {
  return fetch("http://localhost:8000/boardjobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(boardJob),
  }).then((res) => res.json());
};

export const updateBoard = (board, id) => {
  return fetch(`http://localhost:8000/boards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(board),
  });
};

export const deleteBoard = (id) => {
  return fetch(`http://localhost:8000/boards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};


export const deleteBoardJob = (id) => {
  return fetch(`http://localhost:8000/boardjobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};