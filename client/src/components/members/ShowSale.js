import React from "react";
import Store from "../../context/store";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";

export default function ShowSale({ history }) {
  const { user } = React.useContext(Store);
  const [sale, setSale] = React.useState(null);
  const id = history.location.pathname.slice(12);

  React.useEffect(() => {
    let index = user.sales.findIndex(sale => sale._id == id);
    if (index !== -1) {
      setSale(user.sales[index]);
    }
  }, [user]);

  function renderProduct() {
    if (sale !== null && sale !== undefined) {
      return (
        <div className="sale-container">
          <div className="sale-buyer">
            <h2 className="title">My Details</h2>
            <img src={`/uploads/members/${user.username}/${user.image}`} />
            <h3>
              Username : <span>{`${user.username}`}</span>
            </h3>
            <h3>
              Fullname : <span>{`${user.fullname}`}</span>
            </h3>
            <h3>
              Address : <span>{`${user.address}`}</span>
            </h3>
            <h3>
              Branch : <span>{`${user.branch}`}</span>
            </h3>
            <h3>
              Phone Number : <span>{`${user.phone_number}`}</span>
            </h3>
          </div>
          <div className="sale-products">
            <h2 className="title">Products Details</h2>

            {(function() {
              return sale.products.map(({ product, quantity }) => (
                <div key={product._id} className="sale-product">
                  <img
                    src={`/uploads/products/${product.image}/${product.image}`}
                  />
                  <div>
                    <h3>
                      Product Name : <span>{product.name}</span>
                    </h3>
                    <h3>
                      Quantity Bought : <span>{quantity}</span>
                    </h3>
                    <h3>
                      Paid Money: <span> {product.price * quantity}€</span>
                    </h3>
                  </div>
                </div>
              ));
            })()}
          </div>
          <div className="sale-info">
            <h2 className="title">Sale Details</h2>
            <h3>
              Order Status : <span className={sale.status}>{sale.status}</span>
            </h3>
            <h3>
              Order Date : <span>{sale.createdDate.substring(0, 10)}</span>
            </h3>
            <h3>
              Total Paid : <span>{sale.cost}€</span>
            </h3>
          </div>
        </div>
      );
    } else {
      return <div>404 There is no Product</div>;
    }
  }
  return (
    <div className="sale">
      <header>
        <Navbar />
      </header>
      {renderProduct()}
    </div>
  );
}
