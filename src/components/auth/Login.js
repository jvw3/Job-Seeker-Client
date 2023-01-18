import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser } from "../managers/AuthManager"
import { IconArrowLeft} from "@tabler/icons"
import SalyDeskImage from "../views/HompageImages/Saly-10.png";
import SeekerLogoBlueZoom from "../views/HompageImages/SeekerLogoBlueZoom.svg";

// Login Component handles authenticating users on sign in.

export const Login = ({ setToken, setUserId, setIsStaff }) => {
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
        setIsStaff(res.isStaff)
        setUserId(res.userId)
        navigate("/dashboard")
      }
      else {
        setisUnsuccessful(true)
      }
    })
  }

  return (
    <main className="flex justify-center h-full min-h-screen bg-pinkswirl">
      <div className="flex-col w-1/2 p-5">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <IconArrowLeft color="white" className="" />
        </button>
        <div className="h-full">
          <div className="flex justify-center">
            <section className="flex-col self-center w-3/4 p-10 bg-white border rounded-md h-1/2 mt-14">
              <img className="w-1/2 mb-10 ml-32" src={SeekerLogoBlueZoom}></img>
              <form className="" onSubmit={handleLogin}>
                <fieldset className="flex-col space-y-2">
                  <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                      type="text"
                      ref={username}
                    />
                  </div>
                  <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                      type="password"
                      ref={password}
                    />
                  </div>
                </fieldset>
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="w-40 px-4 py-2 mt-4 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>
                </div>
                {isUnsuccessful ? (
                  <p className="text-red-600">Username or password not valid</p>
                ) : (
                  ""
                )}
              </form>
            </section>
          </div>
        </div>
      </div>
      <section className="flex justify-center w-1/2 bg-home">
        <img className="h-3/4" src={SalyDeskImage}></img>
      </section>
    </main>
  );
}
