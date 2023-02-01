import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

//components
import Title from "./components/title.js";
import NavigationButtons from "./components/navgiationButtons.js";
import Contents from "./components/contents.js";
import Footer from "./components/footer.js";

//data
import titleData from "./data/titles.js";
import navButtonData from "./data/navbarButtons.js";
import headerData from "./data/headers.js";
import imageData from "./data/images.js";
import imageWidthData from "./data/imageWidth.js";
import imageHeightData from "./data/imageHeight.js";
import imageCarousel from "./data/imageCarousel";
import textCarousel from "./data/textCarousel";

function Page(props) {
  const {
    navbarButtons,
    titles,
    images,
    imageWidth,
    imageHeight,
    header,
    imageCarousel,
    textCarousel,
  } = props;

  const [whichPage, changePage] = useState(props.whichPage);

  return (
    <div>
      <div className="title">
        <Title index={whichPage} titles={titles} />
      </div>
      <div className="nav-bar-background">
        <div className="nav-bar-buttons">
          <NavigationButtons
            navbarButtons={navbarButtons}
            whichPage={whichPage}
            buttonClick={changePage}
          />
        </div>
      </div>
      <div className="contents">
        <Contents
          whichPage={whichPage}
          header={header}
          images={images}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          imageCarousel={imageCarousel}
          textCarousel={textCarousel}
        />
      </div>
      <div className="footer-background">
        <Footer />
      </div>
    </div>
  );
}

function Website() {
  return (
    <div className="website">
      <Page
        whichPage={0}
        navbarButtons={navButtonData}
        titles={titleData}
        images={imageData}
        imageWidth={imageWidthData}
        imageHeight={imageHeightData}
        header={headerData}
        imageCarousel={imageCarousel}
        textCarousel={textCarousel}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Website />);
