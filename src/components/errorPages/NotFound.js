import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const ResourceNotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="bg-notfound w-full bg-contain bg-no-repeat flex justify-center items-end">
        <div className="pb-80">
          <div className="">The Page that you request does not exist</div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-md text-sm px-4 py-2 text-center mb-2"
          >
            Please Go Back To Previous Page
          </button>
        </div>
      </main>
    </>
  );
};
