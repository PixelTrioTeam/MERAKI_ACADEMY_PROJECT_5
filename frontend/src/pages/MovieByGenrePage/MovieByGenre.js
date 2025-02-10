import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMoviesByGenreId } from "../../service/redux/reducers/movies/movieSlice";
import { setSeriesByGenreId } from "../../service/redux/reducers/series/seriesSlice";
import axios from "axios";

function MovieByGenre() {
  const { genreType, genreId } = useParams();
  console.log("genretype", genreType);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.series.series);

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
        <h2>{genreType} Movies</h2>
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
                    <p className="movie-actors">{movie.actor_names}</p>
                    <p className="movie-director">{movie.director_name}</p>
                    <p className="movie-rating">⭐ {movie.rate}/10</p>
                    <button className="more-button">More</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
      </div>

      <div className="series-container">
        <h2>{genreType} Series</h2>
        <div className="movies-grid">
          {series.length > 0 ? (
            series.map((serie) => (
              <div className="flip-card" key={serie.id}>
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
                    <button className="more-button">More</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading series...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieByGenre;
