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
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState("");

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
          rowsPerPage,
          search
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
  }, [page, rowsPerPage, search]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div style={{ padding: "20px 40px 40px 40px" }}>
        <div className="head-div-dc-verify-users">
          <h1 style={{ textAlign: "center" }}>Verify User Documents</h1>
          <div className="hr-div"></div>
          <div className="search-with-button-dc-verify-users">
            <input
              placeholder="Search With Mobile Number"
              className="data-center-search-input"
              id="data-center-search-input"
              type="number"
            />
            <button
              className="search-button"
              onClick={() => {
                const search = document.getElementById(
                  "data-center-search-input"
                ).value;
                setSearch(search);
              }}
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <CircularLoading />
        ) : (
          <VerifyUserDocDataTable
            data={data}
            totalItems={totalItems}
            page={page}
            rowsPerPage={rowsPerPage}
            setRowPerPage={setRowPerPage}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}

export default VerifyUserDocuments;
