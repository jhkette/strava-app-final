import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import regression from "regression";
import { intervalToDuration } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * This returns a regression chart rides
 * the actual graph is constrcuted in the useffect function
 * I have had to create several that the relevant data is present
 * then I construct the chart - it gets passed as a parameter to the canvas 
 * The first part of the function decide which power profile to use. 
 * 
 */
export default function RidechartRegression({
  regdata,
  userRecords: { cyclingpbs },
  weight,
  ftp,
}) {
  let predWkg;
  let pbLevel;
  if (cyclingpbs && weight && regdata[0] !== undefined) {
    console.log(cyclingpbs);
    if (regdata[0]["name"] === "Bealach-na-ba") {
      if (cyclingpbs["1200"] / weight >= 6.5) {
        predWkg = cyclingpbs["1200"];
        pbLevel = "your best 20 minute power"
      } else if (cyclingpbs["1800"] / weight >= 5) {
        predWkg = cyclingpbs["1800"];
        pbLevel = "your best 30 minute power"
      } else if (ftp / weight >= 4) {
        predWkg = ftp / weight;
        pbLevel = "your FTP level power"
      } else {
        predWkg = (ftp / weight) * 0.9;
        pbLevel = "90% of your FTP level power"
      }
    }

    if (regdata[0]["name"] === "Hardknott pass") {
      if (cyclingpbs["480"] / weight >= 6.8) {
        predWkg = cyclingpbs["480"] / weight;
        pbLevel = "your best 8 minute power"
      } else if (cyclingpbs["600"] / weight >= 5.9) {
        predWkg = cyclingpbs["600"] / weight;
        pbLevel = "your best 10 minute power"
      } else if (cyclingpbs["720"] / weight >= 4.4) {
        predWkg = cyclingpbs["720"] / weight;
        pbLevel = "your best 12 minute power"
      } else if (cyclingpbs["900"] / weight >= 3.2) {
        predWkg = cyclingpbs["900"] / weight;
        pbLevel = "your best 15 minute power"
      } else {
        predWkg = cyclingpbs["1200"] / weight;
        pbLevel = "your best 20 minute power"
      }
    }
  }

  // console.log(regdata[0]["name"], predWkg, weight, ftp, predWkg2);

  // https://www.youtube.com/watch?v=1b1wC1ksJoI
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  // initialising variable so they are avialble outside if statement
  let regData,
    finalScatter,
    expRegression,
    prediction,
    formattedPred,
    sorted

   // I need to check there is data first, passed in as props
  if (regdata.length) {
    regData = regdata[0]["dataset"].map(({ x, y }) => {
      return [parseFloat(x), parseInt(y)]; //  need a list of [[x1, y1], [x2, y2], ...]
    });

    finalScatter = regData.map((item) => {
      return { x: item[0], y: item[1] };
    });

    expRegression = regression.polynomial(regData);

    prediction = Math.round(expRegression.predict([predWkg])[1]);

    sorted = expRegression.points.sort(function (a, b) {
      return a[0] - b[0];
    });

    function humanDuration(time) {
      return intervalToDuration({ start: 0, end: time * 1000 });
    }

    formattedPred = humanDuration(prediction);
  }

  useEffect(() => {
    if (!regdata) { // if there is no props data return
      return;
    }
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (chartRef.current !== null) {
      const myChartRef = chartRef.current.getContext("2d");

      // create  a new chart with the options  defined below
      chartInstance.current = new Chart(myChartRef, {
        type: "scatter",
        data: {
          labels: sorted.map((data) => data[0]),
          datasets: [
            {
              type: "line",
              label: "Polynomial regression",
              data: sorted.map((data) => data[1]),
              borderColor: "#00897b",
              backgroundColor: "#00897b88",

              showLine: true,
            },
            {
              type: "scatter",
              label: `${regdata[0]["name"]} dataset`,
              data: finalScatter,
              fill: false,
              borderColor: "rgb(54, 162, 235)",

              showLine: false,
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 3,
            },
          },
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false, 
            },
            annotation: {
              annotations: {
                point1: {
                  type: "point",
                  xValue: predWkg,
                  yValue: prediction,
                  borderColor: "#000",
                  backgroundColor: "#00000088",
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Watts/kg of bodyweight",
           
                font: {
                  
                  family: "lato",
                  size: 18,
                },
              },
              suggestedMin: 1,
              // type: "linear",
              beginAtZero: false,

              ticks: {
                color: "#1a1a1a",
                font: {
                  fontSize: "8pts",
                  family: "lato"
                },
      
              },
            },
            y: {
              title: {
                display: true,
                text: `${regdata[0]["name"]} time (hh:mm)`,
                font: {
                
          family: "lato",
                  size: 18,
                },
              },

              grace: "15%",
              ticks: {
                stepSize: 10,
                color: "#1a1a1a",
                font: {
                  fontSize: "8pts",
                  family: "lato"
                },
              
                callback: (val) => {
                  if (val < 60) {
                    return `${val} seconds`;
                  }
                  const remainder = val % 60;
                  const minutes = (val - remainder) / 60;
                  if (val < 60) {
                    return `${minutes}mins`;
                  }
                  let hoursRemainder = minutes % 60;

                  const hours = (minutes - hoursRemainder) / 60;
                  if ((hours > 0) &&(hoursRemainder < 10)) {
                    hoursRemainder = `0${hoursRemainder}`;
                  }
                  if ((hours === 0) &&(hoursRemainder < 10)) {
                    
                    return `0:0${hoursRemainder}`;
                  }
                  return `${hours}:${hoursRemainder}`;
                },
              },
            },
          },
        },
      });
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }
  }, [finalScatter, regdata, sorted, prediction, predWkg]);
   // ternary operator to check for the initial regression data
  return regdata.length ? (
    <div className="w-11/12 bg-white p-8">
      {/* add the chartRef, the chart data to the canvas */}
      <canvas ref={chartRef} className="w-full" />
      {/* some conditional formatting to check time is readable */}
      <p className="border-b-2 my-4 border-green-800 text-lg inline-block text-l font-bold">
        {" "} Your predicted time is: 
        {formattedPred["hours"] ? formattedPred["hours"] : ""}{" "}
        {formattedPred["minutes"]}:
        {formattedPred["seconds"] < 10
          ? "0" + formattedPred["seconds"]
          : formattedPred["seconds"]}
      </p>
      <p className="text-lg">This calcuation is based on you holding {pbLevel} for the duration of the ride. </p>
    </div>
  ) : ( // if not present spinner
    <p>
      {" "}
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    </p>
  );
}
