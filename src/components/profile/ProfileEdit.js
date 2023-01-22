import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentSeeker, updateProfile } from "../managers/AuthManager";

// Profile Edit Component allows user to edit their profile information.

export const ProfileEdit = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getCurrentSeeker().then((seeker) => {
      const updatedSeeker = {
        id: seeker.id,
        first_name: seeker.user.first_name,
        last_name: seeker.user.last_name,
        username: seeker.user.username,
        email: seeker.user.email,
        current_role: seeker.current_role,
        bio: seeker.bio,
        elevator_pitch: seeker.elevator_pitch,
      };
      setProfile(updatedSeeker);
    });
  }, []);

  const navigate = useNavigate();

  const putRequestForProfile = (event) => {
    event.preventDefault();

    const profileToApi = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      username: profile.username,
      email: profile.email,
      current_role: profile.current_role,
      bio: profile.bio,
      elevator_pitch: profile.elevator_pitch,
    };

    updateProfile(profileToApi, profile.id).then(() => {
      navigate(-1);
    });
  };

  return (
    <>
      <main className="flex-col w-screen h-screen space-y-4 text-white bg-pinkswirl">
        <h1 className="mt-5 mb-20 text-4xl font-quicksand">Edit Profile</h1>
        <div className="flex justify-center w-full h-5/6">
          <div className="flex-col w-4/5 p-10 bg-white border rounded -md h-5/6">
            <form className="flex-col">
              <fieldset className="mb-5 space-y-2">
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    First Name
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={profile.first_name}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.first_name = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={profile.last_name}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.last_name = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Username
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={profile.username}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.username = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Email
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={profile.email}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.email = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Current Role
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="How would you describe your job search?"
                    value={profile.current_role}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.current_role = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="goal"
                  >
                    Bio
                  </label>
                  <input
                    required
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What is the current role of this contact?"
                    value={profile.bio}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.bio = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
                <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm formSection focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                  <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Elevator Pitch
                  </label>
                  <textarea
                    required
                    type="text"
                    className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 form-input focus:ring-0 sm:text-sm"
                    placeholder="What does this contact currently work?"
                    value={profile.elevator_pitch}
                    onChange={(evt) => {
                      const copy = { ...profile };
                      copy.elevator_pitch = evt.target.value;
                      setProfile(copy);
                    }}
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                className="px-4 py-2 mb-2 mr-2 text-sm font-medium text-center text-white transition ease-in-out rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
                onClick={(clickEvent) => putRequestForProfile(clickEvent)}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
