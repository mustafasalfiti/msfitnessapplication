import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import { updateUser } from "../../actions";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default function Cart() {
  const { user, products, dispatch } = React.useContext(Store);
  const [total, setTotal] = React.useState(0);
  function increaseQuantity(event) {
    let data = {
      request: "cart",
      target: "increaseQuantity",
      productId: event.target.name
    };
    updateUser(dispatch, data, user.username);
  }
  function decreaseQuantity(event) {
    let data = {
      request: "cart",
      target: "decreaseQuantity",
      productId: event.target.name
    };
    updateUser(dispatch, data, user.username);
  }

  async function handleToken(token) {
    const data = {
      token ,
      amount:total * 100
    }
    const response = await axios.post('/products/charge' , data);
    console.log(response);
  }
  React.useEffect(() => {
    let result = 0;
    user.cart.forEach(({ product, quantity }) => {
      result += product.price * quantity;
    });
    setTotal(result);
  }, [user]);
  function renderCartElemets() {
    return user.cart.map(({ product, quantity }) => (
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
        <td>
          <div>
            <input
              onClick={increaseQuantity}
              name={product._id}
              className="cart_submit"
              type="Submit"
              value="+"
              readOnly
            />
            <span className="cart_quantity">{quantity}</span>
            <input
              onClick={decreaseQuantity}
              name={product._id}
              className="cart_submit"
              type="Submit"
              value="-"
              readOnly
            />
          </div>
        </td>
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
        <div className="cart-summary">
          <StripeCheckout
            stripeKey={process.env.REACT_APP_PK_STRIPE}
            amount={total * 100}
            locale="auto"
            name="MSfitness Studio"
            currency="EUR"
            token={token => handleToken(token)}
            email="payments@MSfitness.com"
          >
            <button className="btn btn-primary">Checkout</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}
