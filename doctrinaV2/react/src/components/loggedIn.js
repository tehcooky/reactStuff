import { useAtom } from "jotai";
import { loggedInAtom } from "../App.js";

function LoggedIn() {
  const [loggedIn] = useAtom(loggedInAtom);

  if (loggedIn) {
    return <p>user is logged in: true</p>;
  } else {
    return <p>user is logged in: false</p>;
  }
}

export default LoggedIn;
