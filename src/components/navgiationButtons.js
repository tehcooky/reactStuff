import React from "react";

class NavigationButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarButtons: props.navbarButtons,
      whichPage: props.whichPage,
    };
  }

  render() {
    var allButtons = this.props.navbarButtons.map((button, i) => {
      return (
        <button
          className="navbarButton"
          key={i}
          onClick={(event) => this.props.onChange(i)}
        >
          {button}
        </button>
      );
    });
    return <div>{allButtons}</div>;
  }
}

export default NavigationButtons;
