import React from "react";
//import "../styles/index.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: props.header,
    };
  }

  render() {
    return (
      <h2>
        <div className="headers">
          {this.state.headers[this.props.whichPage]}
        </div>
      </h2>
    );
  }
}
export default Header;
