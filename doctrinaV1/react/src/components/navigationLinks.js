import { Link } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom, loggedInAtom } from "../App.js";

export default function NavigationLinks(props) {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [email, setEmail] = useAtom(emailAtom);

  var navigationLinks = [];
  if (loggedIn) {
    navigationLinks = [""];
  } else {
    navigationLinks = ["signUpJourney", "loginJourney"];
  }

  function mapButtons(props) {
    var buttons = props.map((buttons, i) => {
      var buttonAddress = "/" + buttons;
      return (
        <div class="navbarLink">
          <Link to={buttonAddress}>{buttons}</Link>
        </div>
      );
    });
    if (loggedIn) {
      buttons.push(
        <div class="navbarLink">
          <Link
            to="/"
            onClick={() => {
              setLoggedIn(false);
              setEmail("");
            }}
          >
            logout
          </Link>
        </div>
      );
    }

    return buttons;
  }

  return (
    <div class="navbarLinks">
      <div class="navbarLink">
        <Link to="/">Home</Link>
      </div>
      {/* <div class="navbarLink">
        <Link to="/signUpJourney">Registration Journey</Link>
      </div>
      <div class="navbarLink">
        <Link to="/loginJourney">Login Journey</Link>
      </div> */}
      {mapButtons(navigationLinks)}
    </div>
  );
}
