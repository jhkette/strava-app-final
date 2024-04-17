import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Active Recovery
// (<55%FTP)
// Endurance
// (55% - 75% FTP)
// Tempo
// (76% - 87% FTP)
// Sweet Spot
// (88% - 94% FTP)
// Threshold
// (95% - 105% FTP)
// VO2 Max
// (106% - 120% FTP)
// Anaerobic Capacity
// (>120% FTP)

/**
 * Creates zones table on cycling page
 */

export default function DoughnutChart({ ftp }) {
  if (!ftp) {
    return <FontAwesomeIcon icon={faSpinner} spinPulse />;
  }

 
   // ftp zones are calculated on the front end - ftp is a dynamic value -  so it minimises the amount of updates we need to
   // make to the database. It is also a very simple calculation
  const ftpzones = {
    zone1: [0, Math.round(ftp * 0.54)],
    zone2: [Math.round(ftp * 0.55), Math.round(ftp * 0.75)],
    zone3: [Math.round(ftp * 0.76), Math.round(ftp * 0.87)],
    zone4: [Math.round(ftp * 0.88), Math.round(ftp * 0.94)],
    zone5: [Math.round(ftp * 0.95), Math.round(ftp * 1.05)],
    zone6: [Math.round(ftp * 1.06), Math.round(ftp * 1.2)],
    zone7: [Math.round(ftp * 1.2)],
  };


  // returns zones table
  return (
    <div className="bg-white p-4">
    <table class="border-collapse table-fixed w-full text-sm ">
      <thead>
      <tr className="shadow-xl">
        <th class="border-b border-slate-600  pl-4  pb-4 text-left">Zone</th>
        <th class="border-b border-slate-600   pb-4 pl-4   text-left">Watts</th>
    
      </tr>
    </thead>
    <tbody>
      <tr  className=" pl-8 h-12 text-left bg-slate-300">
        <th className="pl-4">Zone 1: Active Recovery</th>
        <th className="pl-4">{'<'} {ftpzones.zone1[1]}</th>
      
      </tr>
      <tr className=" h-12 text-left bg-blue-200">
        <th className="pl-4">Zone 2: Endurance</th>
        <th className="pl-4">{ftpzones.zone2[0]} - {ftpzones.zone2[1]}</th>
      
      </tr >
      <tr className=" h-12 text-left bg-green-200">
        <th className="pl-4">Zone 3: Tempo</th>
        <th className="pl-4">{ftpzones.zone3[0]} - {ftpzones.zone3[1]}</th>
      
      </tr>
      <tr className=" h-12 text-left bg-green-300">
        <th className="pl-4">Zone 4: Sweet Spot</th>
        <th className="pl-4">{ftpzones.zone4[0]} - {ftpzones.zone4[1]}</th>
 
      </tr>
      <tr className=" h-12 text-left bg-yellow-200">
        <th className="pl-4">Zone 5: Threshold</th>
        <th className="pl-4">{ftpzones.zone5[0]} - {ftpzones.zone5[1]}</th>
        
      </tr>
      <tr className=" h-12 text-left bg-red-200">
        <th className="pl-4">Zone 6: VO2 Max</th>
        <th className="pl-4">{ftpzones.zone6[0]} - {ftpzones.zone6[1]}</th>
    
      </tr>
      <tr className=" h-12 text-left bg-red-300">
        <th className="pl-4"> Zone 7: Anaerobic</th>
        <th className="pl-4"> {'>'} {ftpzones.zone7[0]}</th>
   
      </tr>
      </tbody>
    </table>
    </div>
  );
}
