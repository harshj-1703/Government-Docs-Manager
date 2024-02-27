import React, { useEffect, useState } from "react";
import dataCenterServices from "../../services/data-center.services";
import CircularLoading from "../CircularLoading";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import VerifyUserDocDataTable from "./VerifyUserDocDataTable";

function VerifyUserDocuments() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const rowsPerPage = 2;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const mobile = localStorage.getItem("mobile");
      const dataCenterId = await dataCenterServices.getDataCenterFromMobile(
        mobile
      );
      const { documents, totalItems } =
        await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsWithRandomDCorVotebased(
          dataCenterId.id,
          page + 1,
          rowsPerPage
        );

      const formattedData = documents.map((data) => ({
        id: data.id,
        banner: data.data.banner,
        title: data.data.title,
        ministry: data.data.ministry,
        userFullName: data.data.userFullName,
        mobile: data.data.userMobile,
        userProfileImage: data.data.userProfileImage,
        verifyRatio: data.data.verifyRatio,
        createdAt: data.data.createdAt,
      }));

      setData(formattedData);
      setTotalItems(totalItems);
      setIsLoading(false);
    };

    fetchData();
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <CircularLoading />
      ) : (
        <div style={{ padding: "50px" }}>
          <VerifyUserDocDataTable
            data={data}
            totalItems={totalItems}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
          />
        </div>
      )}
    </>
  );
}

export default VerifyUserDocuments;
