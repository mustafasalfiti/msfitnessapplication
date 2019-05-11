import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import { NavLink } from "react-router-dom";
import Field from "../base/Field";
import { LoginErrors } from "../../utils/errors";
import { loginUser } from "../../actions";

export default function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const { dispatch } = React.useContext(Store);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      let response = await loginUser(dispatch, values);
      if (response.status !== 200) {
        alert("Invalid Password / Username");
      }
    } else {
      setShowError(true);
    }
  }

  React.useEffect(() => {
    setErrors(LoginErrors(values));
  } , [values]);
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
            setValues={setValues}
            type="text"
            name="username"
            label="Username"
            showError={showError}
            errors={errors}
          />
          <Field
            value={values}
            setValues={setValues}
            type="password"
            name="password"
            label="Password"
            showError={showError}
            errors={errors}
          />
          <input type="submit" value="Submit" />
        </form>
        <div className="forget_password">
          <NavLink to="/forgetpassword">forget my password</NavLink>
        </div>
      </div>
    </div>
  );
}
