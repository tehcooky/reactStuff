import React from "react";

function Image(props) {
  const { images, imageWidth, imageHeight, whichImage } = props;

  function imageToRender(i) {
    return images[i];
  }

  return (
    <div className="image">
      <img
        src={imageToRender(whichImage)}
        alt={imageToRender(whichImage)}
        width={imageWidth[whichImage]}
        height={imageHeight[whichImage]}
      ></img>
    </div>
  );
}

export default Image;
