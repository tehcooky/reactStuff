import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

//components
import Title from "../components/title.js";
import NavigationButtons from "../components/navigationButtons.js";
import Contents from "../components/contents.js";
import Footer from "../components/footer.js";
import LoggedIn from "../components/loggedIn.js";

//data
import titleData from "../data/titles.js";
import loggedOutButtonData from "../data/loggedOutPages/loggedOutNavbarButtons.js";
import loggedInButtonData from "../data/loggedInPages/loggedInNavbarButtons.js";
import headerData from "../data/headers.js";
import imageData from "../data/images.js";
import imageWidthData from "../data/imageWidth.js";
import imageHeightData from "../data/imageHeight.js";
import imageCarousel from "../data/imageCarousel";
import textCarousel from "../data/textCarousel";

function Page(props) {
  const {
    titles,
    images,
    imageWidth,
    imageHeight,
    header,
    imageCarousel,
    textCarousel,
  } = props;

  const [whichPage, changePage] = useState(props.whichPage);
  const [loggedIn, changeLoggedInState] = useState(false);
  const navbarButtons = loggedIn ? loggedInButtonData : loggedOutButtonData;

  return (
    <div>
      <div className="title">
        <Title index={whichPage} titles={titles} />
      </div>
      <div className="loggedinstate">
        <LoggedIn loggedInState={loggedIn} />
      </div>
      <div className="nav-bar-background">
        <div className="nav-bar-buttons">
          <NavigationButtons
            navbarButtons={navbarButtons}
            whichPage={whichPage}
            pageHook={changePage}
            loggedInState={loggedIn}
            logout={changeLoggedInState}
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
          loggedIn={loggedIn}
          loggedInHook={changeLoggedInState}
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
