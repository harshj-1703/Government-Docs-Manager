import React, { useEffect, useState } from "react";
import "../../css/userdocumentstatus.css";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import CircularLoading from "../CircularLoading";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import remarksDocumentsServices from "../../services/remarks.services";

function MyDocumentRemarks({ isMenuShow }) {
  const [documents, setDocuments] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [doc, setDoc] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    const data = await remarksDocumentsServices.getremarksFromDocumentId(id);
    const doc1 = await uploadedByUsersDocumentService.getDocumentFromId(id);
    let filteredData = data.map((x) => {
      let data = x.data;
      return {
        id: x.id,
        remarks: data.remarks,
        status: data.status,
        updatedAt: data.updatedAt,
      };
    });
    setDoc(doc1);
    setDocuments(() => [...filteredData]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const columns = [
    {
      field: "remarks",
      headerName: "Remark",
      flex: 0.35,
      minWidth: 400,
      align: "left",
      headerAlign: "left",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "status",
      headerName: "Action Done",
      flex: 0.1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
      renderCell: (params) => {
        let statusColor;
        switch (params.value) {
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
      field: "updatedAt",
      headerName: "Uploaded Time",
      flex: 0.12,
      minWidth: 300,
      align: "left",
      headerAlign: "left",
      headerClassName: "custom-header-datatable",
      renderCell: (params) => {
        return <p>{params.value.slice(0, -9)}</p>;
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
            doc &&
            (documents.length !== 0 ? (
              <>
                <h1 style={{ marginBottom: "5px", fontWeight: "100" }}>
                  Uploaded Documents Remarks
                </h1>
                <hr />
                <div className="main-document-remarks-data">
                  <img
                    src={doc.banner}
                    alt=""
                    height={100}
                    width={200}
                    style={{
                      borderRadius: "20px",
                    }}
                  />
                  <div>
                    <h1 style={{ fontFamily: "monospace" }}>{doc.title}</h1>
                    <h2 style={{ fontFamily: "monospace" }}>{doc.ministry}</h2>
                  </div>
                </div>
                <hr />
                <DataGrid
                  rows={documents}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: pageSize, page: 0 },
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

export default MyDocumentRemarks;
