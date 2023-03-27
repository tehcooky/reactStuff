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
  const [submitted, setSubmitted] = useState(false);

  const [email] = useAtom(emailAtom);

  //formik logic
  const formik = useFormik({
    initialValues: {},
    //validate form
    validationSchema: Yup.object({}),

    //submit form
    onSubmit: (values) => {
      setSubmitted(true);
      axios
        .post("/payment", {
          email: email,
        })
        .then((response) => {
          if (response.data["response"] === "success") {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  function hasSubmitted(props) {
    const submitted = props;

    if (submitted === false) {
      return (
        <div>
          <br />
          <br />
          <button type="submit">submit</button>
          <br />
          <br />
        </div>
      );
    } else {
      return (
        <div>
          <label>Payment submitted, please wait...</label>
          <br />
          <br />
        </div>
      );
    }
  }
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
        {hasSubmitted(submitted)}
      </form>
    </main>
  );
}
