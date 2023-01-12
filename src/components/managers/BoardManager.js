

//? RETRIEVE REQUESTS
export const getSingleBoardForUser = (id) => {
  return fetch(`http://localhost:8000/boards/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getSingleJob = (id) => {
  return fetch(`http://localhost:8000/jobs/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getSingleJobForUser = (id) => {
  return fetch(`http://localhost:8000/boardjobs/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};
export const getSingleInterviewForUser = (id) => {
  return fetch(`http://localhost:8000/interviews/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getSinglePriorityRankForBoard = (id) => {
  return fetch(`http://localhost:8000/priorityranks?board=${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllBoardsForUser = () => {
    return fetch("http://localhost:8000/boards", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

//? GET REQUESTS
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

export const getAllTags = () => {
    return fetch("http://localhost:8000/tags", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("seeker_token")}`
        }
    })
        .then(res => res.json())
    }

export const getAllJobsForBoard = (id) => {
  return fetch(`http://localhost:8000/boardjobs?board=${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getActiveBoard = () => {
  return fetch(`http://localhost:8000/boards?active`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllInterviewsForBoardJob = (id) => {
  return fetch(`http://localhost:8000/interviews?boardjob=${id}`, {
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

export const getAllBoardJobTagsForBoardJob = (boardJobId) => {
  return fetch(`http://localhost:8000/boardjobtags?boardjob=${boardJobId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllBoardCategoriesForBoard = (boardId) => {
  return fetch(`http://localhost:8000/boardcategories?board=${boardId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};


//? POST REQUESTS
export const createBoard = (board) => {
  return fetch("http://localhost:8000/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
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


export const createBoardJobTag = (boardJobTag) => {
  return fetch("http://localhost:8000/boardjobtags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(boardJobTag),
  }).then((res) => res.json());
};

export const createBoardCategory = (boardCategory) => {
  return fetch("http://localhost:8000/boardcategories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(boardCategory),
  }).then((res) => res.json());
};

//? UPDATE REQUESTS
export const updateBoard = (board, id) => {
  return fetch(`http://localhost:8000/boards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(board),
  });
};

export const updateBoardJob = (boardJob, id) => {
  return fetch(`http://localhost:8000/boardjobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(boardJob),
  });
};

export const updatePriorityRankForBoard = (priorityRank, id) => {
  return fetch(`http://localhost:8000/priorityranks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
    body: JSON.stringify(priorityRank),
  });
};

//? DELETE REQUESTS

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

export const deleteBoardJobTag = (id) => {
  return fetch(`http://localhost:8000/boardjobtags/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};
export const deleteBoardCategory = (id) => {
  return fetch(`http://localhost:8000/boardcategories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  });
};

