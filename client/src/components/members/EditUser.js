import React from "react";
import Field from "../base/Field";
import { handleMemberErrors, imageError } from "../../utils/errors";
import { updateUser } from "../../actions";

export default function EditUser({ edit, dispatch, user, setEdit }) {

  const [imageFile, setImageFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);

  const [values, setValues] = React.useState({
    fullname: user.fullname,
    phone_number: user.phone_number,
    address: user.address,
    birthday: user.birthday ? user.birthday.substring(0, 10) : ''
  });

  function onImageChange(event) {
    let file = event.target.files[0];
    const imageFileError = imageError(file);
    if (imageFileError === undefined) {
      setFileError(null);
      setImageFile(file);
    } else {
      setFileError(imageFileError);
    }
  }


  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0 && fileError === null) {
      const data = new FormData();
      Object.keys(values).forEach(key => {
        data.append(key, values[key]);
      });
      if (imageFile) {
        data.append("imageFile", imageFile);
      }
      data.append("request" , "edit_user")
      setEdit(null);
      updateUser(dispatch , data , user.username);
    }
    setShowError(true);
  }


  React.useEffect(() => {
    setErrors(handleMemberErrors(values));
  }, [values]);

  function renderElement() {
    return (
      <div className="eb-right">
        <form onSubmit={handleSubmit}>
          <h1>Edit Info</h1>
          <Field
            name="fullname"
            placeholder="Fullname"
            label="Fullname"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            setValues={setValues}
          />
            <Field
              name="phone_number"
              placeholder="Phone Number"
              label="Phone Number"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />

            <Field
              name="address"
              placeholder="Address"
              label="Address"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />

          <div className="input-2">
            <Field
              name="birthday"
              placeholder="Birthday"
              label="Birthday"
              type="date"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Image : </label>
              <span className="errorText">
                {fileError && showError ? fileError : ""}
              </span>
              <input type="file" name="image_file" onChange={onImageChange} />
            </div>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  return <div className="eb-right">{renderElement()}</div>;
}
