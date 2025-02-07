import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMovies } from '../../Service/redux/reducers/movies/movieSlice';
import { useNavigate } from "react-router-dom";
import "./movies.css";

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

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  return (
    <div className="movies-container">
      
      {genres.map((genre) => (
        <section key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.filter(movie => movie.genre_name === genre).map((movie) => (
                <div className="flip-card" key={movie.id}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={movie.poster} alt={movie.title} className="movie-image"/>
                    </div>
                    <div className="flip-card-back">
                      <h3 className="movie-title">{movie.title}</h3>
                      <p className="movie-description">{movie.description}</p>
                      <p className="movie-rating">⭐ {movie.rate}/10</p>
                      <button className="more-button" onClick={() => navigate(`/movies/${movie.id}`)}>More Info</button>
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
    </div>
  );
};

export default MoviesPage;
