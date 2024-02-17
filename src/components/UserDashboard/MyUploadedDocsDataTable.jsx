import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CircularLoading from "../CircularLoading";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import { Link } from "react-router-dom";

const MyUploadedDocsDataTable = ({ documents }) => {
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUploadedByUserDoc = async (e) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete request?"
    );
    if (confirmation) {
      setIsLoading(true);
      const docDelete = { status: 0 };
      // try {
      //   await uploadedByUsersDocumentService.updateUploadedByUsersDocument(
      //     e.target.value,
      //     docDelete
      //   );
      // } catch (e) {
      //   console.log(e);
      // }
      setIsLoading(false);
    }
  };

  const columns = [
    {
      field: "banner",
      headerName: "Banner",
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          height={50}
          width={100}
          style={{ borderRadius: "10%" }}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "ministry",
      headerName: "Ministry",
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "id",
      headerName: "Action",
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
      renderCell: (params) => (
        <div>
          <button
            className="delete-button"
            value={params.value}
            onClick={deleteUploadedByUserDoc}
          >
            Delete
          </button>
          <Link to={"uploadedByUserDocUpdate"} state={params.value}>
            <button className="update-button">Update</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="myuploaded-docs-datatable-table">
      {isLoading && <CircularLoading />}
      {!isLoading && (
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
          style={{ border: "none" }}
        />
      )}
    </div>
  );
};

export default MyUploadedDocsDataTable;
