import React, { useEffect, useState } from "react";
import CircularLoading from "../CircularLoading";
import dataCenterServices from "../../services/data-center.services";
import AllDataCentersDataTable from "./AllDataCentersDataTable";

function AllDataCentersByAdmin() {
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
      const { documents, totalItems } =
        await dataCenterServices.getAllDataCenters(
          page + 1,
          rowsPerPage,
          search
        );

      const formattedData = documents.map((data) => ({
        id: data.id,
        imageurl: data.data.imageurl,
        p1Photo: data.data.p1Photo,
        p2Photo: data.data.p2Photo,
        p1: data.data.p1,
        p2: data.data.p2,
        mobile: data.data.mobile,
        city: data.data.city,
        state: data.data.state,
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
          <h1 style={{ textAlign: "center" }}>All DataCenters</h1>
          <div className="hr-div"></div>
          <div className="search-with-button-dc-verify-users">
            <input
              placeholder="Search With Mobile"
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
          <AllDataCentersDataTable
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

export default AllDataCentersByAdmin;
