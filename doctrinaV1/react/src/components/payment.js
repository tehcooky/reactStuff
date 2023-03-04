import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom } from "../App.js";

export default function Payment(props) {
  const [errorText, errorOccured] = useState("");
  const navigate = useNavigate();

  const [email] = useAtom(emailAtom);

  //formik logic
  const formik = useFormik({
    initialValues: {},
    //validate form
    validationSchema: Yup.object({}),

    //submit form
    onSubmit: (values) => {
      axios
        .post("/payment", {
          email: email,
        })
        .then((response) => {
          console.log(response);
          if (response.data["response"] === "success") {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <main className="spacing-top">
      <form
        onSubmit={formik.handleSubmit}
        className="formBackgroundLarge spacing-top"
      >
        <label>
          <strong>Payment</strong>
        </label>
        <label>{errorText}</label>
        <br />
        <br />

        <br />
        <br />
        <button type="submit">submit</button>
        <br />
        <br />
      </form>
    </main>
  );
}
