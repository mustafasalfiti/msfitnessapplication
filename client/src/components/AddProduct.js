import React from "react";
import Navbar from "./Navbar";

export default function Addproduct() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="addmember">
        <form>
          <h1>Add Product</h1>
          <div className="input-2">
          <div className="label-input">
              <label>Name : </label>
              <input type="text" name="fullname" placeholder="Fullname" />
            </div>

            <div className="label-input">
              <label>Type : </label>
              <input type="text" name="type" placeholder="type" />
            </div>
          </div>

          <div className="input-2">
          <div className="label-input">
              <label>Price : </label>
              <input type="text" name="Price" placeholder="Price" />
            </div>

            <div className="label-input">
              <label>Amount : </label>
              <input type="text" name="amount" placeholder="Amount"/>
            </div>
          </div>
           

          
            <div className="label-input">
              <label>Image : </label>
              <input type="file" name="image"/>
            </div>

            <div className="label-input">
              <label>Description : </label>
              <textarea rows="8"></textarea>
            </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
