import React from "react";
import Store from "../../context/store";
import Navbar from "../base/Navbar";
import { fetchMember, deleteMember } from "../../actions";
import AdminEditMember from "./AdminEditMember";
import AdminSendNotification from "./AdminSendNotification";

export default function AdminShowMember({ history }) {
  const { dispatch, members } = React.useContext(Store);
  const [edit, setEdit] = React.useState(null);

  let username = history.location.pathname.slice(15);
  React.useEffect(() => {
    if (members === null || !members[username]) {
      fetchMember(dispatch, username);
    }
  }, [dispatch , username]);

  function handleDeleteMember() {
    let promptValue = prompt("Please type 'yes' in order to delete member");
    if (promptValue === "yes") {
      deleteMember(dispatch, username, history);
    }
  }

  function renderMember() {
    if (members !== null) {
      let member = members[username];
      if (member) {
        if (edit === null) {
          return (
            <div className="editblock-container">
              <div className="eb-left">
                <img
                  alt="img"
                  src={`/uploads/members/${member.username}/${member.image}`}
                />
                <h4>{member.username}</h4>
                <button
                  className="btn-primary btn-edit"
                  onClick={() => setEdit("EditMember")}
                >
                  Edit
                </button>
                <button
                  className="btn-primary btn-blue"
                  onClick={() => setEdit("SendNotification")}
                >
                  Send Notification
                </button>
                <button
                  className="btn-primary btn-danger"
                  onClick={handleDeleteMember}
                >
                  Delete Member
                </button>
              </div>
              <div className="eb-right">
                <p>
                  Fullname: <span>{member.fullname}</span>
                </p>
                <p>
                  Phone Number: <span>{member.phone_number}</span>
                </p>
                <p>
                  Birthday: <span>{member.birthday.substring(0, 10)}</span>
                </p>
                <p>
                  Gender: <span>{member.gender}</span>
                </p>
                <p>
                  Branch : <span>{member.branch}</span>
                </p>
                <p>
                  Address: <span>{member.address}</span>
                </p>
                <p>
                  Registration Date:{" "}
                  <span>{member.register_date.substring(0, 10)}</span>
                </p>
                <p>
                  Expire Date:{" "}
                  <span>{member.expire_date.substring(0, 10)}</span>
                </p>
              </div>
            </div>
          );
        }
      } else if (edit === "EditMember") {
        return (
          <AdminEditMember
            member={member}
            edit={edit}
            setEdit={setEdit}
            history={history}
            handleDeleteMember={handleDeleteMember}
          />
        );
      } else if (edit === "SendNotification") {
        return (
          <AdminSendNotification
            member={member}
            edit={edit}
            setEdit={setEdit}
            history={history}
            dispatch={dispatch}
            handleDeleteMember={handleDeleteMember}
          />
        );
      }
    } else {
      return <div>Loading</div>;
    }
  }
  return (
    <div className="editblock">
      <header>
        <Navbar />
      </header>
      <div>{renderMember()}</div>
    </div>
  );
}
