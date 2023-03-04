import React, { useState } from "react";

import "../styles/index.css";

//components
import Title from "../components/title.js";
import NavigationLinks from "../components/navigationLinks.js";
import Footer from "../components/footer.js";
import LoggedIn from "../components/loggedIn.js";
import PaymentForm from "../components/payment.js";

export default function uploadId() {
  return (
    <div>
      <div className="title">
        <Title />
      </div>
      <div className="loggedinstate">
        <LoggedIn />
      </div>
      <div className="nav-bar-background">
        <div className="nav-bar-buttons">
          <NavigationLinks />
        </div>
      </div>
      <div className="contents">
        <PaymentForm />
      </div>
      <div className="footer-background">
        <Footer />
      </div>
    </div>
  );
}
