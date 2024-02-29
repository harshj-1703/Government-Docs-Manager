import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Button } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";

const VerifyUserDocDataTable = ({
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
      field: "banner",
      headerName: "Banner",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell verify-user-banner-cell">
          <Avatar
            className="verify-user-banner-avatar"
            src={params.value}
            alt="Banner"
            sx={{
              width: "100%",
              height: "75px",
              borderRadius: "5px",
            }}
          />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Uploaded Document At",
      flex: 0.25,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell-timestamp">
          {params.value.slice(0, -9)}
        </div>
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 0.09,
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
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      renderCell: renderUserCell,
    },
    {
      field: "check",
      headerName: "Check Document",
      headerClassName: "verify-user-table-head",
      flex: 0.2,
      renderCell: (params) => (
        <div className="verify-user-table-cell verify-user-check-cell">
          <Button variant="outlined">Check Document</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        paginationModel={{ pageSize: rowsPerPage, page: page }}
        paginationMode="server"
        pageSizeOptions={[2, 5, 10, 25]}
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
    </div>
  );
};

export default VerifyUserDocDataTable;
