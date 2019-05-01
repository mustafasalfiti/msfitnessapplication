import React from "react";
import Navbar from "./Navbar";
import handleInputState from "../utils/handleInputState";
import Field from "./Field";
import axios from "axios";

export default function Addproduct({ history }) {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);

  let { values, handleChange } = handleInputState({
    name: "",
    type: "",
    price: "",
    amount: "",
    description: "",
    image: ""
  });

  function handleErrors(values) {
    let errors = {};
    if (values.name === "") {
      errors.name = "Please Enter a name";
    }
    if (values.amount === "") {
      errors.amount = "Please Enter a amount";
    }
    if (values.type === "") {
      errors.type = "please enter a type";
    }
    if (values.price === "") {
      errors.price = "Please enter a price";
    }
    if (values.description === "") {
      errors.description = "please Enter a description";
    }
    return errors;
  }

  React.useEffect(() => {
    setErrors(handleErrors(values));
  }, [values]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      // const response = await axios.post("/auth/members", values);
      console.log('hellaa')
      // if (response.status === 200) {
      //   // history.push("/members");
      // }
    }
    setShowError(true);
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="addmember">
        <form onSubmit={handleSubmit}>
          <h1>Add Product</h1>
          <div className="input-2">
            <Field
              name="name"
              placeholder="Name"
              label="Name"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              onChange={handleChange}
            />

            <Field
              name="type"
              placeholder="Type"
              label="Type"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              onChange={handleChange}
            />
          </div>

          <div className="input-2">
            <Field
              name="price"
              placeholder="Price"
              label="Price"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              onChange={handleChange}
            />
            <Field
              name="amount"
              placeholder="Amount"
              label="Amount"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              onChange={handleChange}
            />
          </div>

          <Field
            name="image"
            label="Image"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            onChange={handleChange}
          />

          <div className="label-input">
            <label>Description : </label>
            <span className="errorText">
              {errors.description && showError ? errors.description : ""}
            </span>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows="8"
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
