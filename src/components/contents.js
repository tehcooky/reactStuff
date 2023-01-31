import React from "react";

//components
import Image from "./image.js";
import Header from "./header.js";
import Text from "./text.js";
import ImageCarousel from "./imageCarousel.js";

//data
import imageCarouselData from "../data/imageCarousel.js";
import textCarouselData from "../data/textCarousel.js";
import page1Data from "../data/page1Data.js";
import page2Data from "../data/page2Data.js";
import page3Data from "../data/page3Data.js";
import page4Data from "../data/page4Data.js";

const contentData = [page1Data, page2Data, page3Data, page4Data];

class Contents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: props.header,
      images: props.images,
      imageWidth: props.imageWidth,
      imageHeight: props.imageHeight,
    };
  }

  convertFileToTags = (pageInfo) => {
    const pageData = pageInfo;
    for (var i = 0; i < pageData.length; i++) {
      var imageNumber = pageData[i];
      if (pageData[i].toString().includes("image")) {
        imageNumber = imageNumber.replace("image", "");
        pageData[i] = (
          <Image
            whichPage={this.props.whichPage}
            whichImage={imageNumber}
            images={this.state.images}
            imageWidth={this.state.imageWidth}
            imageHeight={this.state.imageHeight}
          />
        );
      }
      if (pageData[i] == "header") {
        pageData[i] = (
          <Header header={this.state.header} whichPage={this.props.whichPage} />
        );
      }
      if (pageData[i] == "paragraph") {
        pageData[i] = <Text whichPage={this.props.whichPage} />;
      }
      if (pageData[i] == "carousel") {
        pageData[i] = (
          <ImageCarousel
            imageCarousel={imageCarouselData}
            textCarousel={textCarouselData}
          />
        );
      }
    }
    return pageData;
  };

  render() {
    return (
      <div className="contents">
        {this.convertFileToTags(contentData[this.props.whichPage])}
        {/* <Image
          whichPage={this.props.whichPage}
          images={this.state.images}
          imageWidth={this.state.imageWidth}
          imageHeight={this.state.imageHeight}
        />
        <Header header={this.state.header} whichPage={this.props.whichPage} />
        <Text whichPage={this.props.whichPage} />
        <ImageCarousel
          imageCarousel={imageCarouselData}
          textCarousel={textCarouselData}
        /> */}
      </div>
    );
  }
}
export default Contents;
