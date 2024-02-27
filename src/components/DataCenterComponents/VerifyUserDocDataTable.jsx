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
  setPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(event, newPage);
  };

  return (
    <TableContainer className="verify-user-table-container">
      <Table className="verify-user-table">
        <TableHead className="verify-user-table-head">
          <TableRow>
            <TableCell className="verify-user-table-cell verify-user-banner-cell">
              Banner
            </TableCell>
            <TableCell className="verify-user-table-cell">Title</TableCell>
            <TableCell className="verify-user-table-cell">
              Uploaded Document At
            </TableCell>
            <TableCell className="verify-user-table-cell">Mobile</TableCell>
            <TableCell className="verify-user-table-cell verify-user-user-cell">
              User
            </TableCell>
            <TableCell className="verify-user-table-cell verify-user-check-cell">
              Check Document
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="verify-user-table-row">
              <TableCell className="verify-user-table-cell verify-user-banner-cell">
                <Avatar
                  className="verify-user-banner-avatar"
                  src={item.banner}
                  alt="Banner"
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
              <TableCell className="verify-user-table-cell verify-user-user-cell">
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
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

export default VerifyUserDocDataTable;
