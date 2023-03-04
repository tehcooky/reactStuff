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

  //formik logic
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmemail: "",
      password: "",
      confirmPassword: "",

      firstLineAddress: "",
      secondLineAddress: "",
      postcode: "",
      county: "",
      country: "United Kingdom",
      newsletterOptIn: false,
      agreeToTerms: false,
    },
    //validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .min(3, "Username is too short ")
        .max(30, "Username is too long ")
        .email("must be a valid email")
        .required("this field is mandatory"),
      confirmemail: Yup.string()
        .min(3, "Username is too short ")
        .max(30, "Username is too long ")
        .email("must be a valid email")
        .required("this field is mandatory")
        .test("emails-match", "emails must match", function (value) {
          return this.parent.email === value;
        }),
      password: Yup.string().required("Please provide a password "),
      confirmPassword: Yup.string()
        .required("Please confirm your password ")
        .test("passwords-match", "passwords must match", function (value) {
          return this.parent.password === value;
        }),
      firstLineAddress: Yup.string().required("this field is mandatory"),
      secondLineAddress: Yup.string(),
      postcode: Yup.string().required("this field is mandatory"),
      county: Yup.string().required("this field is mandatory"),
      country: Yup.string().required("this field is mandatory"),
      agreeToTerms: Yup.boolean().oneOf(
        [true],
        "Please agree to the terms and conditions to continue"
      ),
    }),

    //submit form
    onSubmit: (values) => {
      //console.log(values);
      const email =
        values.email.charAt(0).toUpperCase() + values.email.slice(1);

      axios
        .post("/registrationStage1", {
          email: email,
          password: values.password,
          firstLineAddress: values.firstLineAddress,
          secondLineAddress: values.secondLineAddress,
          county: values.county,
          postcode: values.postcode,
          country: values.country,
          newsletterOptIn: values.newsletterOptIn,
          agreeToTerms: values.agreeToTerms,
          registrationStage: 2,
          id: "none",
          paidTandD: "0000-00-00 00:00:00",
        })
        .then((response) => {
          if (response.data.includes("success")) {
            errorOccured(`User ${values.email} registered!`);
            setEmail(email);
            setLoggedIn(true);
            navigate("/UploadId");
          } else {
            errorOccured("The email has to be unique!");
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <main className="spacing-top">
      <form onSubmit={formik.handleSubmit} className="formBackgroundLarge">
        <br />
        <label>
          <strong>Registration Form</strong>
        </label>
        <br />
        <label>{errorText}</label>
        <br />
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
          <label className={`${formik.errors.confirmemail ? "" : ""}`}>
            {formik.touched.confirmemail && formik.errors.confirmemail
              ? formik.errors.confirmemail
              : "Confirm Email: "}{" "}
          </label>
          <input
            name="confirmemail"
            value={formik.values.confirmemail}
            onChange={formik.handleChange}
            placeholder="confirm your email"
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
          <label className={`${formik.errors.confirmPassword ? "" : ""}`}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : "confirm password: "}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="confirm your password"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <br />
          <label className={`${formik.errors.firstLineAddress ? "" : ""}`}>
            {formik.touched.firstLineAddress && formik.errors.firstLineAddress
              ? formik.errors.firstLineAddress
              : "firstLineAddress: "}
          </label>
          <input
            name="firstLineAddress"
            value={formik.values.firstLineAddress}
            onChange={formik.handleChange}
            placeholder="enter your firstLineAddress"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.secondLineAddress ? "" : ""}`}>
            {formik.touched.secondLineAddress && formik.errors.secondLineAddress
              ? formik.errors.secondLineAddress
              : "secondLineAddress: "}
          </label>
          <input
            name="secondLineAddress"
            value={formik.values.secondLineAddress}
            onChange={formik.handleChange}
            placeholder="enter your secondLineAddress"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.county ? "" : ""}`}>
            {formik.touched.county && formik.errors.county
              ? formik.errors.county
              : "county: "}
          </label>
          <input
            name="county"
            value={formik.values.county}
            onChange={formik.handleChange}
            placeholder="enter your county"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.postcode ? "" : ""}`}>
            {formik.touched.postcode && formik.errors.postcode
              ? formik.errors.postcode
              : "postcode: "}
          </label>
          <input
            name="postcode"
            value={formik.values.postcode}
            onChange={formik.handleChange}
            placeholder="enter your postcode"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.country ? "" : ""}`}>
            {formik.touched.country && formik.errors.country
              ? formik.errors.country
              : "country: "}
          </label>
          <input
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            placeholder="enter your country"
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <br />
          <label className={`${formik.errors.newsletterOptIn ? "" : ""}`}>
            {formik.touched.newsletterOptIn && formik.errors.newsletterOptIn
              ? formik.errors.newsletterOptIn
              : "I wish to recieve marketing: "}
          </label>
          <input
            type="checkbox"
            name="newsletterOptIn"
            value={formik.values.newsletterOptIn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <br />
          <label className={`${formik.errors.agreeToTerms ? "" : ""}`}>
            {formik.touched.agreeToTerms && formik.errors.agreeToTerms
              ? formik.errors.agreeToTerms
              : "I agree to the terms and conditions: "}
          </label>
          <input
            type="checkbox"
            name="agreeToTerms"
            value={formik.values.agreeToTerms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
        </div>
        <br />
        <br />
        <br />
        <button>submit</button>
      </form>
    </main>
  );
}
export default Form;
