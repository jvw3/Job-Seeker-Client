import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../managers/AuthManager"
import { IconArrowLeft } from "@tabler/icons";
import SalyDeskImage from "../views/HompageImages/Saly-10.png";
import SeekerLogoBlueZoom from "../views/HompageImages/SeekerLogoBlueZoom.svg";

export const Register = ({setToken}) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const current_role = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        current_role: current_role.current.value
      }

      registerUser(newUser)
        .then(res => {
          if ("successful" in res && res.successful) {
            navigate("/login")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

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
            <section className="self-center border p-5 rounded-md bg-white w-3/4 flex-col h-80">
              <img className="w-1/6 ml-60" src={SeekerLogoBlueZoom}></img>
              <form className="column is-two-thirds" onSubmit={handleRegister}>
                <h1 className="title mb-2"></h1>
                <p className="mb-2 text-seeker-blue text-2xl font-quicksand">
                  Create an account
                </p>
                <fieldset className="space-y-2">
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      First Name
                    </label>
                    <div className="control">
                      <input
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        type="text"
                        ref={firstName}
                      />
                    </div>
                  </div>
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Last Name
                    </label>
                    <div className="control">
                      <input
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        type="text"
                        ref={lastName}
                      />
                    </div>
                  </div>

                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Username
                    </label>
                    <div className="control">
                      <input
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        type="text"
                        ref={username}
                      />
                    </div>
                  </div>

                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        type="email"
                        ref={email}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="field mt-3 mb-3">
                  <label className="text-seeker-blue font-quicksand">
                    Password
                  </label>
                  <div className="space-y-2">
                    <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                      <p className="block text-xs font-medium text-gray-900">
                        <input
                          className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          type="password"
                          placeholder="Password"
                          ref={password}
                        />
                      </p>
                    </div>

                    <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                      <p className="block text-xs font-medium text-gray-900">
                        <input
                          className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          type="password"
                          placeholder="Verify Password"
                          ref={verifyPassword}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <fieldset className="space-y-5">
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Current Role:
                    </label>
                    <div className="">
                      <input
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Where are you working?"
                        ref={current_role}
                      ></input>
                    </div>
                  </div>
                  <div className="formSection rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                    <label className="block text-xs font-medium text-gray-900">
                      Bio
                    </label>
                    <div className="control">
                      <textarea
                        className="form-input block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Tell us about yourself..."
                        ref={bio}
                      ></textarea>
                    </div>
                  </div>
                </fieldset>
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 mt-4 w-40"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
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
