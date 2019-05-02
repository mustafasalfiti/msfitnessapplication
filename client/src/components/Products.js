import React from "react";
import Navbar from "./Navbar";
import { NavLink } from 'react-router-dom';

export default function Products() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="info"> 
        <div className="info-panel">
          <div className="info-panel-info">
            <p>Products: 20</p>
            <p>Types: 2</p>
          </div>
          <NavLink to="/admin/products/create">Add Product</NavLink>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Info</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Whey Protein</td>
              <td>Protein</td>
              <td>250$ </td>
              <td>25</td>
              <td><NavLink to="/products">more info</NavLink></td>
            </tr>

            <tr>
              <td>1</td>
              <td>Whey Protein</td>
              <td>Protein</td>
              <td>250$ </td>
              <td>25</td>
              <td><NavLink to="/products">more info</NavLink></td>
            </tr>

            <tr>
              <td>1</td>
              <td>Whey Protein</td>
              <td>Protein</td>
              <td>250$ </td>
              <td>25</td>
              <td><NavLink to="/products">more info</NavLink></td>
            </tr>
            </tbody>
        </table>
      
      
      
      </div>
    </div>
  );
}
