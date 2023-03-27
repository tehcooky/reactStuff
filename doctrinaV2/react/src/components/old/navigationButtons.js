import React from "react";

function NavigationButtons(props) {
  const { navbarButtons, pageHook, loggedInState, logout } = props;

  var allButtons = navbarButtons.map((button, i) => {
    return (
      <button className="navbarButton" key={i} onClick={() => pageHook(i)}>
        {button}
      </button>
    );
  });
  if (loggedInState) {
    allButtons.push(
      <button
        className="navbarButton"
        key={allButtons.length}
        onClick={() => logout(false)}
      >
        logout
      </button>
    );
  }
  allButtons.push(
    <a className="navbarButton" key={allButtons.length} href="signupjourney.js">
      Registration Journey
    </a>
  );
  return <div>{allButtons}</div>;
}

export default NavigationButtons;
