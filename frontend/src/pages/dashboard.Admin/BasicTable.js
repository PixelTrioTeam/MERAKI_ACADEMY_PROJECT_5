    import React, { useEffect } from "react";
    import Table from "@mui/material/Table";
    import TableBody from "@mui/material/TableBody";
    import TableCell from "@mui/material/TableCell";
    import TableContainer from "@mui/material/TableContainer";
    import TableHead from "@mui/material/TableHead";
    import TableRow from "@mui/material/TableRow";
    import Paper from "@mui/material/Paper";
    import Stack from "@mui/material/Stack";
    import DeleteIcon from "@mui/icons-material/Delete";
    import Button from "@mui/material/Button";
    import { useDispatch, useSelector } from "react-redux";
    import {
    setUsers,
    deleteUser,
    } from "../../service/redux/reducers/users/usersSlice";
    import axios from "axios";
    import "./table.css";

    export default function BasicTable() {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
        .get("http://localhost:5000/user/")
        .then((res) => {
            console.log(res.data.result);
            dispatch(setUsers(res.data.result));
        })
        .catch((err) => console.error(err));
    }, [dispatch]);

    const handleDeleteUser = (userId) => {
        axios
        .delete(`http://localhost:5000/user/${userId}`)
        .then((res) => {
            dispatch(deleteUser(userId));
            console.log(res.data.message);
        })
        .catch((err) => console.error(err));
    };

    return (
        <TableContainer className="tableContainer" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="User Table">
            <TableHead>
            <TableRow >
                <TableCell><h4>First Name</h4></TableCell>
                <TableCell align="right"><h4>Last Name</h4></TableCell>
                <TableCell align="right"><h4>Email</h4></TableCell>
                <TableCell align="right"><h4>Country</h4></TableCell>
                <TableCell align="right"><h4>Action</h4></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
                <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    <h6>{user.firstname}</h6>
                </TableCell>
                <TableCell align="right"><h6>{user.lastname}</h6></TableCell>
                <TableCell align="right"><h6>{user.email}</h6></TableCell>
                <TableCell align="right"><h6>{user.country}</h6></TableCell>
                <TableCell align="right">
                    <Button
                    onClick={() => handleDeleteUser(user.id)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    >
                    Delete
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
    }
