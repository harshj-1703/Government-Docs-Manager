import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const MyUploadedDocsDataTable = ({ documents }) => {
  const [pageSize, setPageSize] = useState(5);

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
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
    },
    {
      field: "ministry",
      headerName: "Ministry",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header-datatable",
    },
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
