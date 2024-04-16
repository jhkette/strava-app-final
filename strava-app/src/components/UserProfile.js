import React from 'react'
import { useAuth } from "../context/AuthContext";
const ReturnProfile = ({athlete}) => {
  const { auth } = useAuth();
   
    return (
      <div className='flex justify-end'>
        <div className='flex  flex-col items-end'>
       {(auth && athlete.profile) && <img className='h-12' src={athlete.profile} alt="profile" /> }
       {(auth &&athlete) &&  <p className="pt-4">
          You are logged in as {athlete.firstname} {athlete.lastname}
        </p> }
        </div>
      </div>
    );
  };

  export default ReturnProfile;
