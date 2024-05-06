import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiking,
  faCalendar,
  faDoorOpen,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// sidebar component - contains links to other pages depending on auth status
export default function Sidebar({
  logout,
  userActivities,
  message,
  importData,
}) {
  const { auth } = useAuth();
  return (
    <div className="h-auto w-4/12 bg-slate-200 min-h-screen drop-shadow-2xl">
      <nav className="flex flex-col p-16 ml-8">
        <div className="flex flex-row justify-start items-center py-2 border-b border-black/10">
          <div className="w-10">
            <FontAwesomeIcon icon={faCalendar} size="xl" />
          </div>
          <p className="p-2 text-lg">
            <Link to="/"> Home </Link>
          </p>
        </div>
        {!!userActivities.length && (
          <div className="flex flex-row justify-start items-center py-2 border-b border-black/10">
            <div className="w-10">
              <FontAwesomeIcon icon={faBiking} size="xl" />
            </div>
            <p className="p-2 text-lg">
              <Link to="/cycling"> Cycling</Link>
            </p>
          </div>
        )}
        {!!userActivities.length && (
          <div className="flex flex-row justify-start items-center py-2 border-b border-black/10">
            <div className="w-10">
              <FontAwesomeIcon icon={faRunning} size="xl" />
            </div>
            <p className=" p-2 text-lg">
              <Link to="/running"> Running</Link>
            </p>
          </div>
        )}

        {auth && (
          <div className="flex flex-row justify-start items-center py-2 border-b  border-black/10">
            <div className="w-10">
              <FontAwesomeIcon icon={faDoorOpen} size="xl" />
            </div>
            <p className=" p-2 text-lg cursor-pointer" onClick={logout}>
              Logout
            </p>
          </div>
        )}

        {auth && !userActivities.length ? (
          <div className="flex flex-row justify-start items-center py-16">
            <div className="w-10"></div>
            <div>
              <button
                className="bg-white px-6 py-2 rounded-md hover:bg-green-700 hover:text-white transition ease-in-out"
                onClick={importData}
              >
                {message ? "importing" : "import"}
              </button>
              <p className="p-6 my-6 text-white bg-red-600  font-semibold">
                If this is your first time logging in - please click import.
                This will retrieve data from Strava. Your future activities will
                then be added automatically.
              </p>
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
