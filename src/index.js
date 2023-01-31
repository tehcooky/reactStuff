import React from "react";
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

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichPage: 0,
      navbarButtons: navButtonData,
      titles: titleData,
      images: imageData,
      imageWidth: imageWidthData,
      imageHeight: imageHeightData,
      header: headerData,
    };
  }

  render() {
    return (
      <div>
        <div className="title">
          <Title index={this.state.whichPage} titles={this.state.titles} />
        </div>
        <div className="nav-bar-background">
          <div className="nav-bar-buttons">
            <NavigationButtons
              navbarButtons={this.state.navbarButtons}
              whichPage={this.state.whichPage}
              onChange={(value) => this.setState({ whichPage: value })}
            />
          </div>
        </div>
        <div className="contents">
          <Contents
            whichPage={this.state.whichPage}
            header={this.state.header}
            images={this.state.images}
            imageWidth={this.state.imageWidth}
            imageHeight={this.state.imageHeight}
            imageCarousel={this.state.imageCarousel}
            textCarousel={this.state.textCarousel}
          />
        </div>
        <div className="footer-background">
          <Footer />
        </div>
      </div>
    );
  }
}

class Website extends React.Component {
  render() {
    return (
      <div className="website">
        <Page />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Website />);
