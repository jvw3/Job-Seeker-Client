import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Error Page Component displays 404 page when a user attempts to access a url that doesn't exist.

export const ResourceNotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="flex w-full h-screen">
        <div className="flex-col justify-center w-3/6 bg-cover bg-notfound h-5/6">
          <div></div>
          <div className="flex">The Page that you request does not exist</div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="px-4 py-2 mb-2 text-sm font-medium text-center text-white transition ease-in-out rounded-md shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-blue-500/50"
          >
            Please Go Back To Previous Page
          </button>
        </div>
        <div className=""></div>
      </main>
    </>
  );
};
