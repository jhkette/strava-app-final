import React from "react";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns";
// import { enUS } from 'date-fns/locale';
import "chartjs-adapter-moment";
import { intervalToDuration } from "date-fns";



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,

  annotationPlugin,
  Title,
  Tooltip,
  Legend
);

export default function Linechart(props) {
  if (!props.data.runningpbs) {
    return (
      <div>
        <p>
          {" "}
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </p>
      </div>
    );
  }

  const finaldata = [];

  let floatingLabels;

  if (props.data.runningpbs) {
    const timeObj = props.data.runningpbs;

    for (let key in timeObj) {
      const mins = timeObj[key];
      const distance = key / 1000;

      const speed = distance / mins;

      const perkm = 1 / speed;
      finaldata.push(perkm);
    }

    floatingLabels = {
      id: 'floatingLabels',
      afterDatasetDraw(chart, args, options){
        const {ctx, scales:{x,y}} = chart
    
        // var xAxis = chart.scales.x;
        // var yAxis = chart.scales.y;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0d5f96';
        ctx.font = '1rem Lato'
        var finalx = x.getPixelForValue('5000')
        var finaly = y.getPixelForValue((props.data.runningpbs["10000"]/10) + 5)
        ctx.fillText(`Critical pace estimate `, finalx, finaly )
      }
    }
  }


  const labels = Object.keys(props.data.runningpbs);
  console.log(props.data.runningpbs)
  const options = {
  
   
    responsive: true,
    plugins: {
      plugins: {
        title: {
          display: true,
          text: "Running pace chart",
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: props.data.runningpbs["10000"] / 10,
            yMax: props.data.runningpbs["10000"]  / 10,
            borderColor: "#0d5f96",
            borderWidth: 3,
            borderDash: [4],
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem, data) => {
            const duration = intervalToDuration({
              start: 0,
              end: tooltipItem.formattedValue * 1000,
            });

            console.log(duration);

            let perKmPaceSeconds = duration["seconds"];
            if (duration["seconds"] === undefined) {
              return `${duration["minutes"]}:00 per/km`;
            }
            if (duration["seconds"] < 10) {
              // add 0 to the string if duration of seconds is less that 10 ie 09 seconds
              perKmPaceSeconds = `0${duration["seconds"]}`;
            }
            return `${duration["minutes"]}:${perKmPaceSeconds} per/km`;
            // return tooltipItem.formattedValue + " seconds";
          },
          title: (tooltipItems, data) => {
            const tooltipItem = tooltipItems[0];
            if (tooltipItem.label === "2,414") {
              return "1.5 miles";
            }
            return `${tooltipItem.label} metres`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          color: "#1a1a1a",

          font: {
          
            family: "lato",
         
            size: 14,
            
          },
        },
        title: {
          display: true,
          text: "Distance in metres",
          font: {
            family: "lato",
            size: 20,
          },
        },
      },
      y: {
        reverse: true,
        title: {
          display: true,
          text: "Best pace mins per km",
          font: {
           
            family: "lato",
            size: 20,
          },
        },
        ticks: {
          stepSize: 30,
          
          font:{
          family: "lato",
         
            size: 14,
          
          },
            
          callback: (val) => {
            if (val < 60) {
              return val;
            }
            const remainder = val % 60;
            const minutes = (val - remainder) / 60;
            if(remainder !== 0){
              return `${minutes}:${remainder}`;
            }
            return `${minutes}:00`;
          },
        },

        beginAtZero: false,
      },
    },
  };

  //   https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/line.html
  const data = {
    labels,
    datasets: [
      {
        label: "Best pace",
        data: finaldata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  return <Line options={options} data={data} plugins={[floatingLabels]}  className="bg-white p-4"/>;
}
