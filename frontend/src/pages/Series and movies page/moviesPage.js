import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMovies } from "../../service/redux/reducers/movies/movieSlice";
import "./movies.css";
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/movie")
      .then((res) => {
        dispatch(setMovies(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return (
    <div className="movies-container">
      <h1>Movies Page</h1>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="flip-card" key={movie.id}>
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
                  <p className="movie-rating">⭐ {movie.rate}/10</p>
                  <button className="more-button">More</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
