import React from "react";
import Navbar from "../base/Navbar";
import axios from "axios";
import ResetPassword from './ResetPassword';

export default function ForgetPassword() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState(null);
  const [showCodeInput, setShowCodeInput] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/forgetpassword", {
        phone_number: phoneNumber
      });
      if (response.status === 200) {
        setError(null);
        setShowCodeInput(true);
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  function renderComponents() {
    if (!showCodeInput) {
      return (
        <div className="forgetpassword-container">
          <form onSubmit={handleSubmit}>
            <h1>Forget Password</h1>
            <p>
              please enter your phone number in order to restart your password ,
              we will send you a SMS contains the information
            </p>
            <span className="errorText">{error ? error : ""}</span>
            <input
              type="number"
              name="phone_number"
              value={phoneNumber}
              onChange={event => setPhoneNumber(event.target.value)}
            />
            <br />

            <input id="fp-btn" type="submit" value="Send Code" />
          </form>
        </div>
      );
    } else return <ResetPassword setShowCodeInput={setShowCodeInput} phoneNumber={phoneNumber} />;
  }

  return (
    <div className="forgetpassword">
      <header>
        <Navbar />
      </header>
      {renderComponents()}
    </div>
  );
}
