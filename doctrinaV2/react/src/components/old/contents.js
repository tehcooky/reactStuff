import React from "react";

//components
import Image from "./image.js";
import Header from "./header.js";
import Text from "./text.js";
import ImageCarousel from "./imageCarousel.js";
import RegisterForm from "./registerForm.js";
import LoginForm from "./loginForm.js";

//data
import imageCarouselData from "../data/imageCarousel.js";
import textCarouselData from "../data/textCarousel.js";
import loggedOutPage1Data from "../data/loggedOutPages/page1Data.js";
import loggedOutPage2Data from "../data/loggedOutPages/page2Data.js";
import loggedOutPage3Data from "../data/loggedOutPages/page3Data.js";
import loggedOutPage4Data from "../data/loggedOutPages/page4Data.js";
import loggedOutPage5Data from "../data/loggedOutPages/page5Data.js";
import loggedInPage1Data from "../data/loggedInPages/page1Data.js";
import loggedInPage2Data from "../data/loggedInPages/page2Data.js";
import loggedInPage3Data from "../data/loggedInPages/page3Data.js";
import loggedInPage4Data from "../data/loggedInPages/page4Data.js";
import loggedInPage5Data from "../data/loggedInPages/page5Data.js";

const offlineContentData = [
  loggedOutPage1Data,
  loggedOutPage2Data,
  loggedOutPage3Data,
  loggedOutPage4Data,
  loggedOutPage5Data,
];

const onlineContentData = [
  loggedInPage1Data,
  loggedInPage2Data,
  loggedInPage3Data,
  loggedInPage4Data,
  loggedInPage5Data,
];

function Contents(props) {
  const {
    whichPage,
    header,
    images,
    imageWidth,
    imageHeight,
    loggedInHook,
    loggedIn,
  } = props;

  function whichData(data) {
    switch (data[0]) {
      case "image":
        return (
          <Image
            whichImage={data[1]}
            images={images}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        );
      case "header":
        return <Header header={header} whichOne={data[1]} />;
      case "paragraph":
        return <Text whichOne={data[1]} />;
    }
  }

  function convertFileToTags(pageInfo) {
    var whichOne = 0;
    var data = "";
    var tags = [];
    for (var i = 0; i < pageInfo.length; i++) {
      if (pageInfo[i][0] !== "!") {
        if (pageInfo[i].toString().includes("image")) {
          whichOne = pageInfo[i].replace("image", "");
          data = ["image", whichOne];
        }
        if (pageInfo[i].toString().includes("header")) {
          whichOne = pageInfo[i].replace("header", "");
          data = ["header", whichOne];
        }
        if (pageInfo[i].toString().includes("paragraph")) {
          whichOne = pageInfo[i].replace("paragraph", "");
          data = ["paragraph", whichOne];
        }
        tags[i] = whichData(data);
      }
      if (pageInfo[i][0] === "!") {
        if (pageInfo[i] === "!spacing") {
          tags[i] = <p className="spacing"></p>;
        }
        if (pageInfo[i] === "!carousel") {
          tags[i] = (
            <ImageCarousel
              imageCarousel={imageCarouselData}
              textCarousel={textCarouselData}
            />
          );
        }
        if (pageInfo[i] === "!registerform") {
          tags[i] = <RegisterForm />;
        }
        if (pageInfo[i] === "!loginform") {
          tags[i] = <LoginForm loggedInHook={loggedInHook} />;
        }
      }
    }
    return tags;
  }

  return (
    <div className="contents">
      {convertFileToTags(
        loggedIn ? onlineContentData[whichPage] : offlineContentData[whichPage]
      )}
    </div>
  );
}
export default Contents;
