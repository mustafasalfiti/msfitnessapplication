import React from "react";
import Store from "../../context/store";
import Navbar from "./Navbar";
import { updateUser } from "../../actions";
export default function Notification() {
  const { user, dispatch } = React.useContext(Store);

  function handleClick(event) {
    event.persist();
    let answer = prompt("if you really want to remove it type yes");
    if (answer === "yes") {
        
      let data = {
        request:"delete_notification" ,
        noti_id:event.target.name
      };
      updateUser(dispatch , data , user.username);
    }
  }
  return (
    <div className="notification">
      <header>
        <Navbar />
      </header>
      <div className="notification-container">
        <h2 className="title">My Notifications</h2>
        {(function() {
          if (user.notifications.length <= 0 || !user.notifications) {
            return (
              <div className="notification-content">
                You dont have Any Notifications!!
              </div>
            );
          } else {
            return user.notifications.map(notification => {
              return (
                <div
                  key={notification._id}
                  className="notification-content"
                >
                  <p>{notification.message}</p>
                  <p>{notification.createdDate.substring(0, 10)}</p>
                  <button
                    name={notification._id}
                    onClick={handleClick}
                    className="btn btn-notification"
                  >
                    X
                  </button>
                </div>
              );
            });
          }
        })()}
      </div>
    </div>
  );
}
