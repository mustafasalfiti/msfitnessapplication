import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import EditUser from "./EditUser";
import ChangePassword from './ChangePassword';

export default function ShowMember() {
  const { user, dispatch } = React.useContext(Store);

  const [edit, setEdit] = React.useState(null);

  function handleClick(event) {
    if (edit === event.target.name) {
      setEdit(null);
    } else {
      setEdit(event.target.name);
    }
  }

  function renderElements() {
    if (edit === "Password") {
      return (
        <ChangePassword
          edit={edit}
          user={user}
          setEdit={setEdit}
          dispatch={dispatch}
        />
      );
    } else if (edit === "EditInformation") {
      return (
        <EditUser
          edit={edit}
          user={user}
          setEdit={setEdit}
          dispatch={dispatch}
        />
      );
    } else if(user.type === 'admin') {
      return (
        <div className="eb-right">
          <p>
            Fullname: <span>{user.fullname}</span>
          </p>
          <p>
            Phone Number: <span>{user.phone_number}</span>
          </p>
          <p>
            Birthday: <span>{user.birthday.substring(0, 10)}</span>
          </p>
          <p>
            Gender: <span>{user.gender}</span>
          </p>
          <p>
            Branch : <span>{user.branch}</span>
          </p>
          <p>
            Address: <span>{user.address}</span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="eb-right">
          <p>
            Fullname: <span>{user.fullname}</span>
          </p>
          <p>
            Phone Number: <span>{user.phone_number}</span>
          </p>
          <p>
            Birthday: <span>{user.birthday.substring(0, 10)}</span>
          </p>
          <p>
            Gender: <span>{user.gender}</span>
          </p>
          <p>
            Branch : <span>{user.branch}</span>
          </p>
          <p>
            Address: <span>{user.address}</span>
          </p>
          <p>
            Registration Date:{" "}
            <span>{user.register_date.substring(0, 10)}</span>
          </p>
          <p>
            Expire Date: <span>{user.expire_date.substring(0, 10)}</span>
          </p>
        </div>
      );
    }
  }

  return (
    <div className="editblock">
      <header>
        <Navbar />
      </header>
      <div className="editblock-container">
        <div className="eb-left">
          <img
            alt="img"
            src={`/uploads/members/${user.username}/${user.image}`}
          />
          <h4>{user.username}</h4>
          <button id="btn_edit" name="EditInformation" onClick={handleClick}>
            {edit === "EditInformation" ? "Cancel" : "Edit Information"}
          </button>
          <button id="btn_edit" name="Password" onClick={handleClick}>
            {edit === "Password" ? "Cancel" : "Change Password"}
          </button>
        </div>
        {renderElements()}
      </div>
    </div>
  );
}
