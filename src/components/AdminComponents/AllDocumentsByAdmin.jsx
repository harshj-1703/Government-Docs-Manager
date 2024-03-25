import React, { useEffect, useState } from "react";
import CircularLoading from "../CircularLoading";
import documentService from "../../services/document.services";
import AllDocumentsDataTable from "./AllDocumentsDataTable";

function AllDocumentsByAdmin() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [rowsPerPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { documents, totalItems } = await documentService.getAllDocuments(
        page + 1,
        rowsPerPage,
        search
      );

      const formattedData = documents.map((data) => ({
        id: data.id,
        banner: data.data.banner,
        description: data.data.description,
        fields: data.data.fields,
        ministry: data.data.ministry,
        photoExample: data.data.photoExample,
        title: data.data.title,
        verification: data.data.verification,
        createdAt: data.data.createdAt,
        status: data.data.status,
      }));

      setData(formattedData);
      setTotalItems(totalItems);
      setIsLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage, search, isDelete]);

  return (
    <>
      <div style={{ padding: "20px 40px 40px 40px" }}>
        <div className="head-div-dc-verify-users">
          <h1 style={{ textAlign: "center" }}>All Documents</h1>
          <div className="hr-div"></div>
          <div className="search-with-button-dc-verify-users">
            <input
              placeholder="Search With Title"
              className="data-center-search-input"
              id="data-center-search-input"
              type="text"
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
          <AllDocumentsDataTable
            data={data}
            totalItems={totalItems}
            page={page}
            rowsPerPage={rowsPerPage}
            setRowPerPage={setRowPerPage}
            setPage={setPage}
            setIsLoading={setIsLoading}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        )}
      </div>
    </>
  );
}

export default AllDocumentsByAdmin;
