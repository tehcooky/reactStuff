import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichPage: props.whichPage,
      images: props.images,
      imageWidth: props.imageWidth,
      imageHeight: props.imageHeight,
    };
  }

  imageToRender = (i) => {
    return this.state.images[i];
  };

  render() {
    return (
      <div className="image">
        <img
          src={this.imageToRender(this.props.whichImage)}
          alt={this.imageToRender(this.props.whichImage)}
          width={this.state.imageWidth[this.props.whichImage]}
          height={this.state.imageHeight[this.props.whichImage]}
        ></img>
      </div>
    );
  }
}

export default Image;
