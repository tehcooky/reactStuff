import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form(props) {
  const [errorText, errorOccured] = useState("");
  const navigate = useNavigate();

  //formik logic
  const formik = useFormik({
    initialValues: {},
    //validate form
    validationSchema: Yup.object({}),

    //submit form
    onSubmit: (values) => {
      axios
        .post("", {})
        .then((response) => {})
        .catch((err) => console.log(err));
    },
  });

  return (
    <main className="spacing-top">
      <form onSubmit={formik.handleSubmit} className="formBackgroundLarge">
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default Form;
