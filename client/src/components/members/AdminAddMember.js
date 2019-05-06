import React from "react";
import Navbar from "../base/Navbar";
import handleInputState from "../../utils/handleInputState";
import Field  from "../base/Field";
import Store from '../../context/store';
import { createMember } from '../../actions';
import  {handleMemberErrors} from '../../utils/errors'

export default function AdminAddMember({history}) {
  const [errors, setErrors] = React.useState({});
  const [showError , setShowError]= React.useState(false);
  const {dispatch} = React.useContext(Store);


  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      createMember(dispatch , values , history)
    }
    setShowError(true);
  }

  let { values, handleChange } = handleInputState({
    username: "",
    fullname: "",
    phone_number: "",
    branch: "",
    gender: "",
    address: "",
    birthday: "",
    register_date: "",
    expire_date: "",
    password: "",
    image: ""
  });

  React.useEffect(() => {
    setErrors(handleMemberErrors(values));
  }, [values]);


  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="addmember">
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
              onChange={handleChange}
            />
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
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              showError={showError}
              errors={errors}
              value={values}
              onChange={handleChange}
            />

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
    </div>
  );
}
