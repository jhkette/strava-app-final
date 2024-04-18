import React from "react";
import EventCalendar from "./components/Calender";
import { useAuth } from "./context/AuthContext";
//  landing page with activity calender


/*
* The landing page is either the login pages
* or the calender page
*/
export default function Landing({ userActivities, link, message }) {
  const { auth } = useAuth();

  return (
    <>
      {auth === false && (
        <main className="min-h-screen bg-[url('./images/balach_cover.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col content-center justify-center">
          <div className="px-32 pb-16 ">
            <div className=" p-8 opacity-70 rounded-md bg-blue-100 ">
              <p className="py-4 font-bold text-xl ">
                Please click authorise. For this app to work best you should
                upload a mixture of running and cycling. Ideally, you should
                upload at least one 10k run and some hard cycling efforts, with
                a power meter, of between 12 and 20 minutes. Also ensure you
                have a weight attached to your profile. It is under Settings{" "}
                {">"} My Profile in strava.
              </p>

              <button className="bg-sky-800 px-6 py-2 rounded-lg  text-xl hover:bg-green-600 hover:text-slate-900 transition ease-in-out">
                <a href={!!link && link} className="text-white">
                  Authorise Strava
                </a>
              </button>
            </div>
          </div>
        </main>
      )}
     
      {!!userActivities.length && (
        <main className="min-h-screen">
          <div className="px-24 py-16">
       
        
            <EventCalendar userActivities={userActivities} />
          </div>
        </main>
      )}
    </>
  );
}
