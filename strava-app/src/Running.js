import React from "react";
import RunChart from "./components/RunChart";
import DoughnutChart from "./components/Doughnut";
import RunchartRegression from "./components/RunChartRegression";

// running page with charts
export default function Running({ userRecords, mardataset, halfdataset }) {
  return (
    <section className="min-h-screen px-24">
      {userRecords.runningpbs && (
        <>
          <section className="w-full">
            <h1 className="pb-8">Pace chart: minutes per km </h1>
            <RunChart data={userRecords} />
            <p className="pt-8 text-lg">This is a pace chart of your best performances for different distances. The critical pace line  should represent a pace you 
            can hold for between 40 and 60 minutes.</p>
          </section>

          <section className="flex flex-wrap w-full pt-16  justify-between">
            <div className="w-4/12 py-4 pr-8">
              <h2 className="pb-4">Half Marathon prediction / pacing</h2>
              <p className="text-lg">
                The blue scatter points represent a dataset of runners with 5k times on the x
                axis and half marathon on the y axis. The red line is a linear
                regression line mapped onto the dataset. The circle is your 5k
                time added to the regression line, which gives the prediction
                of your half marathon time.  The reccomended pace suggests a reasonable pace for this event.
              </p>
            </div>
            <div className="w-8/12 py-4">
              <RunchartRegression
                userRecords={userRecords}
                event={"Half Marathon"}
                regdata={halfdataset}
              />
            </div>
          </section>
          <section className="flex flex-wrap w-full pt-16 justify-between">
            <div className="w-8/12 py-12">
              <RunchartRegression
                userRecords={userRecords}
                event={"Marathon"}
                regdata={mardataset}
              />
            </div>
            <div className="w-4/12 py-12 pl-8">
              <h2 className="pb-4">Marathon prediction / pacing</h2>
              <p className="text-lg">
              The blue scatter points represent a dataset of runners with 5k times on the x
                axis and marathon on the y axis. The red line is a linear
                regression line mapped onto the dataset. The circle is your 5k
                time added to the regression line, which gives the prediction
                of your marathon time. The reccomended pace suggests a reasonable pace for this event.
              </p>
            </div>
          </section>
          <section className="flex flex-wrap w-full py-16 justify-between">
            <div className="w-5/12 py-18">
              <DoughnutChart hr={userRecords.runHrZones} />
            </div>
            <div className="w-7/12 py-12 pl-8">
              <h2 className="pb-4">Heart rate zones</h2>
              <p className="text-lg">
                These are your heart rate zones - derived from your max heart-rate - calculated by the app.
                Zone 2 heart rate should corrospond to easy runs, zone 3 tempo. zone 4 threshold and finally, zone5 your vo2 max zone.
              </p>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
