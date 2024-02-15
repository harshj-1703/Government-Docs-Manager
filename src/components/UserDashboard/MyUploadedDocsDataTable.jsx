import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const MyUploadedDocsDataTable = ({ documents }) => {
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      field: "banner",
      headerName: "Banner",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt=""
          height={50}
          width={150}
          style={{ borderRadius: "10%" }}
        />
      ),
    },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "ministry", headerName: "Ministry", flex: 1 },
    // { field: "id", headerName: "ID", flex: 1 },
  ];

  return (
    <div>
      <DataGrid
        rows={documents}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        checkboxSelection={false}
        rowSelection={false}
      />
    </div>
  );
};

export default MyUploadedDocsDataTable;
