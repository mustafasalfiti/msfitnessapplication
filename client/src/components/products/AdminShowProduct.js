import React from "react";
import Store from "../../context/store";
import { fetchProduct, deleteProduct } from "../../actions";
import Navbar from "../base/Navbar";
import EditProduct from "./EditProduct";

export default function AdminShowProduct({ history }) {
  const { products, dispatch } = React.useContext(Store);
  const [editProduct, setEditProduct] = React.useState(false);

  let id = history.location.pathname.slice(16);

  React.useEffect(() => {
    if (products === null) {
      fetchProduct(dispatch, id);
    }
  }, []);

  function handleDeleteProduct() {
    let promptValue = prompt("Please type 'yes' in order to delete product");
    if (promptValue === "yes") {
      deleteProduct(dispatch, id, history);
    }
  }
  function renderProduct() {
    if (products !== null) {
      let product = products[id];
      if (!editProduct) {
        return (
          <div className="showmember-container">
            <div className="sm-left">
              <img alt={`${product.name}`} src="/1.jpg" />
              <h4>{product.name}</h4>
              <button onClick={() => setEditProduct(!editProduct)}>Edit</button>
              <br />
              <button onClick={handleDeleteProduct}>Delete Product</button>
            </div>
            <div className="sm-right">
              <p>
                Name: <span>{product.name}</span>
              </p>
              <p>
                Type: <span>{product.type}</span>
              </p>
              <p>
                Price: <span>{product.price}</span>
              </p>
              <p>
                Amount: <span>{product.amount}</span>
              </p>
              <p>
                description : <span>{product.description}</span>
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <EditProduct
            setEditProduct={setEditProduct}
            editProduct={editProduct}
            product={product}
            history={history}
            handleDeleteProduct={handleDeleteProduct}
          />
        );
      }
    } else {
      return <div>Loading</div>;
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="showmember">{renderProduct()}</div>
    </div>
  );
}
