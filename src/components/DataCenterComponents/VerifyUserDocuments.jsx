import React, { useEffect, useState } from "react";
import dataCenterServices from "../../services/data-center.services";
import CircularLoading from "../CircularLoading";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";

function VerifyUserDocuments() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const mobile = localStorage.getItem("mobile");
    const dataCenterId = await dataCenterServices.getDataCenterFromMobile(
      mobile
    );
    const docData =
      await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsWithRandomDCorVotebased(
        dataCenterId.id
      );
    console.log(docData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>{isLoading ? <CircularLoading /> : <div>VerifyUserDocuments</div>}</>
  );
}

export default VerifyUserDocuments;
