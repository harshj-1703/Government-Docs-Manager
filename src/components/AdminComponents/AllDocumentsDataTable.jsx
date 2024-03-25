import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";
import documentService from "../../services/document.services";

const AllDocumentsDataTable = ({
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
      } this document?`
    );
    if (confirmation) {
      try {
        setIsLoading(true);
        const newStatus = currentStatus === 0 ? 1 : 0;
        await documentService.updateDocument(docId, { status: newStatus });
        setIsDelete(!isDelete);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const columns = [
    {
      field: "banner",
      headerName: "Banner",
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      minWidth: 200,
      renderCell: (params) => {
        return (
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
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      minWidth: 350,
      renderCell: (params) => (
        <div
          className="verify-user-table-cell"
          style={{
            whiteSpace: "break-spaces",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "ministry",
      headerName: "Ministry",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      minWidth: 400,
      renderCell: (params) => (
        <div
          className="verify-user-table-cell"
          style={{
            whiteSpace: "break-spaces",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "verification",
      headerName: "Verification Type",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      minWidth: 200,
      renderCell: (params) => (
        <div
          className="verify-user-table-cell"
          style={{
            whiteSpace: "break-spaces",
          }}
        >
          {params.value.toUpperCase()} Based
        </div>
      ),
    },
    {
      field: "fields",
      headerName: "Required Docs",
      flex: 0.2,
      headerClassName: "verify-user-table-head",
      minWidth: 450,
      renderCell: (params) => (
        <div
          className="verify-user-table-cell"
          style={{
            fontSize: "12px",
            whiteSpace: "break-spaces",
          }}
        >
          {Object.keys(params.value).join(", ")}
        </div>
      ),
    },
    {
      field: "photoExample",
      headerName: "Doc Photo Example",
      flex: 0.15,
      headerClassName: "verify-user-table-head",
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div className="verify-user-table-cell verify-user-banner-cell">
            <Avatar
              className="verify-user-banner-avatar"
              src={params.value}
              alt="Example"
              sx={{
                width: "100%",
                height: "75px",
                borderRadius: "5px",
              }}
            />
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Uploaded Document At",
      minWidth: 300,
      flex: 0.24,
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

export default AllDocumentsDataTable;
