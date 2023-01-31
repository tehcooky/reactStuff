import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageCarousel: props.imageCarousel,
      textCarousel: props.textCarousel,
    };
  }
  render() {
    var carousel = this.state.imageCarousel.map((imagesource, i) => {
      return (
        <div>
          <img src={imagesource} />
          <p className="legend">{this.state.textCarousel[i]}</p>
        </div>
      );
    });
    return (
      <div className="c1">
        <Carousel>{carousel}</Carousel>
      </div>
    );
  }
}

export default ImageCarousel;
