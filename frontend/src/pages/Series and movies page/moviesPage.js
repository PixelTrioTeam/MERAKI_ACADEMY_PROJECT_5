import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setMovies } from "../../service/redux/reducers/movies/movieSlice";
import {
  setFav,
  removeFav,
  addFav,
} from "../../service/redux/reducers/fav/favSlice";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you're importing Bootstrap CSS

import { Modal, Button, Alert, Nav } from "react-bootstrap";
import MovieFullScreen from "../MovieFullScreen/MovieFullScreen";
import "./movies.css";
import { useNavigate } from "react-router-dom";

const MovieModal = ({ show, onHide, movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.fav);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const nav = useNavigate();
  if (!movie) return null;

  const isFavorite = favorites.some(
    (fav) => fav.movie_id === movie.id || fav.series_id === movie.series_id
  );

  const handleToggleFav = () => {
    const favData = movie.id ? { movie_id: movie.id } : { series_id: movie.id };

    if (isFavorite) {
      axios
        .delete(`http://localhost:5000/favorite/remove/${movie.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: favData,
        })
        .then(() => {
          dispatch(removeFav(movie.id || movie.series_id));
          setAlertMessage("Removed from favorites!");
          setAlertVariant("danger");
        })
        .catch((err) => console.log("Error:", err));
    } else {
      axios
        .post("http://localhost:5000/favorite/add", favData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          dispatch(addFav(res.data.favorite));
          setAlertMessage("Added to favorites!");
          setAlertVariant("success");
        })
        .catch((err) => console.log("Error:", err));
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <Modal
      style={{ marginTop: "33px" }}
      show={show}
      onHide={onHide}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="modal-title"
          style={{
            fontSize: "28px",
            fontWeight: "600",
            fontFamily: '"Poppins", sans-serif',
            color: "#333", // Dark color for title
          }}
        >
          <div style={{ color: "#dcdcdc" }}>{movie.title}</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex">
        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            // width: "40%",
            borderRadius: "10px",
            marginRight: "20px",
            height: "650px",
            width: "384 px",
          }}
        />
        <div className="modal-content-container" style={{ flex: 1 }}>
          {alertMessage && (
            <Alert
              variant={alertVariant}
              onClose={() => setAlertMessage(null)}
              dismissible
              style={{
                marginBottom: "20px",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {alertMessage}
            </Alert>
          )}

          {movie.trailer && movie.trailer.includes("youtube.com") ? (
            <iframe
              width="100%"
              height="315"
              src={getYouTubeEmbedUrl(movie.trailer)}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src={movie.trailer}
              controls
              autoPlay
              style={{ width: "100%", marginBottom: "20px" }}
            ></video>
          )}

          <h5
            className="modal-movie-description"
            style={{
              marginBottom: "10px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            <span style={{ color: "white", fontWeight: "bold" }}>Genre: </span>
            {movie.genre_name}
          </h5>
          <h5
            className="modal-movie-description"
            style={{
              marginBottom: "10px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            <span style={{ color: "white", fontWeight: "bold" }}>Rating: </span>
            {movie.rate}
          </h5>
          <h5
            className="modal-movie-description"
            style={{
              marginBottom: "10px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            <span style={{ color: "white", fontWeight: "bold" }}>Writer: </span>
            {movie.writer_name}
          </h5>
          <h5
            className="modal-movie-description"
            style={{
              marginBottom: "10px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            <span style={{ color: "white", fontWeight: "bold" }}>
              description:{" "}
            </span>
            {movie.description}
          </h5>
          <div className="footer">
            <Modal.Footer style={{ justifyContent: "space-between" }}>
              {movie.trailer && (
                <Button
                  variant="danger"
                  onClick={() => nav("/FullScreen", { state: { movie } })}
                  style={{
                    width: "200px",
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                >
                  Watch now
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleToggleFav}
                style={{
                  width: "200px",
                  padding: "10px 20px",
                  fontSize: "16px",
                }}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const SectionHeader = ({ title }) => (
  <div>
    <h2
      style={{ color: "white", textshadow: "1px 1px 2px #ff0000 " }}
      className="section-title"
    >
      {title}
    </h2>
    <hr
      style={{ background: "linear-gradient(135deg, #1a1a1a, #660000)" }}
      className="section-divider"
    />
  </div>
);

const MoviesPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movie")
      .then((res) => {
        dispatch(setMovies(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const genres = ["Action", "Comedy", "Drama", "Horror", "SciFi"];

  return (
    <div style={{ marginTop: "35px" }} className="movies-container">
      {genres.map((genre) => (
        <section key={genre} className="genre-section">
          <SectionHeader title={genre} />
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies
                .filter((movie) => movie.genre_name === genre)
                .map((movie) => (
                  <div
                    className="flip-card"
                    key={movie.id}
                    onClick={() => {
                      setSelectedMovie(movie);
                      setModalShow(true);
                    }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="movie-image"
                        />
                      </div>
                      <div className="flip-card-back">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-description">{movie.description}</p>
                        <p className="movie-rating">⭐ {movie.rate}/10</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="loading-text">Fetching movies...</p>
            )}
          </div>
        </section>
      ))}
      <MovieModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        movie={selectedMovie}
      />
    </div>
  );
};

export default MoviesPage;
