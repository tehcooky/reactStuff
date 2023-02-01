import React from "react";

function Header(props) {
  const { header, whichPage } = props;

  return (
    <h2>
      <div className="headers">{header[whichPage]}</div>
    </h2>
  );
}
export default Header;
