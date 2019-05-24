import React from "react";
import Field from "../base/Field";
import { updateUser } from "../../actions";
import { changePasswordErrors } from "../../utils/errors";

export default function ChangePassword({ edit, user, setEdit, dispatch }) {
  const [values, setValues] = React.useState({
    currentPassword: "",
    password: "",
    retypedPassword: ""
  });
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  React.useEffect(() => {
    setErrors(changePasswordErrors(values));
  }, [values]);

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      let code = await updateUser(dispatch, values, user.username);
      if (code === 200) {
        setEdit(null);
        alert("Password Changed Successfully");
      } else {
        alert(code);
      }
    }
    setShowError(true);
  }

  return (
    <div className="eb-right">
      <form onSubmit={handlePasswordSubmit}>
        <Field
          name="currentPassword"
          placeholder="Current Password"
          label="Current Password"
          type="password"
          showError={showError}
          errors={errors}
          value={values}
          setValues={setValues}
        />
        <span className="errorText passwordError">
          {errors.doesntMatchPassword && showError
            ? errors.doesntMatchPassword
            : ""}
        </span>
        <Field
          name="password"
          placeholder="New Password"
          label="New Password"
          type="password"
          showError={showError}
          errors={errors}
          value={values}
          setValues={setValues}
        />

        <Field
          name="retypedPassword"
          placeholder="Re-write Password"
          label="Re-write Password"
          type="password"
          showError={showError}
          errors={errors}
          value={values}
          setValues={setValues}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
