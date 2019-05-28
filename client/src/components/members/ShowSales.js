import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import { NavLink } from "react-router-dom";

export default function ShowSales() {
  const { user } = React.useContext(Store);

  function renderSales() {
    return user.sales.map((sale, i) => (
      <tr key={sale._id}>
        <td>{i + 1}</td>
        <td className={sale.status}>{sale.status}</td>
        <td>{sale.products.length}</td>
        <td>{sale.cost} €</td>
        <td>{sale.createdDate.substring(0, 10)}</td>
        <td>
          <NavLink className="td-link" to={`/myproducts/${sale._id}`}>
            more info
          </NavLink>
        </td>
      </tr>
    ));
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
