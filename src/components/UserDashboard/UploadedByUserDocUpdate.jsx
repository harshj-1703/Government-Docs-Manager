import React, { useEffect } from "react";
import { useLocation } from "react-router";

function UploadedByUserDocUpdate() {
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    
  }, []);

  return <div>Update</div>;
}

export default UploadedByUserDocUpdate;
