import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser } from "../managers/AuthManager"
import { IconUserCircle} from "@tabler/icons"

export const Login = ({ setToken }) => {
  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    LoginUser(user).then(res => {
      if ("valid" in res && res.valid) {
        setToken(res.token)
        navigate("/dashboard")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <main className="min-h-screen flex justify-center align-center bg-gradient-to-r from-home-orange via-home-blue to-home-orange">
      <section className="self-center border p-10 rounded-md bg-white">
        <form className="" onSubmit={handleLogin}>
          <h1 className="title">Job Seeker</h1>
          <p className="subtitle">Please sign in</p>

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                ref={username}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                ref={password}
              />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
            <div className="control">
              <Link to="/register" className="button is-link is-light">
                Cancel
              </Link>
            </div>
          </div>
          {isUnsuccessful ? (
            <p className="help is-danger">Username or password not valid</p>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
}
