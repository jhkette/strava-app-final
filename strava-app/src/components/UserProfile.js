import React from "react";
import { useAuth } from "../context/AuthContext";
const ReturnProfile = ({ athlete }) => {
  const { auth } = useAuth();

  let finalImg;
  const img = athlete.profile.search(/cloudfront/);

  if (img === -1) {
    finalImg = `https://eu.ui-avatars.com/api/?name=${athlete.firstname}+${athlete.lastname}&size=250`
  } else {
    finalImg = athlete.profile
  }

  return (
    <div className="flex justify-end">
      <div className="flex  flex-col items-end">
        {auth && athlete.profile && (
          <img className="h-12" src={finalImg} alt="profile" />
        )}
        {auth && athlete && (
          <p className="pt-4">
            You are logged in as {athlete.firstname} {athlete.lastname}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReturnProfile;
