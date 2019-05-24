import React from "react";
import axios from "axios";
import Field from "../base/Field";
import { changePasswordErrors } from "../../utils/errors";

export default function NewPassword({ token }) {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const [cleanState, setCleanState] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    retypedPassword: ""
  });
  async function handleSubmit(event) {
    event.preventDefault();
    if (!cleanState) {
      if (Object.keys(errors).length === 0) {
        const response = await axios.post(`/resetpassword/${token}`, {
          password: values.password
        });
        if (response.status === 200) {
          setCleanState(true);
        }
      } else {
        setShowError(true);
      }
    }
  }

  React.useEffect(() => {
    setErrors(changePasswordErrors(values));
  }, [values]);

  function renderComponents() {
    if (!cleanState) {
      return (
        <form onSubmit={handleSubmit}>
          <h1>Reset Password </h1>
          <p>
            You have Successfully reached to the last step , now all you have to
            do is to put a new password
          </p>
          <span className="errorText passwordError">
            {errors.doesntMatchPassword && showError
              ? errors.doesntMatchPassword
              : ""}
          </span>
          <Field
            className="resetpassword_input"
            name="password"
            label="New Password"
            type="password"
            showError={showError}
            errors={errors}
            value={values}
            setValues={setValues}
          />

          <Field
            className="resetpassword_input"
            name="retypedPassword"
            label="Re-write Password"
            type="password"
            showError={showError}
            errors={errors}
            value={values}
            setValues={setValues}
          />
          <input id="fp-btn" type="submit" value="Submit" />
        </form>
      );
    } else {
      return <React.Fragment>
        <p id="success">
          You have changed your password successfully.You can now login with
          your new password
        </p>
      </React.Fragment>;
    }
  }
  return <React.Fragment>{renderComponents()}</React.Fragment>;
}
