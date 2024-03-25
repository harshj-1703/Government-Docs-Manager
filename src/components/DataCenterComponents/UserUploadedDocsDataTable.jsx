import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import "../../css/verify-user-doc-datatable.css";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";

const UserUploadedDocsDataTable = ({
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
  const deleteUploadedByUserDoc = async (e) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete request?"
    );
    if (confirmation) {
      setIsLoading(true);
      const docDelete = { status: 0 };
      try {
        await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
          e.target.value,
          docDelete
        );
        setIsDelete(!isDelete);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  };

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
        <div className="verify-user-table-cell">{params.value}</div>
      ),
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
      field: "approveStatus",
      headerName: "Status",
      flex: 0.15,
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      headerClassName: "verify-user-table-head",
      renderCell: (params) => {
        let statusColor;
        switch (params.value) {
          case "Pending":
            statusColor = "orange";
            break;
          case "Approved":
            statusColor = "green";
            break;
          case "Rejected":
            statusColor = "red";
            break;
          default:
            statusColor = "black";
        }

        const cellStyle = {
          border: `2px solid ${statusColor}`,
          padding: "5px",
          backgroundColor: `${statusColor}`,
          borderRadius: "5px",
        };

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={cellStyle}>{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "verifyRatio",
      headerName: "Verify(%)",
      flex: 0.1,
      minWidth: 180,
      align: "center",
      headerAlign: "center",
      headerClassName: "verify-user-table-head",
      renderCell: (params) => {
        const ratio = parseFloat(params.value).toFixed(2);
        let bgColor, borderColor;

        if (ratio < 25) {
          bgColor = "lightcoral";
          borderColor = "red";
        } else if (ratio >= 25 && ratio < 50) {
          bgColor = "lightsalmon";
          borderColor = "orange";
        } else if (ratio >= 50 && ratio < 90) {
          bgColor = "lightblue";
          borderColor = "blue";
        } else {
          bgColor = "lightgreen";
          borderColor = "green";
        }

        const cellStyle = {
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          padding: "5px",
          borderRadius: "5px",
          color: "darkblue",
        };

        return <div style={cellStyle}>{ratio} %</div>;
      },
    },
    {
      field: "id",
      headerName: "Delete",
      minWidth: 90,
      headerClassName: "verify-user-table-head",
      flex: 0.05,
      headerAlign: "center",
      cellAlign: "center",
      renderCell: (params) => (
        <button
          className="delete-button"
          value={params.value}
          style={
            !params.row.numbersDataCenterChecked <= 0
              ? {
                  backgroundColor: "gray",
                  cursor: "no-drop",
                }
              : {
                  backgroundColor: "red",
                }
          }
          onClick={deleteUploadedByUserDoc}
          disabled={!params.row.numbersDataCenterChecked <= 0}
        >
          Delete
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

export default UserUploadedDocsDataTable;
