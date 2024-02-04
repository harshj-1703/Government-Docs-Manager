import React, { useState } from "react";
import { useParams } from "react-router-dom";

function DocumentPage() {
  const { id } = useParams();

  return (
    <>
      <div>{id.toString()}</div>
    </>
  );
}

export default DocumentPage;
