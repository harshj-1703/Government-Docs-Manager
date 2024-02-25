import React, { useEffect, useState } from "react";
import dataCenterServices from "../../services/data-center.services";
import CircularLoading from "../CircularLoading";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";

function VerifyUserDocuments() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const mobile = localStorage.getItem("mobile");
    const dataCenterId = await dataCenterServices.getDataCenterFromMobile(
      mobile
    );
    const docData =
      await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsWithRandomDCorVotebased(
        dataCenterId.id,
        page
      );
    console.log(docData);
    setData();
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>{isLoading ? <CircularLoading /> : <div>VerifyUserDocuments</div>}</>
  );
}

export default VerifyUserDocuments;
