import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setMovies } from "../../service/redux/reducers/movies/movieSlice";
import {
  setFav,
  removeFav,
  addFav,
} from "../../service/redux/reducers/fav/favSlice";
import { Modal, Button, Alert, Nav } from "react-bootstrap";
import MovieFullScreen from '../MovieFullScreen/MovieFullScreen'
import "./movies.css";
import { useNavigate } from "react-router-dom";

const MovieModal = ({ show, onHide, movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.fav);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("");
  const nav = useNavigate()
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
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex">
        <img
          src={movie.poster}
          alt={movie.title}
          style={{ width: "40%", borderRadius: "10px" }}
        />
        <div className="modal-content-container">
          {alertMessage && (
            <Alert
              variant={alertVariant}
              onClose={() => setAlertMessage(null)}
              dismissible
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
              style={{ width: "100%" }}
            ></video>
          )}
          <h4 className="modal-movie-title">{movie.title}</h4>
          <h4 className="modal-movie-description">{movie.genre_name}</h4>
          <h4 className="modal-movie-description">{movie.rate}</h4>
          <h4 className="modal-movie-description">{movie.writer_name}</h4>
          <p className="modal-movie-description">{movie.description}</p>
          <Modal.Footer>
            {movie.trailer && (
              <Button

                variant="danger"
                as="a"
                // href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"

                onClick={()=>{
                  nav('/FullScreen')
                  
                }}
              >
                Watch now
              </Button>
            )}
            <Button variant="primary" onClick={handleToggleFav}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Modal.Footer>
        </div>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

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
    <div className="movies-container">
      {genres.map((genre) => (
        <section key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
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
