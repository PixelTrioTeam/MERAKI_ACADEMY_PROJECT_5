import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSeries } from "../../Service/redux/reducers/series/seriesSlice";
import "./series.css";
import { useNavigate } from "react-router-dom";

const SeriesPage = () => {
  const dispatch = useDispatch();
  const series = useSelector((state) => state.series.series);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/series")
      .then((res) => {
        dispatch(setSeries(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

  return (
    <div className="series-container">
      <h1>Series Page</h1>
      {genres.map((genre) => (
        <div key={genre} className="genre-section">
          <h2>{genre}</h2>
          <div className="series-grid">
            {series.length > 0 ? (
              series
                .filter((show) => show.genre_name === genre)
                .map((show) => (
                  <div className="flip-card" key={show.id}>
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
                        <button
                          className="more-button"
                          onClick={() => navigate(`/series/${show.id}`)}
                        >
                          More
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeriesPage;
