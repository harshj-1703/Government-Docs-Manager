import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Avatar,
  Button,
} from "@mui/material";
import "../../css/verify-user-doc-datatable.css";

const VerifyUserDocDataTable = ({
  data,
  totalItems,
  page,
  onPageChange,
  rowsPerPage,
  setRowPerPage,
  setPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(event, newPage);
  };

  const headerStyle = {
    color: "white",
    fontSize: "20px",
    fontFamily: "monospace",
  };

  return (
    <TableContainer className="verify-user-table-container">
      <Table className="verify-user-table">
        <TableHead className="verify-user-table-head">
          <TableRow>
            <TableCell
              className="verify-user-table-cell verify-user-banner-cell"
              sx={headerStyle}
            >
              Banner
            </TableCell>
            <TableCell className="verify-user-table-cell" sx={headerStyle}>
              Title
            </TableCell>
            <TableCell className="verify-user-table-cell" sx={headerStyle}>
              Uploaded Document At
            </TableCell>
            <TableCell className="verify-user-table-cell" sx={headerStyle}>
              Mobile
            </TableCell>
            <TableCell
              className="verify-user-table-cell verify-user-user-cell"
              sx={{ textAlign: "center", ...headerStyle }}
            >
              User
            </TableCell>
            <TableCell
              className="verify-user-table-cell verify-user-check-cell"
              sx={headerStyle}
            >
              Check Document
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                className="no-data-dc-verify-user-header"
                sx={{
                  fontSize: "20px",
                  color: "darkblue",
                }}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="verify-user-table-row">
                <TableCell className="verify-user-table-cell verify-user-banner-cell">
                  <Avatar
                    className="verify-user-banner-avatar"
                    src={item.banner}
                    alt="Banner"
                    sx={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "5px",
                    }}
                  />
                </TableCell>
                <TableCell className="verify-user-table-cell">
                  {item.title}
                </TableCell>
                <TableCell className="verify-user-table-cell">
                  {item.createdAt}
                </TableCell>
                <TableCell className="verify-user-table-cell">
                  {item.mobile}
                </TableCell>
                <TableCell
                  className="verify-user-table-cell verify-user-user-cell"
                  sx={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <Avatar
                    className="verify-user-user-avatar"
                    src={item.userProfileImage}
                    alt="User Avatar"
                  />
                  <span className="verify-user-user-name">
                    {item.userFullName}
                  </span>
                </TableCell>
                <TableCell className="verify-user-table-cell verify-user-check-cell">
                  <Button variant="outlined">Check Document</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        className="verify-user-table-bottom"
        rowsPerPageOptions={[2, 5, 10, 25]}
        onRowsPerPageChange={(e) => setRowPerPage(e.target.value)}
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default VerifyUserDocDataTable;
