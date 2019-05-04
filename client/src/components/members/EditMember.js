import React from "react";

export default function EditMember({
  handleDeleteMember,
  member,
  editMember,
  setEditMember,
  history
}) {
  return (
    <div className="showmember-container">
      <div className="sm-left">
        <img src="/1.jpg" />
        <h4>{member.username}</h4>
        <button onClick={() => setEditMember(!editMember)}>Edit</button>
        <br />
        <button onClick={handleDeleteMember}>Delete Member</button>
      </div>
      <div className="sm-right" />
      hello
    </div>
  );
}
