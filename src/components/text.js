import React from "react";

import paragraphs1fromfile from "../data/paragraphs1.js";
import paragraphs2fromfile from "../data/paragraphs2.js";
import paragraphs3fromfile from "../data/paragraphs3.js";
import paragraphs4fromfile from "../data/paragraphs4.js";

const paragraphs1 = paragraphs1fromfile;
const paragraphs2 = paragraphs2fromfile;
const paragraphs3 = paragraphs3fromfile;
const paragraphs4 = paragraphs4fromfile;

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paragraphs: "0",
    };
  }

  buildParagraphs = (paragraphs) => {
    this.state.paragraphs = paragraphs;
    var builtParagraphs = this.state.paragraphs.map((paragraphs, i) => {
      return <p>{paragraphs}</p>;
    });
    return <div>{builtParagraphs}</div>;
  };

  paragraphToShow = (i) => {
    switch (i + 1) {
      case 1:
        return this.buildParagraphs(paragraphs1);
      case 2:
        return this.buildParagraphs(paragraphs2);
      case 3:
        return this.buildParagraphs(paragraphs3);
      case 4:
        return this.buildParagraphs(paragraphs4);
    }
    return "this page doesnt have any paragraphs";
  };

  render() {
    return (
      <div>
        <div className="paragraphs">
          {this.paragraphToShow(this.props.whichPage)}
        </div>
      </div>
    );
  }
}

export default Text;
