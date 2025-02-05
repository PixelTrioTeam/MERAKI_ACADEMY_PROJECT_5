import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./slider.css";

const ControlledCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="sliderDiv">
        <img 
          className="Slider-img"
          src="https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/h/d/k/medium-squid-game-hd-poster-for-wall-decor-a3-poster-squid-game-original-imagv2vxrqtudpet.jpeg?q=20&crop=false"
        />
        {/* <img
          className="Slider-img"
          src="https://www.tallengestore.com/cdn/shop/products/PrisonBreak-NetflixTVShowPoster_72517e2c-3db7-48cb-82f5-ea8c2916bfb3.jpg?v=1589271930"
        />
        <img
          className="Slider-img"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3a1654116269619.605e35b102e33.jpg"
        /> */}

        <div className="carousel-description">
          <p className="description-text">
            The legend of Gotham’s protector continues.
          </p>
          <button className="btn btn-primary">Watch Now</button>
        </div>
      </Carousel.Item>
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
          <p className="description-text">
            The legend of Gotham’s protector continues.
          </p>
          <button className="btn btn-primary">Watch Now</button>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="Slider-img"
          src="https://m.media-amazon.com/images/M/MV5BZWVhYTNhMzctNjE3Yi00MTcxLTk3ZTctYWU5OTY4YWZkY2NmXkEyXkFqcGc@._V1_.jpg"
        />

        <img
          className="Slider-img"
          src="https://m.media-amazon.com/images/M/MV5BNWYyYTExNWMtZGYyYy00YTEzLTg5MzEtY2YyMDI3MDNlMjcwXkEyXkFqcGc@._V1_.jpg"
        />

        <img
          className="Slider-img"
          src="https://i0.wp.com/www.heyuguys.com/images/2014/09/Interstellar-Poster.png"
        />

        <div className="carousel-description">
          <p className="description-text">
            The legend of Gotham’s protector continues.
          </p>
          <button className="btn btn-primary">Watch Now</button>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default ControlledCarousel;
