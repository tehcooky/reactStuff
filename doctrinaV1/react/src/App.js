import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
//pages
import Home from "./pages/home.js";
import SignUpJourney from "./pages/signupjourney.js";
import LoginJourney from "./pages/loginJourney.js";
import UploadId from "./pages/uploadId.js";
import Payment from "./pages/payment.js";

//atoms
import { atom } from "jotai";

export const emailAtom = atom("");
export const loggedInAtom = atom(false);

export default function App() {
  const [email, changeEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUpJourney" element={<SignUpJourney />} />
        <Route
          path="/loginJourney"
          element={<LoginJourney navigate={navigate} emailHook={changeEmail} />}
        />
        <Route path="/UploadId" element={<UploadId />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}
