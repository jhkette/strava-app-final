import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
// context
import { useAuth } from "./context/AuthContext";
// components
import ReturnProfile from "./components/UserProfile";
import Sidebar from "./components/Sidebar";
import Landing from "./Landing";
import Cycling from "./Cycling";
import Running from "./Running";
import ProtectedRoute from "./protectRoute";


import powered from "./images/powered.png";
// AIzaSyCe3QhH1ZHrGz3jRZFhhojd-LPtov-otH8
function App() {
  const [link, setLink] = useState();

  // const [auth, setAuth] = useState(false);
  const [athlete, setAthlete] = useState({});

  const [latest, setLatest] = useState(null);
  const [userActivities, setUseractivities] = useState([]);
  const [userRecords, setUserRecords] = useState({});
  const [marathon, setMarathon] = useState({});
  const [half, setHalf] = useState({});
  const [alpe, setAlpe] = useState({});

  const [message, setMessage] = useState("");
  const [hardknott, setHardknott] = useState({});
  const [scotland, setScotland] = useState({});

  const baseURL = "http://localhost:3000/api";

  // impprt react context auth - this gives access to global auth state
  const {auth, setAuth } = useAuth();

  /*
   * Useffect function runs when page loads,
   * return the oauth link to authorise strava
   */
  useEffect(() => {
    axios
      .get(baseURL + "/auth/link")
      .then((res) => setLink(res.data.link))
      .catch((err) => {
        console.log(err);
      });
  }, [baseURL]);

  // useffect function - gets the main athlete data from /user/athlete/
  // and the datasets from /data/datasets. Then sets the state variables
  // with response.
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth(true);
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const getData = async () => {
      try {
        const userData = await axios.get(baseURL + "/user/athlete", config);
        const dataSet = await axios.get(baseURL + "/data/datasets", config);
        if (userData.data.errors) {
          console.log(userData.data.errors);
          return;
        }
        // set the state values with response
        setAthlete(userData.data.profile);

        const userRecordsInfo = _.omit(userData.data.user, "activities");
        setUserRecords(userRecordsInfo);
        setUseractivities(userData.data.user.activities);
        setLatest(
          userData.data.user.activities[
            userData.data.user.activities.length - 1
          ]["start_date"]
        );
        setMarathon(dataSet.data.marathon);
        setHalf(dataSet.data.half);
        setAlpe(dataSet.data.alpe);

        setHardknott(dataSet.data.hardknott);
        setScotland(dataSet.data.scotland);
      } catch (error) {
        console.log(error);
      }
    };
    // only call the get data function
    // if there is a token - avoid axios error
    if (token) {
      getData();
    }
  }, [setAuth]);
  /**
   * useffect data
   * get the latest data from strava api
   * call the api with the date of last activity in app state.
   * get all events recorded after that.
   */
  useEffect(() => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const getLatestData = async () => {
      try {
        // date is a unix timestamp - just modifying so it works with strava api
        const date = Math.floor(Date.parse(latest) / 1000);
        const activities = await axios.get(
          baseURL + `/user/activities/${date}`,
          config
        );
        // if an error object from api call return
        if (activities.data.error) {
          console.log(activities.data.error);
          return;
        } else {
          if (activities.data.length) {
            setUseractivities((oldArray) => [...oldArray, ...activities.data]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth && latest && userActivities.length) {
      getLatestData();
    }
  }, [auth, latest, userActivities]);

  /**
   * function importData
   * function runs when user logs in for first time
   * and first set of data is imported.
   * setsUserRecords and
   * setsUseractivities
   * @returns void
   */
  const importData = async () => {
    const token = Cookies.get("token");
    setMessage("Please come back and login after an hour");
    const config = {
      headers: { Authorization: `Bearer ${token}`, id: athlete.id },
    };
    axios(baseURL + `/user/activities/activities-list`, config);

    setTimeout(() => {
      logout();
    }, 20000);
  };

  /**
   * function logout
   * remove token
   * calls logout function on server
   * @return void
   */
  const logout = () => {
    setAuth(false);
    setMessage("");
    Cookies.remove("token");

    axios.get(baseURL + "/auth/logout");
    window.location.href = "/";
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  // define weight variable for cycling page
  let weight;
  if (athlete.weight === undefined) {
    weight = 75;
  } else {
    weight = athlete.weight;
  }

  return (
    <div className="font-body flex">
      <Sidebar
        logout={logout}
        importData={importData}
        userActivities={userActivities}
      />
      <div className="h-auto w-full ">
        {!!athlete.id && (
          <header className="pt-4 px-24 w-full flex justify-end ">
            {message && <h3>{message}</h3>}
            {faSquareArrowUpRight && (
              <div>
                <ReturnProfile athlete={athlete} />{" "}
              </div>
            )}
          </header>
        )}

        <div className="bg-grey-50">
          {/* App Naviation each route shows a different element in the 
          main block of the page/ ie the cycling page, running page etc*/}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Landing
                  auth={auth}
                  logout={logout}
                  userActivities={userActivities}
                  importData={importData}
                  link={link}
                  message={message}
                />
              }
            ></Route>

            <Route exact path="/cycling" element={<ProtectedRoute />}>
              <Route
                path="/cycling"
                element={
                  <Cycling
                    userRecords={userRecords}
                    ftp={userRecords.cyclingFTP}
                    alpedataset={alpe}
                    scotland={scotland}
                    weight={weight}
                    hardknott={hardknott}
                  />
                }
              ></Route>
            </Route>
            <Route exact path="/running" element={<ProtectedRoute />}>
              <Route
                exact
                path="/running"
                element={
                  <Running
                    userRecords={userRecords}
                    mardataset={marathon}
                    halfdataset={half}
                  />
                }
              ></Route>
            </Route>
          </Routes>
          <footer className="flex   px-24 justify-end align-center">
            {auth && <div className="w-72 flex flex-col justify-end items-end">
             
              <img src={powered} alt="Logo" className="h-12 w-72" />
              <p className="text-orange-800 mr-4 pb-4">
                {" "}
                {athlete.id && (
                  <a
                    href={`https://www.strava.com/athletes/${athlete.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    View your profile on Strava{" "}
                  </a>
                )}
              </p>
            </div> }
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
