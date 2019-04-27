import React from "react";
import { BrowserRouter , Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Addmember from './Addmember';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/members/create" component={Addmember} />
      </BrowserRouter>
    </div>
  );
}
