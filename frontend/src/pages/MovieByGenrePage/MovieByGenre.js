import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMoviesByGenreId } from "../../service/redux/reducers/movies/movieSlice";
import { setSeriesByGenreId } from "../../service/redux/reducers/series/seriesSlice";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import {
  setFav,
  removeFav,
  addFav,
} from "../../service/redux/reducers/fav/favSlice";

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
    <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title
        className="modal-title"
        style={{
          fontSize: '28px',
          fontWeight: '600',
          fontFamily: '"Poppins", sans-serif',
          color: '#333', // Dark color for title
        }}
      >
        <div style={{color : 'red'}}>{movie.title}</div>
      </Modal.Title>
    </Modal.Header>
  
    <Modal.Body className="d-flex">
      <img
        src={movie.poster}
        alt={movie.title}
        style={{
          width: "40%",
          borderRadius: "10px",
          marginRight: "20px",
        }}
      />
      <div className="modal-content-container" style={{ flex: 1 }}>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage(null)}
            dismissible
            style={{ marginBottom: '20px', fontFamily: '"Poppins", sans-serif' }}
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
  
        
        <h5 className="modal-movie-description" style={{ marginBottom: '10px', fontFamily: '"Poppins", sans-serif' }}>
          <span style={{ color: 'red' }}>Genre: </span>{movie.genre_name}
        </h5>
        <h5 className="modal-movie-description" style={{ marginBottom: '10px', fontFamily: '"Poppins", sans-serif' }}>
          <span style={{ color: 'red' }}>Rating: </span>{movie.rate}
        </h5>
        <h5 className="modal-movie-description" style={{ marginBottom: '10px', fontFamily: '"Poppins", sans-serif' }}>
          <span style={{ color: 'red' }}>Writer: </span>{movie.writer_name}
        </h5>
        <h5 className="modal-movie-description" style={{ marginBottom: '10px', fontFamily: '"Poppins", sans-serif' }}>
          <span style={{ color: 'red' }}>description: </span>{movie.description}
        </h5>
        
  
        <Modal.Footer style={{ justifyContent: 'space-between' }}>
          {movie.trailer && (
            <Button
              variant="danger"
              onClick={() => nav("/FullScreen", { state: { movie } })}
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              Watch now
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleToggleFav}
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Modal.Footer>
      </div>
    </Modal.Body>
  </Modal>
  );
};

const SectionHeader = ({ title }) => (
  <div>
    <h2 style={{color : 'red'}} className="section-title">{title}</h2>
    <hr style={{ background : 'linear-gradient(135deg, #1a1a1a, #660000)'}} className="section-divider" />
  </div>
);

function MovieByGenre() {
  const { genreType, genreId } = useParams();
  console.log("genretype", genreType);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.series.series);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (!genreId) return;

    axios
      .get(`http://localhost:5000/movie/genre/${genreId}`)
      .then((res) => {
        dispatch(setMoviesByGenreId(res.data.result));
      })
      .catch((err) => console.error("Error fetching movies:", err));

    axios
      .get(`http://localhost:5000/series/genre/${genreId}`)
      .then((res) => {
        dispatch(setSeriesByGenreId(res.data.result));
      })
      .catch((err) => console.error("Error fetching series:", err));
  }, [dispatch, genreId]);

  return (
    <div>
      <div className="movies-container">
      <SectionHeader title="Movies" />
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
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
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-description">{movie.description}</p>
                    <p className="movie-actors">{movie.actor_names}</p>
                    <p className="movie-director">{movie.director_name}</p>
                    <p className="movie-rating">⭐ {movie.rate}/10</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
        <MovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          movie={selectedMovie}
        />
      </div>

      <div className="series-container">
      <SectionHeader title="Series" />
        <div className="movies-grid">
          {series.length > 0 ? (
            series.map((serie) => (
              <div
                className="flip-card"
                key={serie.id}
                onClick={() => {
                  setSelectedMovie(serie);
                  setModalShow(true);
                }}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={serie.poster}
                      alt={serie.title}
                      className="movie-image"
                    />
                  </div>

                  <div className="flip-card-back">
                    <h2 className="movie-title">{serie.title}</h2>
                    <p className="movie-description">{serie.description}</p>
                    <p className="movie-actors">{serie.actor_names}</p>
                    <p className="movie-director">{serie.director_name}</p>
                    <p className="movie-rating">⭐ {serie.rate}/10</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading series...</p>
          )}
        </div>
      </div>
      <MovieModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        movie={selectedMovie}
      />
    </div>
  );
}

export default MovieByGenre;
