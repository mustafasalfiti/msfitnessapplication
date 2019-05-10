import React from "react";
import Navbar from "../base/Navbar";
import handleInputState from "../../utils/handleInputState";
import Store from "../../context/store";
import Field from "../base/Field";
import { LoginErrors } from "../../utils/errors";
import { loginUser } from "../../actions";

export default function Login() {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const [cleanState , setCleanState] = React.useState(false);
  const { dispatch } = React.useContext(Store);

  async function handleSubmit(event) {
    event.preventDefault();
    if(!cleanState) {
      if (Object.keys(errors).length === 0) {
        let response = await loginUser(dispatch, values);
        if(response.status !== 200) {
          alert("Invalid Password / Username");
        }
      } else {
        setShowError(true);
      }
    }

  }
  const { values, handleChange } = handleInputState({
    username: "",
    password: ""
  });

  React.useEffect(() => {
    setErrors(LoginErrors(values));
  });
  return (
    <div className="login">
      <header>
        <Navbar />
      </header>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Field
            value={values}
            onChange={handleChange}
            type="text"
            name="username"
            label="Username"
            showError={showError}
            errors={errors}
          />
          <Field
            value={values}
            onChange={handleChange}
            type="password"
            name="password"
            label="Password"
            showError={showError}
            errors={errors}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
