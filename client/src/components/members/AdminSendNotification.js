import React from "react";
import { updateMember } from "../../actions";

export default function AdminSendNotification({
  handleDeleteMember,
  member,
  edit,
  setEdit,
  dispatch ,
}) {
  const [notification, setNotification] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (notification.length <= 7) {
      return alert("You Must at least write more than 2 words");
    } else {
      const data ={
        request:"send_notificaton" ,
        notification
      }
      updateMember(dispatch, data, member.username);
      alert('Notification Sent!!');
      setEdit(null)
    }
  }
  return (
    <div className="editblock-container">
      <div className="eb-left">
        <img
          alt="img"
          src={`/uploads/members/${member.username}/${member.image}`}
        />
        <h4>{member.username}</h4>
        <button onClick={() => setEdit("EditMember")}>
          {edit === "EditMember" ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={() =>
            setEdit(prev => {
              if (prev === "SendNotification") {
                return null;
              } else {
                return "SendNotification";
              }
            })
          }
        >
          {edit === "SendNotification" ? "Cancel" : "SendNotification"}
        </button>
        <button onClick={handleDeleteMember}>Delete Member</button>
      </div>
      <div className="eb-right">
        <form onSubmit={handleSubmit}>
          <div className="label-input">
          <label>Send Notification : </label>
            <input type="text" name="image_file" onChange={(e)=>setNotification(e.target.value)} />
          </div>
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}
