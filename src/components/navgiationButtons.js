import React, { useState } from "react";

function NavigationButtons(props) {
  const { navbarButtons, buttonClick } = props;

  var allButtons = navbarButtons.map((button, i) => {
    return (
      <button className="navbarButton" key={i} onClick={() => buttonClick(i)}>
        {button}
      </button>
    );
  });
  return <div>{allButtons}</div>;
}

export default NavigationButtons;
