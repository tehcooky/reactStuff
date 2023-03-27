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
  const [file, setFile] = useState();

  const [email] = useAtom(emailAtom);

  //formik logic
  const formik = useFormik({
    initialValues: {},
    //validate form
    validationSchema: Yup.object({}),

    //submit form
    onSubmit: async (values) => {
      setSubmitted(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", email);

      //upload image to s3
      axios
        .post("/s3", formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      //update id part in db
      axios
        .post("/uploadId", {
          idFile: id,
          email: email,
        })
        .then((response) => {
          console.log(response);
          if (response.data["response"] === "success") {
            navigate("/Payment");
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
        enctype="multipart/form-data"
        method="post"
      >
        <label>
          <strong>Upload Id</strong>
        </label>
        <label>{errorText}</label>
        <br />
        <input
          name="image"
          type="file"
          onChange={(event) => {
            changeId(
              event.currentTarget.files[0].name
                ? event.currentTarget.files[0].name
                : ""
            );
            setFile(event.currentTarget.files[0]);
          }}
          className="form-control"
        />
        <br />
        <br />
        <button type="submit">submit</button>
        <br />
        <br />
        <br />
        <br />
      </form>
    </main>
  );
}
