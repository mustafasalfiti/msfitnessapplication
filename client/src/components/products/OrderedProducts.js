import React from "react";
import Store from "../../context/store";
import Navbar from "../base/Navbar";
import { updateUser } from "../../actions";

export default function OrderedProducts() {
  const { user, dispatch } = React.useContext(Store);


  function renderCartElemets() {
    if (user.ordered_products.length > 0) {
      return user.ordered_products.map(
        ({ createdDate, status, product, quantity }) => {
          if (product.amount > 0) {
            return (
              <tr key={product._id}>
                <td className="item">
                  <img
                    alt={product._id}
                    src={`/uploads/products/${product.image}/${product.image}`}
                  />
                  <div className="product-infomartion">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                </td>
                <td>{product.price * quantity}€</td>
                <td>{quantity}</td>
                <td>{status}</td>
                <td>{createdDate.substring(0 , 10)}</td>
              </tr>
            );
          }
        }
      );
    } else {
     return <tr>You have not ordered any product from our online store</tr>
    }
  }
  return (
    <div className="cart">
      <header>
        <Navbar />
      </header>
      <div className="row cart-container">
        <div className="cart-products">
          <table>
            <thead>
              <tr>
                <th className="item">Item(s)</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>{renderCartElemets()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
