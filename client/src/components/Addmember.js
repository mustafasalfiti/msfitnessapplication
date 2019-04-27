import React from "react";
import Navbar from "./Navbar";

export default function Addmember() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="addmember">
        <form>
          <h1>Add member</h1>
          <div className="input-2">
            <div className="label-input">
              <label>Username : </label>
              <input type="text" name="username" placeholder="username" />
            </div>

            <div className="label-input">
              <label>Fullname : </label>
              <input type="text" name="fullname" placeholder="Fullname" />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Phone Number : </label>
              <input type="text" name="phone_number" placeholder="phone number" />
            </div>

            <div className="label-input">
              <label>Branch : </label>
              <input type="text" name="branch" placeholder="branch" />
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Register Date : </label>
              <input type="date" name="register_date" />
            </div>

            <div className="label-input">
              <label>Expire Date : </label>
              <input type="date" name="expire_date"/>
            </div>
          </div>

          <div className="input-2">
            <div className="label-input">
              <label>Password : </label>
              <input type="password" name="password" placeholder="password" />
            </div>

            <div className="label-input">
              <label>Image : </label>
              <input type="file" name="image"/>
            </div>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
