import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

//components
import Title from "../components/title.js";
import NavigationLinks from "../components/navigationLinks.js";
import Footer from "../components/footer.js";
import LoggedIn from "../components/loggedIn.js";
import LoginJourney from "../components/loginJourney.js";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom } from "../App.js";

export default function SignUpJourney(props) {
  const [email] = useAtom(emailAtom);

  return (
    <div>
      <div className="title">
        <Title />
      </div>
      <div className="nav-bar-background">emailAtom: {email}</div>
      <div className="loggedinstate">
        <LoggedIn />
      </div>
      <div className="nav-bar-background">
        <div className="nav-bar-buttons">
          <NavigationLinks />
        </div>
      </div>
      <div className="contents">
        <LoginJourney />
      </div>
      <div className="footer-background">
        <Footer />
      </div>
    </div>
  );
}
