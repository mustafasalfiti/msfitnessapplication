import React from "react";
import handleInputState from "../../utils/handleInputState";
import Field from "../base/Field";
import Store from "../../context/store";
import { updateMember } from "../../actions";
import { handleMemberErrors } from "../../utils/errors";

export default function AdminEditMember({
  handleDeleteMember,
  member,
  editMember,
  setEditMember,
  history
}) {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const { dispatch } = React.useContext(Store);

  let { values, handleChange } = handleInputState({
    fullname: member.fullname,
    phone_number: member.phone_number,
    branch: member.branch,
    gender: member.gender,
    address: member.address,
    birthday: member.birthday,
    register_date: member.register_date,
    expire_date: member.expire_date,
    image: member.image
  });

  React.useEffect(() => {
    setErrors(handleMemberErrors(values));
  }, [values]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      values.username = member.username;
      updateMember(dispatch, values, history);
      setEditMember(false);
    }
    setShowError(true);
  }

  return (
    <div className="showmember-container">
      <div className="sm-left">
        <img src="/1.jpg" />
        <h4>{member.username}</h4>
        <button onClick={() => setEditMember(!editMember)}>Edit</button>
        <br />
        <button onClick={handleDeleteMember}>Delete Member</button>
      </div>
      <div className="sm-right" />
      <form onSubmit={handleSubmit}>
        <h1>Add member</h1>
          <Field
            name="fullname"
            placeholder="Fullname"
            label="Fullname"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <Field
            name="branch"
            placeholder="Branch"
            label="Branch"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <Field
            name="address"
            placeholder="Address"
            label="Address"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <Field
            name="register_date"
            label="Register Date"
            type="date"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
          />

          <Field
            name="expire_date"
            label="Expire Date"
            type="date"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
          />
        </div>

        <div className="input-2">
          <Field
            name="image"
            label="Image"
            type="file"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
