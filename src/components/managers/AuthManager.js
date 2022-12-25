

export const LoginUser = (user) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => res.json())
}

export const registerUser = (newUser) => {
  return fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}

export const getCurrentUser = () => {
  return fetch(`http://localhost:8000/currentseeker`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("seeker_token")}`,
    },
  }).then((res) => res.json());
};
