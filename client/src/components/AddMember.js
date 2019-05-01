import React from "react";
import Navbar from "./Navbar";
import handleInputState from "../utils/handleInputState";
import Field from "./Field";

export default function Addmember() {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  function handleSubmit(event) {
    if (Object.keys(errors).length === 0) {
      console.log("hello from inside");
      console.log(values);
    }
    setShowError(true);
    event.preventDefault();
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
            <div className="label-input">
              <label>Fullname : </label>
              <span className="errorText">
                {errors.fullname && showError ? errors.fullname : ""}
              </span>

              <input
                className={errors.fullname && showError ? "input-error" : ""}
                value={values.fullname}
                type="text"
                name="fullname"
                placeholder="Fullname"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Phone Number : </label>
              <span className="errorText">
                {errors.phone_number && showError ? errors.phone_number : ""}
              </span>

              <input
                className={
                  errors.phone_number && showError ? "input-error" : ""
                }
                value={values.phone_number}
                type="text"
                name="phone_number"
                placeholder="Phone number"
                onChange={handleChange}
              />
            </div>

            <div className="label-input">
              <label>Branch : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.branch && showError ? "input-error" : ""}
                value={values.branch}
                type="text"
                name="branch"
                placeholder="Branch"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Gender : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.gender && showError ? "input-error" : ""}
                value={values.gender}
                type="text"
                name="gender"
                placeholder="Gender"
                onChange={handleChange}
              />
            </div>

            <div className="label-input">
              <label>Address : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.address && showError ? "input-error" : ""}
                value={values.address}
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Birthday : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.birthday && showError ? "input-error" : ""}
                value={values.birthday}
                type="date"
                name="birthday"
                onChange={handleChange}
              />
            </div>

            <div className="label-input">
              <label>Register Date : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={
                  errors.register_date && showError ? "input-error" : ""
                }
                value={values.register_date}
                type="date"
                name="register_date"
                onChange={handleChange}
              />
            </div>

            <div className="label-input">
              <label>Expire Date : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.expire_date && showError ? "input-error" : ""}
                value={values.expire_date}
                type="date"
                name="expire_date"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Password : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.password && showError ? "input-error" : ""}
                value={values.password}
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>

            <div className="label-input">
              <label>Image : </label>
              <span className="errorText">
                {errors.username && showError ? errors.username : ""}
              </span>

              <input
                className={errors.image ? "input-error" : ""}
                value={values.image}
                type="file"
                onChange={handleChange}
                name="image"
              />
            </div>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
