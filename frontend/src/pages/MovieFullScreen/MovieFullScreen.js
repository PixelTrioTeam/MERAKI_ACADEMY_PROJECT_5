import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const MovieFullScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const movie = location.state?.movie;

  useEffect(() => {
    if (!movie) {
      navigate("/main");
    }
  }, [movie, navigate]);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
  };

  return (
    <Modal show={show} fullscreen onHide={() => navigate(-1)}>
      <Modal.Header closeButton>
        <Modal.Title>{movie?.title || "Movie Trailer"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        {movie?.trailer ? (
          movie.trailer.includes("youtube.com") ? (
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(movie.trailer)}
              title={movie.title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ) : (
            <video width="100%" controls autoPlay>
              <source src={movie.trailer} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <p>..</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieFullScreen;
