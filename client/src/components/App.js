import React from "react";
import Store from "../context/store";
import reducer from "../reducers";
import { fetchUser } from "../actions";
import RenderRoutes from './base/RenderRoutes';

export default function App() {
  // To Render Page!!
  const [isDone, setIsDone] = React.useState(false);

  setTimeout(() => {
    setIsDone(true);
  }, 100);

  const [store, dispatch] = React.useReducer(reducer, {
    user: null,
    products: null,
    members: null
  });
  const { members, products, user } = store;

  React.useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <div>
      <Store.Provider value={{ products, members, user, dispatch }}>
        {isDone ? <RenderRoutes /> : ""}
      </Store.Provider>
    </div>
  );
}
