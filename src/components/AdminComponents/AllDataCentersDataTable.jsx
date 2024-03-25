import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";
import dataCenterServices from "../../services/data-center.services";

const AllDataCentersDataTable = ({
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
  const changeStatusOfDocument = async (docId, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${
        currentStatus === 0 ? "enable" : "disable"
      } this datacenter?`
    );
    if (confirmation) {
      try {
        setIsLoading(true);
        const newStatus = currentStatus === 0 ? 1 : 0;
        await dataCenterServices.updateDataCenter(docId, { status: newStatus });
        setIsDelete(!isDelete);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderPerson1Cell = (params) => (
    <div className="verify-user-table-cell verify-user-user-cell">
      <Avatar
        src={params.row.p1Photo}
        alt="User Avatar"
        className="verify-user-user-avatar"
      />
      <span className="verify-user-user-name">{params.row.p1}</span>
    </div>
  );

  const renderPerson2Cell = (params) => (
    <div className="verify-user-table-cell verify-user-user-cell">
      <Avatar
        src={params.row.p2Photo}
        alt="User Avatar"
        className="verify-user-user-avatar"
      />
      <span className="verify-user-user-name">{params.row.p2}</span>
    </div>
  );

  const columns = [
    {
      field: "imageurl",
      headerName: "Profile",
      flex: 0.05,
      headerClassName: "verify-user-table-head",
      minWidth: 95,
      renderCell: (params) => {
        return (
          <div className="verify-user-table-cell verify-user-banner-cell">
            <Avatar
              className="verify-user-banner-avatar"
              src={params.value}
              alt="Profile"
              sx={{
                borderRadius: "50%",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "Person 1",
      headerName: "Person 1",
      minWidth: 200,
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      renderCell: renderPerson1Cell,
    },
    {
      field: "Person 2",
      headerName: "Person 2",
      minWidth: 200,
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      headerAlign: "center",
      renderCell: renderPerson2Cell,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 140,
      flex: 0.05,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell">{params.value}</div>
      ),
    },
    {
      field: "City & State",
      headerName: "City & State",
      minWidth: 250,
      flex: 0.1,
      headerClassName: "verify-user-table-head",
      renderCell: (params) => (
        <div className="verify-user-table-cell">
          {params.row.city}, {params.row.state}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Uploaded Document At",
      minWidth: 300,
      flex: 0.2,
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
          onClick={() =>
            changeStatusOfDocument(params.row.id, params.row.status)
          }
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

export default AllDataCentersDataTable;
