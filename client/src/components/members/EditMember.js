import React from "react";
import Field from "../base/Field";
import { changePasswordErrors, imageError } from "../../utils/errors";
import { updateUser } from "../../actions";

export default function EditMember({ edit, dispatch, user, setEdit , handleInputState}) {
  const [values, setValues] = React.useState({
    currentPassword: "",
    password: "",
    retypedPassword: ""
  });

  const [imageFile, setImageFile] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);

  async function handlePasswordSubmit(event) {
    if (edit !== null) {
      event.preventDefault();
      if (Object.keys(errors).length === 0) {
        let code = await updateUser(dispatch, values, user.username);
        if (code === 200) {
          setEdit(null);
        } else {
          alert(code);
        }
      }
      setShowError(true);
    }
  }


  function onImageChange(event) {
    let file = event.target.files[0];
    const imageFileError = imageError(file);
    if (imageFileError === undefined) {
      setErrors(null);
      setImageFile(file);
    } else {
      setErrors(imageFileError);
      setShowError(true)
    }
  }

  function handleImageSubmit(event) {
    event.preventDefault();
    if(errors === null) {
      const formData = new FormData();
      formData.append('image_file' , imageFile);
      formData.append('image' , user.image);
      updateUser(dispatch, formData, user.username);
      setEdit(null);
    }
  }

  React.useEffect(() => {
    setErrors(changePasswordErrors(values));
  }, [values]);

  function renderElement() {
    if (edit === "Password") {
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
    } else {
      return (
        <div className="eb-right">
          <form onSubmit={handleImageSubmit}>
            <div className="label-input">
              <label>Image : </label>
              <span className="errorText">
                {errors && showError ? errors : ""}
              </span>
              <input type="file" name="image_file" onChange={onImageChange} />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }
  return <div className="eb-right">{renderElement()}</div>;
}
