import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginUser } from "../managers/AuthManager"
import { IconArrowLeft} from "@tabler/icons"
import SalyDeskImage from "../views/HompageImages/Saly-10.png";
import SeekerLogoBlueZoom from "../views/HompageImages/SeekerLogoBlueZoom.svg";


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


    const NavLogoText = "< JobSeeker />";

  return (
    <main className="min-h-screen flex justify-center  bg-pinkswirl h-full">
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
            <section className="self-center border p-10 rounded-md bg-white w-3/4 flex-col h-1/2 mt-14">
              <img className="w-1/2 mb-10 ml-32" src={SeekerLogoBlueZoom}></img>
              <form className="" onSubmit={handleLogin}>
                <fieldset className="flex-col space-y-2">
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      type="text"
                      ref={username}
                    />
                  </div>
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      type="password"
                      ref={password}
                    />
                  </div>
                </fieldset>
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 mt-4 w-40"
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
      <section className="bg-home w-1/2 flex justify-center">
        <img className="h-3/4" src={SalyDeskImage}></img>
      </section>
    </main>
  );
}
