import React from "react";
import Store from "../../context/store";
import Navbar from "../base/Navbar";
import { fetchMember, deleteMember } from "../../actions";
import EditMember from "./EditMember";

export default function AdminShowMember({ history }) {
  const { dispatch, members } = React.useContext(Store);
  const [editMember, setEditMember] = React.useState(false);

  let username = history.location.pathname.slice(15);

  React.useEffect(() => {
    if (members === null) {
      fetchMember(dispatch, username);
    }
  }, []);

  function handleDeleteMember() {
    let promptValue = prompt("Please type 'yes' in order to delete member");
    if (promptValue === "yes") {
      deleteMember(dispatch, username, history);
    }
  }

  function renderMember() {
    if (members !== null) {
      let member = members[username];
      if (!editMember) {
        return (
          <div className="showmember-container">
            <div className="sm-left">
              <img src="/1.jpg" />
              <h4>{member.username}</h4>
              <button onClick={() => setEditMember(!editMember)}>Edit</button>
              <br />
              <button onClick={handleDeleteMember}>Delete Member</button>
            </div>
            <div className="sm-right">
              <p>
                Fullname: <span>{member.fullname}</span>
              </p>
              <p>
                Phone Number: <span>{member.phone_number}</span>
              </p>
              <p>
                Age: <span>{member.birthday}</span>
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
                Registration Date: <span>{member.register_date}</span>
              </p>
              <p>
                Expire Date: <span>{member.expire_date}</span>
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <EditMember
            member={member}
            editMember={editMember}
            setEditMember={setEditMember}
            history={history}
            handleDeleteMember={handleDeleteMember}
          />
        );
      }
    } else {
      return <div>Loading</div>;
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="showmember">{renderMember()}</div>
    </div>
  );
}
