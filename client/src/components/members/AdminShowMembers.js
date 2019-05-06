import React from "react";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";
import { fetchMembers } from "../../actions";
import Store from "../../context/store";

export default function AdminShowMembers() {
  const { dispatch, members } = React.useContext(Store);

  React.useEffect(() => {
    fetchMembers(dispatch);
  }, []);

  function renderMembers() {
    if (members !== null) {
      return Object.keys(members).map((id, i) => (
        <tr key={members[id]._id}>
          <td>{i + 1}</td>
          <td>{members[id].username}</td>
          <td>{members[id].fullname}</td>
          <td>{members[id].phone_number}</td>
          <td>{members[id].address}</td>
          <td>{members[id].expire_date}</td>
          <td>
            <NavLink to={`/admin/members/${members[id].username}`}>
              more info
            </NavLink>
          </td>
        </tr>
      ));
    } else {
      return <tr><td>Loading</td></tr>;
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="info">
        <div className="info-panel">
          <div className="info-panel-info">
            <p>Members: {members ? members.length : "Loading"}</p>
            <p>Active Members: {members ? members.length : "Loading"}</p>
            <p>Expired Members: {members ? members.length : "Loading"}</p>
          </div>
          <NavLink to="/admin/members/create">Add Member</NavLink>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Branch</th>
              <th>Expire Date</th>
              <th>Info</th>
            </tr>
          </thead>

          <tbody>{renderMembers()}</tbody>
        </table>
      </div>
    </div>
  );
}
