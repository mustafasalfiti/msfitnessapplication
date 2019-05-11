import React from "react";
import Navbar from "../base/Navbar";
import Field from "../base/Field";
import Store from '../../context/store';
import { createProduct } from '../../actions';
import {handleProductErrors} from '../../utils/errors' ;

export default function AdminAddProduct({ history }) {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const {dispatch} = React.useContext(Store);
  const [values, setValues] = React.useState({
    name: "",
    type: "",
    price: "",
    amount: "",
    description: "",
    image: ""
  });



  React.useEffect(() => {
    setErrors(handleProductErrors(values));
  }, [values]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      createProduct(dispatch  ,values , history)
    }
    setShowError(true);
  }
  return (
    <div className="addblock">
      <header>
        <Navbar />
      </header>
      <div className="addblock-container">
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
              setValues={setValues}
            />

            <Field
              name="type"
              placeholder="Type"
              label="Type"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
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
              setValues={setValues}
            />
            <Field
              name="amount"
              placeholder="Amount"
              label="Amount"
              type="text"
              showError={showError}
              errors={errors}
              value={values}
              setValues={setValues}
            />
          </div>

          <Field
            name="image"
            label="Image"
            type="text"
            showError={showError}
            errors={errors}
            value={values}
            setValues={setValues}
            />

          <div className="label-input">
            <label>Description : </label>
            <span className="errorText">
              {errors.description && showError ? errors.description : ""}
            </span>
            <textarea
              name="description"
              value={values.description}
              setValues={setValues}
              rows="8"
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
