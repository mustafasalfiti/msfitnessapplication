import React from "react";
import axios from "axios";
import NewPassword from "./NewPassword";

export default function ResetPassword({ phoneNumber }) {
  const [error, setError] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [showPasswordInputs, setShowPasswordInputs] = React.useState(false);
  const [code, setCode] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/resetpassword", {
        phone_number: phoneNumber,
        code
      });
      console.log(response);
      if (response.status === 200) {
        setError(null);
        setToken(response.data);
        setShowPasswordInputs(true);
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  function renderComponents() {
    if (!showPasswordInputs) {
      return (
        <form onSubmit={handleSubmit}>
          <h1>Enter the code</h1>
          <p>Please Enter the Code we sent you on your phone</p>
          <span className="errorText">{error ? error : ""}</span>
          <input
            type="number"
            name="code"
            maxLength="6"
            value={code}
            onChange={event => setCode(event.target.value)}
          />
          <br />

          <input id="fp-btn" type="submit" value="Submit" />
        </form>
      );
    } else {
      return <NewPassword token={token} code={code} />;
    }
  }
  return <div className="forgetpassword-container">{renderComponents()}</div>;
}
