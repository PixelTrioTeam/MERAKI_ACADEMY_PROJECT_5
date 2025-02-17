import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSeries } from "../../service/redux/reducers/series/seriesSlice";
import {
  setFav,
  addFav,
  removeFav,
} from "../../service/redux/reducers/fav/favSlice";
import "./series.css";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Alert } from "react-bootstrap";

const MovieModal = ({ show, onHide, movie, series }) => {
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
    const favData = movie.id
      ? { movie_id: movie.id }
      : { series_id: series.id };

    if (isFavorite) {
      axios
        .delete(
          `http://localhost:5000/favorite/remove/${movie.id || series.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: favData,
          }
        )
        .then(() => {
          dispatch(removeFav(movie.id || series.id));
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

const SeriesPage = () => {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series.series);
  const favorites = useSelector((state) => state.fav);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/series")
      .then((res) => {
        dispatch(setSeries(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch, favorites]);

  const genres = ["Action", "Comedy", "Drama", "Horror", "SciFi"];

  return (
    <div style={{ marginTop: "35px" }} className="series-container">
      {genres.map((genre) => (
        <section key={genre} className="genre-section">
          <SectionHeader title={genre} />

          <div className="series-grid">
            {series.length > 0 ? (
              series
                .filter((show) => show.genre_name === genre)
                .map((show) => (
                  <div
                    className="flip-card"
                    key={show.id}
                    onClick={() => {
                      setSelectedMovie(show);
                      setModalShow(true);
                    }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={show.poster}
                          alt={show.title}
                          className="series-image"
                        />
                      </div>
                      <div className="flip-card-back">
                        <h2 className="series-title">{show.title}</h2>
                        <p className="series-description">{show.description}</p>
                        <p className="series-rating">⭐ {show.rate}/10</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>Loading...</p>
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

export default SeriesPage;
