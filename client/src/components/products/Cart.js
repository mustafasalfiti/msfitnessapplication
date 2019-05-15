import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";

export default function Cart() {
  const { user, products, dispatch } = React.useContext(Store);
  console.log(user);
  function renderCartElemets() {
    return user.cart.map(product => (
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
        <td>{product.price}€</td>
        <td>{product.type}</td>

      </tr>
    ));
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
              </tr>
            </thead>
            <tbody>{renderCartElemets()}</tbody>
          </table>
        </div>
        <div className="cart-summary">Summary</div>
      </div>
    </div>
  );
}
