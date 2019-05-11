import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import axios from 'axios';

export default function ForgetPassword() {
  const { dispatch } = React.useContext(Store);
  const[phoneNumber, setPhoneNumber] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios.post('/forgetpassword', {phone_number:phoneNumber});
    console.log(response);
  }


  return (
    <div className="forgetpassword">
      <header>
        <Navbar />
      </header>
      <div className="forgetpassword-container">
        <form onSubmit={handleSubmit}>
        <h1>Forget Password</h1>
        <p>please enter your phone number in order to restart your password , we will send you a SMS contains the information
        </p>
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
    </div>
  );
}
