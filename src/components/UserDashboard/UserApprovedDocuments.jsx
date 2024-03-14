import React, { useEffect, useState } from "react";
import "../../css/userdocumentstatus.css";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function UserApprovedDocuments({ isMenuShow }) {
  const [documents, setDocuments] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const mobile = localStorage.getItem("mobile");
    const data =
      await uploadedByUsersDocumentService.getAllUploadeByUserDocumentsFromUserMobile(
        mobile
      );
    let filteredData = data
      .filter((x) => {
        return x.data.approveStatus === "Approved";
      })
      .map((x) => {
        let data = x.data;
        return {
          id: x.id,
          banner: data.banner,
          title: data.title,
          ministry: data.ministry,
          updatedAt: data.updatedAt,
          approveStatus: data.approveStatus,
          docId: data.docId,
          userMobile: data.userMobile,
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
      flex: 0.17,
      minWidth: 170,
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
      headerName: "Approved Certificate",
      flex: 0.25,
      minWidth: 190,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {params.value === "Approved" && (
              <Link
                to={`/generatepdf-approved-document/${params.row.userMobile}/${params.row.docId}`}
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
                  <i className="material-icons">get_app</i>
                  Approve Certificate
                </button>
              </Link>
            )}
          </div>
        );
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
                <h1 style={{ marginBottom: "5px", fontWeight: "100" }}>
                  My Approved Documents
                </h1>
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
              <h1>No Approved Documents</h1>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserApprovedDocuments;
