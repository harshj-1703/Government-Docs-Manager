import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";
import { Link } from "react-router-dom";

const UserQueriesDataTable = ({
  data,
  totalItems,
  page,
  rowsPerPage,
  setRowPerPage,
  setPage,
}) => {
  const renderUserCell = (params) => (
    <div className="verify-user-table-cell verify-user-user-cell">
      <Avatar
        src={params.row.userProfileImage}
        alt="User Avatar"
        className="verify-user-user-avatar"
      />
      <span className="verify-user-user-name">{params.row.userFullName}</span>
    </div>
  );

  const columns = [
    {
      field: "content",
      headerName: "User Query",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      minWidth: 350,
      renderCell: (params) => (
        <div
          className="verify-user-table-cell"
          style={{ overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: params.value }}
        ></div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Uploaded Query At",
      minWidth: 200,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell-timestamp">
          {params.value.slice(0, -9)}
        </div>
      ),
    },
    {
      field: "mobile",
      headerName: "User Mobile",
      minWidth: 70,
      flex: 0.05,
      headerClassName: "verify-user-table-head",
      headerAlign: "left",
      cellAlign: "center",
      renderCell: (params) => (
        <div className="verify-user-table-cell" style={{ width: "100%" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.05,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      renderCell: renderUserCell,
    },
    {
      field: "id",
      headerName: "Details",
      flex: 0.07,
      minWidth: 170,
      align: "center",
      headerAlign: "center",
      headerClassName: "verify-user-table-head",
      renderCell: (params) => {
        return (
          <Link
            to={`./user-query-details/${params.row.id}`}
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            <button
              style={{
                marginTop: "8px",
                fontFamily: "monospace",
                padding: "7px",
                border: `1px solid white`,
                backgroundColor: `darkblue`,
                color: "white",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <i className="material-icons" style={{ marginRight: "2px" }}>
                info
              </i>
              Query Details
            </button>
          </Link>
        );
      },
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

export default UserQueriesDataTable;
