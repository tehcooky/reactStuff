import { Form, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom } from "../App.js";

export default function UploadId() {
  const [errorText, errorOccured] = useState("");
  const [id, changeId] = useState("");
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
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/s3", formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      /*
      setSubmitted(true);
      axios
        .post("/uploadId", {
          idFile: id,
          email: email,
        })
        .then((response) => {
          console.log(response);
          if (response.data["response"] === "success") {
            //navigate("/Payment");
          }
        })
        .catch((err) => console.log(err));
        */
    },
  });

  function hasSubmitted(props) {
    const submitted = props;

    if (submitted === false) {
      return (
        <div>
          <input
            name="image"
            type="file"
            onChange={(event) => {
              changeId(
                event.currentTarget.files[0].name
                  ? event.currentTarget.files[0].name
                  : ""
              );
            }}
            className="form-control"
          />
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
          <label>ID submitted, please wait...</label>
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
        enctype="multipart/form-data"
        method="post"
      >
        <label>
          <strong>Upload Id</strong>
        </label>
        <label>{errorText}</label>
        <br />
        <br />
        {hasSubmitted(submitted)}
      </form>
    </main>
  );
}
