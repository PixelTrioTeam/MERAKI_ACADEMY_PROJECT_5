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
import { Container, Typography, Box } from "@mui/material";
import './table.css';
// import './styles.css';

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
    <Container className="app-container">
      <Box textAlign="center" my={3}>
        <Button style={{ backgroundColor: '#660000', margin: '10px' }} className="custom-button" onClick={fetchUsers}>Get Users</Button>
        <Button style={{ backgroundColor: '#660000', margin: '10px' }} className="custom-button" onClick={fetchMovies}>Get Movies</Button>
        <Button style={{ backgroundColor: '#660000', margin: '10px' }} className="custom-button" onClick={fetchSeries}>Get Series</Button>
      </Box>
      
      {view && (
        <Typography variant="h4" textAlign="center" gutterBottom>
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </Typography>
      )}
      
      {(view === "users" || view === "movies" || view === "series") && (
        <TableContainer  component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label={`${view} Table`}>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Title</Typography></TableCell>
                {view !== "users" && <TableCell align="right"><Typography variant="h6">Poster</Typography></TableCell>}
                <TableCell align="right"><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {view === "users" && users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    <Button style={{backgroundColor : '#660000'}} className="custom-button" onClick={() => deleteUser(user.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(view === "movies" ? movies : series).map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="right">
                    <img src={item.poster} alt={item.title} className="poster-image" />
                  </TableCell>
                  <TableCell align="right">
                    <Button style={{backgroundColor : '#660000'}} className="custom-button" onClick={() => (view === "movies" ? deleteMovie(item.id) : deleteSeries(item.id))}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}