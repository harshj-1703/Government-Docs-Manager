import React, { useEffect, useState } from "react";
import "../../css/userdocumentstatus.css";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import { DataGrid } from "@mui/x-data-grid";

function UserDocumentStatus({ isMenuShow }) {
  const [documents, setDocuments] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const mobile = localStorage.getItem("mobile");
    const data =
      await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsFromUserMobile(
        mobile
      );
    let filteredData = data.map((x) => {
      let data = x.data;
      return {
        id: x.id,
        banner: data.banner,
        title: data.title,
        ministry: data.ministry,
        updatedAt: data.updatedAt,
        approveStatus: data.approveStatus,
        verifyRatio: data.verifyRatio,
      };
    });
    setDocuments(() => [...filteredData]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const renderCell = (params) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <div className="image-wrapper-updatetable">
        {!imageLoaded && <div className="image-placeholder-updatetable" />}
        <img
          src={params.value}
          alt=""
          height={50}
          width={100}
          onLoad={() => setImageLoaded(true)}
          className="image-banner-updatetable"
        />
      </div>
    );
  };

  const columns = [
    {
      field: "banner",
      headerName: "Banner",
      flex: 0.2,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
      renderCell: renderCell,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.3,
      minWidth: 300,
      align: "left",
      headerAlign: "left",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "ministry",
      headerName: "Ministry",
      flex: 0.4,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "updatedAt",
      headerName: "Uploaded Time",
      flex: 0.4,
      minWidth: 300,
      align: "left",
      headerAlign: "left",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "approveStatus",
      headerName: "Approve",
      flex: 0.25,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
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

        return <div style={cellStyle}>{params.value}</div>;
      },
    },
    {
      field: "verifyRatio",
      headerName: "Verify(%)",
      flex: 0.2,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
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
  ];

  const getRowHeight = () => {
    return 100;
  };

  return (
    <div className="user-document-status-main">
      <div
        className={
          isMenuShow ? "user-document-status-blur" : "user-document-status"
        }
      >
        <div
          className="myuploaded-docs-datatable-table"
          style={{ margin: "25px 0" }}
        >
          {isLoading && <CircularLoading />}
          {!isLoading &&
            (documents.length !== 0 ? (
              <>
                <h1 style={{ marginBottom: "5px" }}>My Documents Status</h1>
                <hr />
                <DataGrid
                  rows={documents}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: pageSize, page: 0 },
                    },
                    columns: {
                      columnVisibilityModel: {
                        ministry: false,
                        updatedAt: false,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  checkboxSelection={false}
                  rowSelection={false}
                  getRowHeight={getRowHeight}
                  style={{ border: "none" }}
                />
              </>
            ) : (
              <h1>No Uploaded Documents</h1>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserDocumentStatus;
