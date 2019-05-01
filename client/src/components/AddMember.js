import React from "react";
import Navbar from "./Navbar";
import handleInputState from "../utils/handleInputState";
import Field  from "./Field";
import axios from 'axios';

export default function Addmember({history}) {
  const [errors, setErrors] = React.useState({});
  const [showError , setShowError]= React.useState(false);
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      const response = await axios.post('/auth/members' , values);
      if(response.status === 200) {
        history.push('/members');
      }
      console.log(response);
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
    setErrors(handleErrors(values));
  }, [values]);

  function handleErrors(values) {
    let errors = {};
    if (values.username === "") {
      errors.username = "Please Enter a Username";
    }
    if (values.fullname === "") {
      errors.fullname = "Please Enter a Fullname";
    }
    if (values.phone_number === "") {
      errors.phone_number = "please enter a phone number";
    }
    if (values.branch === "") {
      errors.branch = "Please enter a branch";
    }
    if (values.gender === "") {
      errors.gender = "please Enter a gender";
    }
    if (values.address === "") {
      errors.address = "please Enter a address";
    }
    if (values.birthday === "") {
      errors.birthday = "please Enter a birthday";
    }
    if (values.register_date === "") {
      errors.register_date = "please Enter a register_date";
    }

    if (values.expire_date === "") {
      errors.expire_date = "please Enter a expire_date";
    }

    if (values.password === "") {
      errors.password = "please Enter a password";
    }
    return errors;
  }

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
