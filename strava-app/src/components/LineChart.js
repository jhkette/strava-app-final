import React from "react";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-date-fns";
// import { enUS } from 'date-fns/locale';
import "chartjs-adapter-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faSpinner
} from "@fortawesome/free-solid-svg-icons";


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

/**
 * 
 * 
 * Creates line chart for cycling power graph 
 */
export default function LineChart(props) {

  if(!props.power.cyclingpbs){ // if no data show spinner
    return(
      <FontAwesomeIcon icon={faSpinner} spinPulse />
    )
  }


const labels = Object.keys(props.power.cyclingpbs)


const floatingLabels = {
  id: 'floatingLabels',
  afterDatasetDraw(chart, args, options){
    const {ctx,  scales:{x,y}} = chart

    // var xAxis = chart.scales.x;
    // var yAxis = chart.scales.y;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0d5f96';
    ctx.font = '.95rem Lato'
    var finalx = x.getPixelForValue('940')
    var finaly = y.getPixelForValue(props.power.cyclingFTP - 60)
    ctx.fillText(`Functional threshold power estimate ${props.power.cyclingFTP }`, finalx, finaly )
  }
}


const options = {
  responsive: true,
 
  plugins: {
    title: {
      display: true,
      text: "Cycling power chart",
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: props.power.cyclingFTP,
          yMax: props.power.cyclingFTP,
          borderColor: "#0d5f96",
          borderWidth: 3,
          borderDash: [4],
        },
      },
    },
    tooltip: {
      callbacks: {
        label: ((tooltipItem, data) => {
          return tooltipItem.formattedValue + " watts"
        }),
        title: ((tooltipItems, data) => {
        
          const tooltipItem = tooltipItems[0];
          
          if(tooltipItem.label <= 60){
            return tooltipItem.label + " seconds"
          }
          // if(tooltipItem.label === '1,200'){
          //   return '20 mins'
          // }
          const commaStrippedLabel = tooltipItem.label.replace(/[, ]+/g, "").trim();

          const seconds = commaStrippedLabel % 60
          
          if(seconds ===0){
            return `${(commaStrippedLabel / 60)} mins`
          }
        
          return `${(commaStrippedLabel - seconds) / 60} mins ${seconds} seconds`
        })
      }
    }
  },
  scales: {
    x: {
      type: "linear",
      beginAtZero: true,
      ticks: {
        stepSize: 60,
        color: "#1a1a1a",
        font: {
          size: 14,
          family: "lato"
        },
       
        callback: (val) => {
          if (val < 60) {
            return val;
          }
          const remainder = val % 60;
          const minutes = (val - remainder) / 60;
          return `${minutes} min`;
        },
      },
      title: {
        display: true,
        text: "Time",
        font: {
       
          family: "lato",
          size: 22,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Power in watts",
        font: {
         
          family: "lato",
          size: 22,
        },
      },
      ticks: {
        font:{
          family: "lato",
          size: 14,
        }
      },
  
      beginAtZero: true,
    },
  },
};

//   https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/types/line.html
 const data = {
  labels,
  datasets: [
    {
      label: "Best power",
      data: Object.values(props.power.cyclingpbs),
      borderColor: "#00897b",
      backgroundColor: "#84cec7",
    },
  ],
};


  return <Line options={options} plugins={[floatingLabels]} data={data}  className="bg-white p-4"/>;
}
