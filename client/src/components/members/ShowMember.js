import React from "react";
import Navbar from "../base/Navbar";

export default function ShowMember() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="showmember">
        <div className="showmember-container">
          <div className="sm-left">
            <img src="1.jpg" />
            <h4>mmsalfiti</h4>
            <button>Edit</button>
            <br />
            <button>Delete Member</button>
          </div>
          <div className="sm-right">
            <p>
              Fullname: <span>Mustafa Salfiti</span>
            </p>
            <p>
              Phone Number: <span>052123871823</span>
            </p>
            <p>
              Age: <span>22</span>
            </p>
            <p>
              Gender: <span>Male</span>
            </p>
            <p>
              Branch : <span>Berlin</span>
            </p>
            <p>
              Address: <span>Krusstr .12 , 51235 Berlin</span>
            </p>
            <p>
              Registration Date: <span>12-2-2019</span>
            </p>
            <p>
              Expire Date: <span>12-2-2019</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
