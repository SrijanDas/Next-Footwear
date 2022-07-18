import React from "react";
import { HiCheck, HiOutlineX } from "react-icons/hi";

function AccountDetails({ isAuthenticated, user }) {
  return (
    <div className="AccountDetails bg-white rounded-lg border border-gray-200 shadow-md p-4">
      <div className="border-b-2 border-gray-300 pb-2 mb-2">
        <span className="text-xl font-semibold text-gray-500 uppercase flex items-center gap-2">
          Login
          {isAuthenticated ? (
            <div className="badge badge-md badge-primary">
              <HiCheck />
            </div>
          ) : (
            <div className="badge badge-md badge-error">
              <HiOutlineX />
            </div>
          )}
        </span>
      </div>

      {isAuthenticated ? (
        <div className="flex flex-col gap-2">
          <span className="text-gray-600">
            Welcome, <strong>{user.name}</strong>
          </span>
          <span className="text-gray-600">
            You are logged in as <strong>{user.username}</strong>
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-gray-600">You are not logged in.</span>
          <span className="text-gray-600">Please login to continue.</span>
        </div>
      )}
    </div>
  );
}

export default AccountDetails;
