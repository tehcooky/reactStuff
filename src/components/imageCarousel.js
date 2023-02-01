import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImageCarousel(props) {
  const { imageCarousel, textCarousel } = props;

  var carousel = imageCarousel.map((imagesource, i) => {
    return (
      <div>
        <img src={imagesource} />
        <p className="legend">{textCarousel[i]}</p>
      </div>
    );
  });

  return (
    <div className="c1">
      <Carousel>{carousel}</Carousel>
    </div>
  );
}

export default ImageCarousel;
