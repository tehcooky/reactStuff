import { useAtom } from "jotai";
import { emailAtom, passwordAtom, adminAtom } from "../App.js";

function Atoms() {
  const [email] = useAtom(emailAtom);
  const [password] = useAtom(passwordAtom);
  const [admin] = useAtom(adminAtom);
  const adminBool = admin.toString();

  return (
    <div>
      <p>
        emailAtom: {email}, passwordAtom: {password}, adminAtom: {adminBool}
      </p>
    </div>
  );
}

export default Atoms;
