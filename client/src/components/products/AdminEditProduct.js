import React from "react";
import Field from "../base/Field";
import Store from "../../context/store";
import { handleProductErrors, imageError } from "../../utils/errors";
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
  const [imageFile, setImageFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(null);
  const { dispatch } = React.useContext(Store);
  const [values, setValues] = React.useState({
    name: product.name,
    type: product.type,
    price: product.price,
    amount: product.amount,
    description: product.description
  });

  React.useEffect(() => {
    setErrors(handleProductErrors(values));
  }, [values]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length === 0 && fileError === null) {
      const data = new FormData();
      Object.keys(values).forEach(key => {
        data.append(key, values[key]);
      });
      if (product.image) {
        data.append("image", product.image);
      } else {
        data.append('random' , `${1000000 + Math.floor(Math.random() * 9999999)}`)      }
      if (imageFile) {
        data.append("imageFile", imageFile);
      }

      updateProduct(dispatch, data, product._id, history);
      setEditProduct(false);
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
  return (
    <div className="editblock-container">
      <div className="eb-left">
        <img
          alt={`${product.name}`}
          src={`/uploads/products/${product.image}/${product.image}`}
        />
        <h4>{product.name}</h4>
        <button className="btn-primary btn-edit" onClick={() => setEditProduct(!editProduct)}>{editProduct ? 'Cancel' : 'Edit'}</button>
        <button className="btn-primary btn-danger" onClick={handleDeleteProduct}>Delete Product</button>{" "}
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

          <div className="label-input">
            <label>Image : </label>
            <span className="errorText">
              {fileError && showError ? fileError : ""}
            </span>
            <input type="file" name="image_file" onChange={onImageChange} />
          </div>

          <label id="textarealabel">Description : </label>
          <span className="errorText">
            {errors.description && showError ? errors.description : ""}
          </span>
          <br />
          <textarea
            name="description"
            value={values.description}
            onChange={event => {
              event.persist();
              setValues(prev => ({ ...prev, description: event.target.value }));
            }}
            rows="8"
            cols="50"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
