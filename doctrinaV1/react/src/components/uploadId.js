import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//atom stuff
import { useAtom } from "jotai";
import { emailAtom } from "../App.js";

export default function UploadId(props) {
  const { loggedInHook } = props;
  const [errorText, errorOccured] = useState("");
  const [id, changeId] = useState("");
  const navigate = useNavigate();

  const [email] = useAtom(emailAtom);

  //formik logic
  const formik = useFormik({
    initialValues: {},
    //validate form
    validationSchema: Yup.object({}),

    //submit form
    onSubmit: (values) => {
      axios
        .post("/uploadId", {
          id: id,
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
      >
        <label>
          <strong>Upload Id</strong>
        </label>
        <label>{errorText}</label>
        <br />
        <br />
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event) => {
            changeId(
              event.currentTarget.files[0].name
                ? event.currentTarget.files[0].name
                : ""
            );
            //id = ("file", event.currentTarget.files[0]);
          }}
          className="form-control"
        />
        <br />
        <br />
        <button type="submit">submit</button>
        <br />
        <br />
      </form>
    </main>
  );
}
