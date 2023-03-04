import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Form(props) {
  const { loggedInHook } = props;
  const [errorText, errorOccured] = useState("");
  //formik logic
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    //validate form
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username is too short ")
        .max(20, "Username is too long "),
      password: Yup.string().required("Please provide a password "),
    }),

    //submit form
    onSubmit: (values) => {
      //console.log(values);
      const username =
        values.username.charAt(0).toUpperCase() + values.username.slice(1);

      axios
        .post("/login", {
          username: username,
          password: values.password,
        })
        .then((response) => {
          if (response.data.includes("success")) {
            //setting logged in state via hook?
            loggedInHook(true);
            errorOccured(`User ${username} has successfully logged in`);
          } else {
            errorOccured("Username or Password were incorrect");
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <main>
      <form onSubmit={formik.handleSubmit} className="formBackground">
        <label>
          <strong>LOGIN FORM</strong>
        </label>
        <label>{errorText}</label>
        <br></br>
        <label className={`${formik.errors.username ? "" : ""}`}>
          {formik.touched.username && formik.errors.username
            ? formik.errors.username
            : "Username: "}{" "}
        </label>
        <input
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          placeholder="enter your username"
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
        <br />
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default Form;
