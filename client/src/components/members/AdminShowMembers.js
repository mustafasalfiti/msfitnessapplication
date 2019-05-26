import React from "react";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";
import { fetchMembers } from "../../actions";
import Store from "../../context/store";
import AdminSendNotification from './AdminSendNotification';

export default function AdminShowMembers() {
  const { dispatch, members } = React.useContext(Store);

  React.useEffect(() => {
    fetchMembers(dispatch);
  }, [dispatch]);

  function renderExpiredNumber() {
    let filterd = Object.keys(members).filter(id => {
      return members[id].isExpire === true;
    });

    return filterd.length;
  }
  function renderMembers() {
    if (members !== null) {
      return Object.keys(members).map((id, i) => (
        <tr className={members[id].isExpire ? "isExpire" : ""} key={members[id]._id}>
          <td>{i + 1}</td>
          <td>{members[id].username}</td>
          <td>{members[id].fullname}</td>
          <td>{members[id].phone_number}</td>
          <td>{members[id].address}</td>
          <td>{members[id].expire_date.substring(0, 10)}</td>
          <td>
            <NavLink
              className="td-link"
              to={`/admin/members/${members[id].username}`}
            >
              more info
            </NavLink>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td>Loading</td>
        </tr>
      );
    }
  }
  return (
    <div className="showinfo">
      <header>
        <Navbar />
        <div className="showinfo-block">
          <div className="showinfo-blockinfo">
            <p>Members: {members ? Object.keys(members).length : "Loading"}</p>
            <p>
              Active Members:{" "}
              {members
                ? Object.keys(members).length - renderExpiredNumber()
                : "Loading"}
            </p>
            <p>
              Expired Members: {members ? renderExpiredNumber() : "Loading"}
            </p>
          </div>
          <div className="showinfo-blocklinks">
            <NavLink className="btn" to="/admin/members/create">
              Add Member
            </NavLink>
          </div>
        </div>
      </header>
      <div className="table">
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
