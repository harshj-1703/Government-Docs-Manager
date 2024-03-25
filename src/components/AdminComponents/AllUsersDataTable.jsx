import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";
import userService from "../../services/user.services";

const AllUsersDataTable = ({
  data,
  totalItems,
  page,
  rowsPerPage,
  setRowPerPage,
  setPage,
  setIsLoading,
  isDelete,
  setIsDelete,
}) => {
  const changeStatusOfUser = async (userId, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${
        currentStatus === 0 ? "enable" : "disable"
      } this user?`
    );
    if (confirmation) {
      try {
        setIsLoading(true);
        const newStatus = currentStatus === 0 ? 1 : 0;
        await userService.updateUser(userId, { status: newStatus });
        setIsDelete(!isDelete);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderUserCell = (params) => (
    <div className="verify-user-table-cell verify-user-user-cell">
      <Avatar
        src={params.row.profilePhotoUrl}
        alt="User Avatar"
        className="verify-user-user-avatar"
      />
      <span className="verify-user-user-name">{params.row.fullName}</span>
    </div>
  );

  const columns = [
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 120,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      renderCell: renderUserCell,
    },
    {
      field: "profileProof",
      headerName: "Profile Proof",
      minWidth: 180,
      flex: 0.07,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <a href={params.value} target="_blank" className="old-doc-link">
          Profile Proof&nbsp;
          <i className="material-icons" style={{ fontSize: "20px" }}>
            switch_access_shortcut
          </i>
        </a>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 225,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "profession",
      headerName: "Profession",
      minWidth: 200,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 300,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell-address">
          {params.row.address}, {params.row.selectedCity},{" "}
          {params.row.selectedState}, {params.row.pincode}
        </div>
      ),
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      minWidth: 127,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 280,
      flex: 0.14,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell-timestamp">
          {params.value.slice(0, -9)}
        </div>
      ),
    },
    {
      field: "id",
      headerName: "Active",
      minWidth: 90,
      headerClassName: "verify-user-table-head",
      flex: 0.05,
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <button
          className="delete-button"
          value={params.row.id}
          style={
            params.row.status == 0
              ? {
                  backgroundColor: "green",
                }
              : {
                  backgroundColor: "red",
                }
          }
          onClick={() => changeStatusOfUser(params.row.id, params.row.status)}
        >
          {!params.row.status == 0 ? "Disable" : "Enable"}
        </button>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {data.length !== 0 ? (
        <DataGrid
          rows={data}
          columns={columns}
          paginationModel={{ pageSize: rowsPerPage, page: page }}
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 50]}
          colu
          rowCount={totalItems}
          checkboxSelection={false}
          disableRowSelectionOnClick
          rowSelection={false}
          onPaginationModelChange={(x) => {
            setPage(x.page);
            setRowPerPage(x.pageSize);
          }}
          rowHeight={90}
        />
      ) : (
        <div
          style={{
            fontFamily: "monospace",
            width: "100%",
            textAlign: "center",
            fontSize: "30px",
            color: "red",
            marginTop: "35px",
            minHeight: "50px",
          }}
        >
          No Data Available
        </div>
      )}
    </div>
  );
};

export default AllUsersDataTable;
