import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom, loggedInAtom } from "../App.js";

function Form(props) {
  const [errorText, errorOccured] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useAtom(emailAtom);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

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
    onSubmit: (values) => {
      //console.log(values);
      const email =
        values.email.charAt(0).toUpperCase() + values.email.slice(1);

      axios
        .post("/loginJourney", {
          email: email,
          password: values.password,
        })
        .then(async (response) => {
          var $loginJourneyResponse = response.data;
          console.log($loginJourneyResponse);
          if ($loginJourneyResponse["response"] === "success!") {
            //setting logged in and email via atom
            await setLoggedIn(true);
            setEmail(email);
            errorOccured(`User ${email} has successfully logged in`);
            console.log($loginJourneyResponse["registrationStage"]);
            switch ($loginJourneyResponse["registrationStage"]) {
              case "2":
                navigate("/UploadId");
                break;
              case "3":
                navigate("/Payment");
                break;
              default:
                navigate("/");
            }
          } else {
            errorOccured("Username or Password were incorrect");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <main className="spacing-top">
      <form onSubmit={formik.handleSubmit} className="formBackgroundLarge">
        <label>
          <strong>LOGIN FORM</strong>
        </label>
        <br />
        <label>{errorText}</label>
        <br></br>
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
        <button>submit</button>
      </form>
    </main>
  );
}
export default Form;
