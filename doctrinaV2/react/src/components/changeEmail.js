import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom } from "../App.js";

function Form(props) {
  const { loggedInHook } = props;
  const [errorText, errorOccured] = useState("");

  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  //formik logic
  const formik = useFormik({
    initialValues: {
      newEmail: "",
      confirmEmail: "",
    },
    //validate form
    validationSchema: Yup.object({
      newEmail: Yup.string()
        .min(3, "Username is too short ")
        .max(30, "Username is too long ")
        .email("must be a valid email")
        .required("this field is mandatory"),
      confirmEmail: Yup.string()
        .min(3, "Username is too short ")
        .max(30, "Username is too long ")
        .email("must be a valid email")
        .required("this field is mandatory")
        .test("emails-match", "emails must match", function (value) {
          return this.parent.newEmail === value;
        }),
    }),

    //submit form
    onSubmit: (values) => {
      const newEmail =
        values.newEmail.charAt(0).toUpperCase() + values.newEmail.slice(1);

      axios
        .post("/changeEmail", {
          email: email,
          newEmail: newEmail,
        })
        .then((response) => {
          console.log(response);

          if (response.data["response"] === "success") {
            setEmail(newEmail);
            errorOccured("");
            navigate("/AboutMe");
          } else {
            errorOccured(response.data["response"]);
          }
        })
        .catch((err) => console.log(err));
    },
  });

  function updateEmailForm() {
    return (
      <div>
        <label>update email - current email {email}</label>
        <br />
        <br />
        <label>
          <strong>{errorText}</strong>
        </label>
        <br />
        <div className="registrationFormFields">
          <label className={`${formik.errors.newEmail ? "" : ""}`}>
            {formik.touched.newEmail && formik.errors.newEmail
              ? formik.errors.newEmail
              : "New email: "}{" "}
          </label>
          <input
            name="newEmail"
            value={formik.values.newEmail}
            onChange={formik.handleChange}
            placeholder="enter a new email"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.confirmEmail ? "" : ""}`}>
            {formik.touched.confirmEmail && formik.errors.confirmEmail
              ? formik.errors.confirmEmail
              : "Confirm new email: "}{" "}
          </label>
          <input
            name="confirmEmail"
            value={formik.values.confirmEmail}
            onChange={formik.handleChange}
            placeholder="please confirm new email"
            onBlur={formik.handleBlur}
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
        <br />
        <br />
        {updateEmailForm()}
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default Form;
