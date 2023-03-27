import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom, loggedInAtom, passwordAtom, adminAtom } from "../App.js";

function Form(props) {
  const [errorText, errorOccured] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useAtom(emailAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [admin, setAdmin] = useAtom(adminAtom);

  //need a way to deal with the fact you can hit back on to this page even though you're logged in

  //formik logic
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .min(3, "Username is too short ")
        .max(30, "Username is too long ")
        .email("must be a valid email"),
      password: Yup.string().required("Please provide a password "),
    }),

    //submit form
    onSubmit: async (values) => {
      //console.log(values);
      setSubmitted(true);
      const email =
        values.email.charAt(0).toUpperCase() + values.email.slice(1);
      const { password } = values;

      await axios
        .post("/loginJourney", {
          email: email,
          password: values.password,
        })
        .then((response) => {
          var loginJourneyResponse = response.data;
          if (loginJourneyResponse["response"] === "success!") {
            //setting logged in and email via atom
            console.log(loginJourneyResponse["admin"]);
            setLoggedIn(true);
            setEmail(email);
            setPassword(password);
            setAdmin(loginJourneyResponse["admin"]);
            //setAdmin(false);

            if (admin === false) {
              //this is no longer being hit
              switch (loginJourneyResponse["registrationStage"]) {
                case "2":
                  navigate("/UploadId");
                  break;
                case "3":
                  navigate("/Payment");
                  break;
                default:
                  navigate("/");
              }
            } else if (admin === true) {
              navigate("/AdminPanel");
            }
          } else {
            errorOccured("Username or Password were incorrect");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  function hasSubmitted() {
    if (submitted) {
      return (
        <div>
          <p>login information submitted please wait</p>
        </div>
      );
    } else {
      return (
        <div>
          <div className="registrationFormFields">
            <label className={`${formik.errors.email ? "" : ""}`}>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "Email: "}{" "}
            </label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="enter your email"
              onBlur={formik.handleBlur}
            ></input>
            <br />
            <label className={`${formik.errors.password ? "" : ""}`}>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : "Password: "}
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="enter your password"
              onBlur={formik.handleBlur}
            ></input>
          </div>
          <br />
          <button type="submit">submit</button>
        </div>
      );
    }
  }

  return (
    <main className="spacing-top">
      <form onSubmit={formik.handleSubmit} className="formBackgroundLarge">
        <label>
          <strong>LOGIN FORM</strong>
        </label>
        <br />
        <label>{errorText}</label>
        <br></br>
        {hasSubmitted()}
      </form>
    </main>
  );
}
export default Form;
