import React from "react";

function Header(props) {
  const { header, whichOne } = props;

  return (
    <h2>
      <div className="headers">{header[whichOne]}</div>
    </h2>
  );
}
export default Header;
