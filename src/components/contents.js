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

function Contents(props) {
  const { whichPage, header, images, imageWidth, imageHeight } = props;

  function convertFileToTags(pageInfo) {
    for (var i = 0; i < pageInfo.length; i++) {
      if (pageInfo[i].toString().includes("image")) {
        pageInfo[i] = pageInfo[i].replace("image", "");
        pageInfo[i] = (
          <Image
            whichPage={whichPage}
            whichImage={pageInfo[i]}
            images={images}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        );
      }
      if (pageInfo[i] == "header") {
        pageInfo[i] = <Header header={header} whichPage={whichPage} />;
      }
      if (pageInfo[i] == "paragraph") {
        pageInfo[i] = <Text whichPage={whichPage} />;
      }
      if (pageInfo[i] == "carousel") {
        pageInfo[i] = (
          <ImageCarousel
            imageCarousel={imageCarouselData}
            textCarousel={textCarouselData}
          />
        );
      }
    }
    return pageInfo;
  }

  return (
    <div className="contents">{convertFileToTags(contentData[whichPage])}</div>
  );
}
export default Contents;
