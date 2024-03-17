import React, { useEffect, useState } from "react";
import CircularLoading from "../CircularLoading";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import UserRejectedDocsDataTable from "./UserRejectedDocsDataTable";

function UsersRejectedDocuments() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { documents, totalItems } =
        await uploadedByUsersDocumentService.getAllRejectedUserDocumentsWithPagination(
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
        docId: data.data.docId,
        mobile: data.data.userMobile,
        userProfileImage: data.data.userProfileImage,
        approveStatus: data.data.approveStatus,
        verifyRatio: data.data.verifyRatio,
        createdAt: data.data.createdAt,
      }));

      setData(formattedData);
      setTotalItems(totalItems);
      setIsLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage, search]);

  return (
    <>
      <div style={{ padding: "20px 40px 40px 40px" }}>
        <div className="head-div-dc-verify-users">
          <h1 style={{ textAlign: "center" }}>User Rejected Documents</h1>
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
          <UserRejectedDocsDataTable
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

export default UsersRejectedDocuments;
