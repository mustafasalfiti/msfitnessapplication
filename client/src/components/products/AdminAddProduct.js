import React from "react";
import Navbar from "../base/Navbar";
import Field from "../base/Field";
import Store from "../../context/store";
import { createProduct } from "../../actions";
import { handleProductErrors, imageError } from "../../utils/errors";

export default function AdminAddProduct({ history }) {
  const [errors, setErrors] = React.useState({});
  const [imageFile, setImageFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  const { dispatch } = React.useContext(Store);
  const [values, setValues] = React.useState({
    name: "",
    type: "",
    price: "",
    amount: "",
    description: ""
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
      if (imageFile) {
        // Multer Read req.body only before the image file so put all the request body you want
        // before you put the file 
        data.append('random' , `${1000000 + Math.floor(Math.random() * 9999999)}`)
        data.append("imageFile", imageFile);
      }
      createProduct(dispatch, data, history);
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

          <div className="label-input">
            <label>Description : </label>
            <span className="errorText">
              {errors.description && showError ? errors.description : ""}
            </span>
            <textarea
              name="description"
              value={values.description}
              onChange={event => {
                event.persist();
                setValues(prev => ({
                  ...prev,
                  description: event.target.value
                }));
              }}
              rows="8"
            />
          </div>

          <div className="label-input">
            <label>Image : </label>
            <span className="errorText">
              {fileError && showError ? fileError : ""}
            </span>
            <input type="file" name="image_file" onChange={onImageChange} />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
