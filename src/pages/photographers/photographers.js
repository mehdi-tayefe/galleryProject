import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./photographers.css";
import Header from "../../components/header/header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Loading from "../../components/loading/loading";
import Avatar from "@mui/material/Avatar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#213191",
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 600,
    padding: "20px",
  },
}));

const PhotoGraphers = () => {
  const [users, setUsers] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    } catch (e) {
    } finally {
      setTimeout(() => {
        setLoadingPage(false);
      }, 1200);
    }
  }, []);

  const handleActions = (id) => {
    navigate(`/creator-profile/${id}`);
  };

  return (
    <>
      {loadingPage ? (
        <Loading size={100} gradientStart="#FF5733" gradientEnd="#33FFCE" />
      ) : (
        <>
          <Header />

          <div className="list-body">
            <div className="list_container">
              <TableContainer
                sx={{ border: "5px solid #5c6bc0", borderRadius: "8px" }}
                component={Paper}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Score</StyledTableCell>
                      <StyledTableCell align="right">
                        View Profile
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            sx={{ display: "flex", alignItems: "center" }}
                            component="th"
                            scope="row"
                          >
                            <Avatar
                              key={user.username}
                              sx={{
                                width: 50,
                                height: 50,
                                marginRight: "10px",
                              }}
                              alt={user.username}
                              src={user.photo}
                            />
                            {user.username}
                          </TableCell>
                          <TableCell>
                            {" "}
                            <div>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    cursor: "default",
                                    color:
                                      star <= user.rating ? "gold" : "gray",
                                    fontSize: "24px",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <button
                              onClick={() => handleActions(user.username)}
                              className="backgroundBtn"
                            >
                              View
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PhotoGraphers;
