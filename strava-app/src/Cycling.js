import React from "react";
import GoogleMapReact from 'google-map-react';
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/Doughnut";
import RidechartRegression from "./components/RideChartRegression";
import Ftp from "./components/Ftp";

// cycling page
export default function Cycling({
  userRecords,
 
  hardknott,
  scotland,
  ftp,
  weight,
}) {




  const defaultProps = {
    center: {
      lat: 54.15241,
      lng: -2
    },
    zoom: 6
  };
  return (
    <section className="min-h-screen w-full py-4 px-24">
      <h1 className="text-2xl font-bold py-8 ">Power Chart</h1>
      <LineChart power={userRecords} />
      <p className="pt-8  text-lg">
        This is a power chart showing your power records for various time
        periods. Ideally, you wouldd want a high peak over the very short
        periods. For the longer periods it should only very gradually level out.
        Your FTP is marked with a dotted line - this is the theoretical power
        you can hold for an hour - based on an extrapolation from other time
        periods.{" "}
      </p>

      <section className="w-full pt-16">
        <h2 className="text-2xl font-bold mb-8">Predicting your climbing</h2>
        <p className="text-lg pb-8">
          Climbing is an important part of cycling. Here, I have used two
          datasets from Strava segments. These are short routes that Strava
          times to create a leaderboard. Bealach-na-ba represents your climbing ability over longer periods, whereas 
          Hardknott pass is a shorter climb - that should take between 10 and 20 minutes.
        </p>
        <RidechartRegression
          regdata={scotland}
          userRecords={userRecords}
          weight={weight}
          ftp={ftp}
        />
        <div className="flex flex-wrap w-full py-8  justify-between">
          <div className=" w-5/12 h-80 bg-[url('./images/balach.jpg')]  bg-no-repeat bg-cover bg-center border-8 border-slate-300"></div>
          <div className="w-7/12 pl-8">
            <h3>Bealach na Bà</h3>
            <p className="text-lg">
              Located in the Scottish highlands, Bealach na Bà is one of Britain's highest roads. This climb takes 25-45 minutes and will represent a threshold effort for most
              people.  
            </p>
          </div>
        </div>
      </section>

      <section className="w-full pt-16">
        <RidechartRegression
          regdata={hardknott}
          userRecords={userRecords}
          weight={weight}
          ftp={ftp}
        />
        <div className="flex flex-wrap w-full py-8  justify-between">
          <div className="w-7/12 pr-8">
            <h3>Hardknott pass</h3>
            <p className="text-lg">
              {" "}
             Hardknott pass is a climb in the Lake District with gradients of up to 30%. It is a shorter climb that should represent something between a 10 and 20 minute max effort. 
            </p>
          </div>
          <div className=" w-5/12 h-80  bg-[url('./images/hardknott2.jpg')]  bg-no-repeat bg-cover bg-center border-8 border-slate-300"></div>
        </div>
      </section>

      <section className="flex flex-wrap w-full justify-between pt-16">
        <div className="w-5/12">
          <h2 className="text-2xl font-bold pb-8">Training - Heart Rate</h2>
          <DoughnutChart hr={userRecords.bikeHrZones} />
        </div>
        <div className="w-6/12  py-6">
          <h3 className="pb-4">Heart rate zones</h3>
          <p className="text-lg">
            These are your heart rate zone -derived from your max heart-rate -
            calculated by the app. Zone 2 heart rate should corrospond to easy
            runs, zone 3 tempo. zone 4 threshold and finally, zone5 your vo2 max
            zone.
          </p>
        </div>
      </section>
      <section className="flex flex-wrap w-full py-16  justify-between pt-16">
        <div className="w-6/12 pr-8">
          <h2 className="text-2xl font-bold pb-8">Training - Power</h2>
          <h3 className="pb-4">Power zones</h3>
          <p className="text-lg">
            These are your power zones zone -derived from your FTP - calculated
            by the app. Each zone corrosponds to a different level of intensity.
          </p>
        </div>
        <div className="w-6/12  ">
          <Ftp ftp={ftp} />
        </div>
      </section>
      
    </section>
  );
}
