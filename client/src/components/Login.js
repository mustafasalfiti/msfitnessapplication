import React from "react";
import Navbar from "./Navbar";
import handleInputState from '../utils/handleInputState'
import { UserContext } from '../context/UserContext';

export default function Login() {
  
  function handleSubmit(event) {
    event.preventDefault();
    context.loginUser(values);
  }
  const {values , handleChange } = handleInputState({username:'' , password:''})
  const context = React.useContext(UserContext) ;
  
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            value={values.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            value={values.password}   
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
