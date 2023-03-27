import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom, passwordAtom } from "../App.js";

function Form(props) {
  const { loggedInHook } = props;
  const [errorText, errorOccured] = useState("");

  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  //formik logic
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    //validate form
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Please provide a password "),
      confirmNewPassword: Yup.string()
        .required("Please confirm your password ")
        .test("passwords-match", "passwords must match", function (value) {
          return this.parent.newPassword === value;
        }),
    }),

    //submit form
    onSubmit: (values) => {
      const { newPassword } = values;
      if (values.password === password) {
        axios
          .post("/changePassword", {
            email: email,
            password: newPassword,
          })
          .then((response) => {
            if (response.data["response"] === "success") {
              errorOccured("");
              setPassword(newPassword);
            } else {
            }
          })
          .catch((err) => console.log(err));
      } else {
        errorOccured("incorrect password");
      }
    },
  });

  function updatePasswordForm() {
    return (
      <div>
        <label>update password</label>
        <br />
        <label>
          <strong>{errorText}</strong>
        </label>
        <div className="registrationFormFields">
          <label className={`${formik.errors.password ? "" : ""}`}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "current password: "}{" "}
          </label>
          <input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="enter your current password"
            onBlur={formik.handleBlur}
            type="password"
          ></input>
          <br />
          <label>new password: </label>
          <input
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="enter new password"
            onBlur={formik.handleBlur}
            type="password"
          ></input>
          <br />
          <label>Confirm new password: </label>
          <input
            name="confirmNewPassword"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            placeholder="confirm the new password"
            onBlur={formik.handleBlur}
            type="password"
          ></input>
          <br />
          <br />
        </div>
      </div>
    );
  }
  return (
    <main>
      <form onSubmit={formik.handleSubmit} className="formBackgroundLarge">
        {updatePasswordForm()}
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default Form;
