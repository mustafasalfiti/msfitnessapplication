import React from "react";
import Field from "../base/Field";
import Store from "../../context/store";
import { handleProductErrors } from "../../utils/errors";
import { updateProduct } from "../../actions";

export default function AdminEditProduct({
  history,
  product,
  editProduct,
  setEditProduct,
  handleDeleteProduct
}) {
  const [errors, setErrors] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const { dispatch, handleInputState } = React.useContext(Store);
  const [values, setValues] = React.useState({
    name: product.name,
    type: product.type,
    price: product.price,
    amount: product.amount,
    description: product.description,
    image: product.image,
    _id: product._id
  });

  React.useEffect(() => {
    setErrors(handleProductErrors(values));
  }, [values]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      updateProduct(dispatch, values, history);
      setEditProduct(false);
    }
    setShowError(true);
  }
  return (
    <div className="editblock-container">
      <div className="eb-left">
        <img alt={`${product.name}`} src="/1.jpg" />
        <h4>{product.name}</h4>
        <button onClick={() => setEditProduct(!editProduct)}>Edit</button>
        <br />
        <button onClick={handleDeleteProduct}>Delete Product</button>{" "}
      </div>
      <div className="eb-right">
        <form onSubmit={handleSubmit}>
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
            type="file"
            showError={showError}
            errors={errors}
            value={values}
            setValues={setValues}
          />

          <label id="textarealabel">Description : </label>
          <span className="errorText">
            {errors.description && showError ? errors.description : ""}
          </span>
          <br />
          <textarea
            name="description"
            value={values.description}
            setValues={setValues}
            rows="8"
            cols="50"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
