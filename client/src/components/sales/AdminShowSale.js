import React from "react";
import Store from "../../context/store";
import { fetchSale , updateSale} from "../../actions";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";

export default function AdminShowSale({ history }) {
  const { sales, dispatch } = React.useContext(Store);

  let id = history.location.pathname.slice(13);

  React.useEffect(() => {
    if (sales === null) {
      fetchSale(dispatch, id);
    }
  }, [sales, dispatch, id]);

  function handleClick(event) {
    event.persist();
    if(event.target.name === sales[id].status) {
      return alert(`Its Already ${event.target.name}`);
    }
    let data = {
      status:event.target.name
    };
    updateSale(dispatch , data , id);
  }
  function renderProduct() {
    if (sales !== null) {
      let sale = sales[id];
      return (
        <div className="sale-container">
          <div className="sale-buyer">
            <h2 className="title">Buyer Details</h2>
            <img
              src={`/uploads/members/${sale.buyer.username}/${
                sale.buyer.image
              }`}
            />
            <h3>
              Username :{" "}
              <NavLink to={`/admin/members/${sale.buyer.username}`}>{`${
                sale.buyer.username
              }`}</NavLink>
            </h3>
            <h3>
              Fullname : <span>{`${sale.buyer.fullname}`}</span>{" "}
            </h3>
            <h3>
              Address : <span>{`${sale.buyer.address}`}</span>{" "}
            </h3>
            <h3>
              Branch : <span>{`${sale.buyer.branch}`}</span>{" "}
            </h3>
            <h3>
              Phone Number : <span>{`${sale.buyer.phone_number}`}</span>
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
                      Product Name :{" "}
                      <NavLink to={`/admin/products/${product._id}`}>{`${
                        product.name
                      }`}</NavLink>
                    </h3>
                    <h3>
                      Quantity Sold : <span>{quantity}</span>
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
              Sale Status : <span className={sale.status}>{sale.status}</span>
            </h3>
            <h3>
              Sale Date : <span>{sale.createdDate.substring(0, 10)}</span>
            </h3>
            <h3>
              Total Paid : <span>{sale.cost}€</span>
            </h3>
            <button name="Shipped" onClick={handleClick} className="btn-primary btn-blue">Mark as Shipped</button>
            <button name="Recieved" onClick={handleClick} className="btn-primary btn-blue">Mark as Recieved</button>
          </div>
        </div>
      );
    } else return <div> Loading</div>;
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
