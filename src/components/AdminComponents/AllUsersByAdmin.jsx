import React, { useEffect, useState } from "react";
import CircularLoading from "../CircularLoading";
import userService from "../../services/user.services";
import AllUsersDataTable from "./AllUsersDataTable";

function AllUsersByAdmin() {
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
      const { documents, totalItems } = await userService.getAllUsers(
        page + 1,
        rowsPerPage,
        search
      );

      const formattedData = documents.map((data) => ({
        id: data.id,
        profilePhotoUrl: data.data.profilePhotoUrl,
        profileProof: data.data.profileProof,
        email: data.data.email,
        dob: data.data.dob,
        fullName: data.data.fullName,
        mobile: data.data.mobile,
        profession: data.data.profession,
        address: data.data.address,
        selectedCity: data.data.selectedCity,
        selectedState: data.data.selectedState,
        pincode: data.data.pincode,
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
          <h1 style={{ textAlign: "center" }}>All Users</h1>
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
          <AllUsersDataTable
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

export default AllUsersByAdmin;
