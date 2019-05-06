import React from "react";
import Navbar from "../base/Navbar";
import handleInputState from '../../utils/handleInputState'
import Store from '../../context/store';

export default function Login() {
  
  function handleSubmit(event) {
    event.preventDefault();
    loginUser(dispatch , values);
  }
  const {values , handleChange } = handleInputState({username:'' , password:''})
  const {loginUser , dispatch} = React.useContext(Store) ;
  
  return (
    <div className="login">
      <header>
        <Navbar />
      </header>
      <div className="login-container">
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
