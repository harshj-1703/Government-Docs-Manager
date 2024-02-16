import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const MyUploadedDocsDataTable = ({ documents }) => {
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      field: "banner",
      headerName: "Banner",
      flex: 0.3,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          height={50}
          width={120}
          style={{ borderRadius: "10%" }}
        />
      ),
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "ministry", headerName: "Ministry", flex: 1 },
    // { field: "id", headerName: "ID", flex: 1 },
  ];

  return (
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
      className="myuploaded-docs-datatable-table"
    />
  );
};

export default MyUploadedDocsDataTable;
