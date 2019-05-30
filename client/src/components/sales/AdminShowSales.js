import React from "react";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";
import Store from "../../context/store";
import { fetchSales } from "../../actions";

export default function AdminShowSales() {
  const { sales, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    fetchSales(dispatch);
  }, [dispatch]);

  function renderSales() {
    if (sales !== null) {
      return Object.keys(sales).map((id, i) => (
        <tr className={sales[id].amount <= 0 ? "isExpire" : ""} key={id}>
          <td>{i + 1}</td>
          <td>{sales[id].buyer.fullname}</td>
          <td>{sales[id].buyer.username} </td>
          <td className={sales[id].status}>{sales[id].status}</td>
          <td>{sales[id].products.length}</td>
          <td>{sales[id].cost} €</td>
          <td>{sales[id].createdDate.substring(0, 10)}</td>
          <td>
            <NavLink className="td-link" to={`/admin/sales/${sales[id]._id}`}>
              more info
            </NavLink>
          </td>
        </tr>
      ));
    } else
      return (
        <tr>
          <td>Loading</td>
        </tr>
      );
  }
  return (
    <div className="showinfo">
      <header>
        <Navbar />
        <div className="showinfo-block">
          <div className="showinfo-blockinfo" />
        </div>
      </header>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Buyer Name</th>
              <th>Buyer Username</th>
              <th>Status</th>
              <th>Product Bought</th>
              <th>Paid</th>
              <th>Date</th>
              <th>more info</th>
            </tr>
          </thead>
          <tbody>{renderSales()}</tbody>
        </table>
      </div>
    </div>
  );
}
