import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import './table.css'

export default function MoviesSeriesTable() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:5000/user/")
      .then((res) => {
        setUsers(res.data.result);
        setMovies([]);
        setSeries([]);
        setView("users");
      })
      .catch((err) => console.error(err));
  };

  const fetchMovies = () => {
    axios.get("http://localhost:5000/movie")
      .then((res) => {
        setMovies(res.data.result);
        setUsers([]);
        setSeries([]);
        setView("movies");
      })
      .catch((err) => console.error(err));
  };

  const fetchSeries = () => {
    axios.get("http://localhost:5000/series")
      .then((res) => {
        setSeries(res.data.result);
        setUsers([]);
        setMovies([]);
        setView("series");
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/user/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch((err) => console.error(err));
  };

  const deleteMovie = (id) => {
    axios.put(`http://localhost:5000/movie/${id}`)
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch((err) => console.error(err));
  };

  const deleteSeries = (id) => {
    axios.put(`http://localhost:5000/series/delete/${id}`)
      .then(() => setSeries(series.filter(serie => serie.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={fetchUsers}>Get Users</Button>
        <Button variant="contained" color="primary" onClick={fetchMovies} style={{ marginLeft: "10px" }}>Get Movies</Button>
        <Button variant="contained" color="primary" onClick={fetchSeries} style={{ marginLeft: "10px" }}>Get Series</Button>
      </div>
      
      {view === "users" && (
        <>
          <h3 style={{ textAlign: "center" }}>Users</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Users Table">
              <TableHead>
                <TableRow>
                  <TableCell><h4>Name</h4></TableCell>
                  <TableCell align="right"><h4>Email</h4></TableCell>
                  <TableCell align="right"><h4>Actions</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error" onClick={() => deleteUser(user.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {view === "movies" && (
        <>
          <h3 style={{ textAlign: "center" }}>Movies</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Movies Table">
              <TableHead>
                <TableRow>
                  <TableCell><h4>Title</h4></TableCell>
                  <TableCell align="right"><h4>poster</h4></TableCell>
                  <TableCell align="right"><h4>Actions</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell align="right"> <img
          src={movie.poster}
          alt={movie.title}
          style={{ 
            width: "50px", 
            height: "75px", 
            borderRadius: "8px", 
            transition: "transform 0.3s ease-in-out", 
            cursor: "pointer" 
          }}
        /></TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error" onClick={() => deleteMovie(movie.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      
      {view === "series" && (
        <>
          <h3 style={{ textAlign: "center" }}>Series</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Series Table">
              <TableHead>
                <TableRow>
                  <TableCell><h4>Title</h4></TableCell>
                  <TableCell align="right"><h4>poster</h4></TableCell>
                  <TableCell align="right"><h4>Actions</h4></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {series.map((serie) => (
                  <TableRow key={serie.id}>
                    <TableCell>{serie.title}</TableCell>
                    <TableCell align="right"> <img
          src={serie.poster}
          alt={serie.title}
          style={{ 
            width: "50px", 
            height: "75px", 
            borderRadius: "8px", 
            transition: "transform 0.3s ease-in-out", 
            cursor: "pointer" 
          }}
        /></TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="error" onClick={() => deleteSeries(serie.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}
