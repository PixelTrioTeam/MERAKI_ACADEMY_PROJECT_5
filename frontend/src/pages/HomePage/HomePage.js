import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import "./slider.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setMovies } from "../../Service/redux/reducers/movies/movieSlice";
import { setSeries } from "../../Service/redux/reducers/series/seriesSlice";

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
        {/* <Carousel.Item className="sliderDiv">
          <img
            className="Slider-img"
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/h/d/k/medium-squid-game-hd-poster-for-wall-decor-a3-poster-squid-game-original-imagv2vxrqtudpet.jpeg?q=20&crop=false"
          />
          <img
            className="Slider-img"
            src="https://www.tallengestore.com/cdn/shop/products/PrisonBreak-NetflixTVShowPoster_72517e2c-3db7-48cb-82f5-ea8c2916bfb3.jpg?v=1589271930"
          />
          <img
            className="Slider-img"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3a1654116269619.605e35b102e33.jpg"
          />

          <div className="carousel-description">
            <p className="description-text">Trending on NextPlay</p>
          </div>
        </Carousel.Item> */}
        <Carousel.Item>
          <div className="flexSlider">
            <img
              className="Slider-img"
              src="https://i0.wp.com/www.heyuguys.com/images/2014/09/Interstellar-Poster.png"
            />
            <img
              className="Slider-img"
              src="https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_.jpg"
            />
            <img
              className="Slider-img"
              src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
            />
          </div>
          <div className="carousel-description">
            <p className="description-text">Trending on NextPlay</p>
          </div>
        </Carousel.Item>
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
