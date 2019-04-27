import React from "react";
import Navbar from "./Navbar";

export default function Login() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="login">
        <form>
          <h1>Login</h1>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
