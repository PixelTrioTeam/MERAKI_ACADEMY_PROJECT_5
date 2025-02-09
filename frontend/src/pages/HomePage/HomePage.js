import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import "./slider.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMovies } from "../../service/redux/reducers/movies/movieSlice";
import { setSeries } from "../../service/redux/reducers/series/seriesSlice";

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const series = useSelector((state) => state.series.series);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movie")
      .then((res) => {
        dispatch(setMovies(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/series")
      .then((res) => {
        dispatch(setSeries(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {movies.length > 0 ? (
          movies.slice(0, 5).map((movie) => (
            <Carousel.Item key={movie.id}>
              <div className="carousel-item-container">
                <div className="backgroundd-container">
                  <img
                    className="Slider-img backgroundd-img"
                    src={movie.poster}
                    alt={movie.title}
                  />
                </div>

                <div className="carousel-content">
                  <div className="poster-left">
                    <img
                      className="Slider-img small-poster-img"
                      src={movie.poster}
                      alt={movie.title}
                    />
                  </div>
                  <div className="movie-info">
                    <div className="carousel-description">
                      <p className="description-text"></p>
                      <h3>{movie.title}</h3>
                      <p className="movie-description">{movie.description}</p>
                      <p className="movie-actors">{movie.actor_names}</p>
                      <p className="movie-director">{movie.director_name}</p>
                      <a href="/watch-now" className="watch-now-link">
                        Watch Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <div className="flexSlider">
              <p>Loading...</p>
            </div>
          </Carousel.Item>
        )}
      </Carousel>

      <div>
        <div className="movies-container">
          <h2>Movies By Nolan</h2>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) =>
                movie.section === "Nolan" ? (
                  <div className="flip-card" key={movie.id}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="movie-image"
                        />
                      </div>
                      {console.log(movie)}

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
                ) : null
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <div className="series-container">
          <h2>Latest Episodes</h2>
          <div className="movies-grid">
            {series.length > 0 ? (
              series.map((serie) =>
                serie.section === "Pouplar" ? (
                  <div className="flip-card" key={serie.id}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img
                          src={serie.poster}
                          alt={serie.title}
                          className="movie-image"
                        />
                      </div>
                      {console.log("serie", serie)}

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
                ) : null
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
