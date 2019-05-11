import React from "react";
import Navbar from "../base/Navbar";
import Field from "../base/Field";
import Store from "../../context/store";
import { createMember } from "../../actions";
import { handleMemberErrors, imageError } from "../../utils/errors";
export default function AdminAddMember({ history }) {
  
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const [imageFile, setImageFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(null);
  const [values, setValues] = React.useState({
    username: "",
    fullname: "",
    phone_number: "",
    branch: "",
    gender: "",
    address: "",
    birthday: "",
    register_date: "",
    expire_date: "",
    password: ""
  });



  const { dispatch } = React.useContext(Store);

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
      createMember(dispatch, data, history);
    }
    setShowError(true);
  }

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

  React.useEffect(() => {
    setErrors(handleMemberErrors(values));
  }, [values]);

  return (
    <div className="addblock">
      <header>
        <Navbar />
      </header>
      <div className="addblock-container">
        <form onSubmit={handleSubmit}>
          <h1>Add member</h1>
          <div className="input-2">
            <Field
              name="username"
              placeholder="Username"
              label="Username"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />
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
          </div>

          <div className="input-2">
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
              name="branch"
              placeholder="Branch"
              label="Branch"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />
          </div>

          <div className="input-2">
            <Field
              name="gender"
              placeholder="Gender"
              label="Gender"
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
          </div>

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

            <Field
              name="register_date"
              label="Register Date"
              type="date"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />

            <Field
              name="expire_date"
              label="Expire Date"
              type="date"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />
          </div>

          <div className="input-2">
            <Field
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />

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
    </div>
  );
}
