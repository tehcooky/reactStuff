import { Link } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom, loggedInAtom, passwordAtom, adminAtom } from "../App.js";

export default function NavigationLinks(props) {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [admin, setAdmin] = useAtom(adminAtom);
  const adminBool = admin.toString();

  var navigationLinks = [];
  if (loggedIn && adminBool === "false") {
    navigationLinks = ["aboutMe"];
  } else if (loggedIn && adminBool === "true") {
    navigationLinks = ["adminPanel"];
  } else {
    navigationLinks = ["signUpJourney", "loginJourney"];
  }

  function mapButtons(props) {
    var buttons = props.map((buttons, i) => {
      var buttonAddress = "/" + buttons;
      return (
        <div className="navbarLink" key={i}>
          <Link to={buttonAddress}>{buttons}</Link>
        </div>
      );
    });
    if (loggedIn) {
      buttons.push(
        <div className="navbarLink">
          <Link
            to="/"
            onClick={() => {
              setLoggedIn(false);
              setEmail("");
              setPassword("");
              setAdmin(false);
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
    <div className="navbarLinks">
      <div className="navbarLink">
        <Link to="/">Home</Link>
      </div>
      {mapButtons(navigationLinks)}
    </div>
  );
}
