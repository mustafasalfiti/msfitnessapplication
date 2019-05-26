import React from "react";
import Field from "../base/Field";
import Store from "../../context/store";
import { updateMember } from "../../actions";
import { handleMemberErrors, imageError } from "../../utils/errors";

export default function AdminEditMember({
  handleDeleteMember,
  member,
  edit,
  setEdit,
  history
}) {
  const [imageFile, setImageFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const [values, setValues] = React.useState({
    fullname: member.fullname,
    phone_number: member.phone_number,
    branch: member.branch,
    gender: member.gender,
    address: member.address,
    birthday: member.birthday.substring(0, 10),
    register_date: member.register_date.substring(0, 10),
    expire_date: member.expire_date.substring(0, 10),
    image: member.image
  });

  const { dispatch } = React.useContext(Store);

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

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0 && fileError === null) {
      const data = new FormData();
      data.append("username", member.username);
      Object.keys(values).forEach(key => {
        data.append(key, values[key]);
      });
      if (imageFile) {
        data.append("imageFile", imageFile);
      }
      updateMember(dispatch, data, member.username);
      setEdit(null);
    }
    setShowError(true);
  }

  return (
    <div className="editblock-container">
      <div className="eb-left">
        <img
          alt="img"
          src={`/uploads/members/${member.username}/${member.image}`}
        />
        <h4>{member.username}</h4>
        <button
          onClick={() =>
            setEdit(prev => {
              if (prev === "EditMember") {
                return null;
              } else {
                return "EditMember";
              }
            })
          }
        >
          {edit === "EditMember" ? "Cancel" : "Edit Member"}
        </button>
        <button onClick={() => setEdit("SendNotification")}>
          {edit === "SendNotification" ? "Cancel" : "Send Notification"}
        </button>
        <button onClick={handleDeleteMember}>Delete Member</button>
      </div>
      <div className="eb-right">
        <form onSubmit={handleSubmit}>
          <h1>Edit member</h1>
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
