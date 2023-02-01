import React from "react";

import paragraphs1fromfile from "../data/paragraphs1.js";
import paragraphs2fromfile from "../data/paragraphs2.js";
import paragraphs3fromfile from "../data/paragraphs3.js";
import paragraphs4fromfile from "../data/paragraphs4.js";

const paragraphs1 = paragraphs1fromfile;
const paragraphs2 = paragraphs2fromfile;
const paragraphs3 = paragraphs3fromfile;
const paragraphs4 = paragraphs4fromfile;
const paragraphs = [paragraphs1, paragraphs2, paragraphs3, paragraphs4];

function Text(props) {
  const { whichPage } = props;

  function buildParagraphs(props) {
    var builtParagraphs = props.map((paragraphs, i) => {
      return paragraphs;
    });
    return <div>{builtParagraphs}</div>;
  }

  function paragraphToShow(i) {
    switch (i + 1) {
      case 1:
        return buildParagraphs(paragraphs1);
      case 2:
        return buildParagraphs(paragraphs2);
      case 3:
        return buildParagraphs(paragraphs3);
      case 4:
        return buildParagraphs(paragraphs4);
    }
    return "this page doesnt have any paragraphs";
  }

  return (
    <div>
      <div className="paragraphs">{paragraphToShow(whichPage)}</div>
    </div>
  );
}

export default Text;
