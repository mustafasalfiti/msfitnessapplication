import React from "react";
import Navbar from "./Navbar";
import { NavLink } from 'react-router-dom';

export default function Members() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="info"> 
        <div className="info-panel">
          <div className="info-panel-info">
            <p>Members: 20</p>
            <p>Active Members: 16</p>
            <p>Expired Members: 4</p>
          </div>
          <NavLink to="/members/create">Add Member</NavLink>
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

          <tbody>
            <tr>
              <td>1</td>
              <td>mmsalfiti</td>
              <td>Mustafa Salfiti</td>
              <td>017651541232</td>
              <td>Berlin</td>
              <td>21 - 5 - 2019</td>
              <td><NavLink to="/members">more info</NavLink></td>
            </tr>

            <tr>
              <td>2</td>
              <td>ibrahimRifae</td>
              <td>Ibrahim Rifae</td>
              <td>052812371223</td>
              <td>Bayern</td>
              <td>23 - 6 - 2019</td>
              <td><NavLink to="/members">more info</NavLink></td>
            </tr>

            <tr>
              <td>3</td>
              <td>badersamme2</td>
              <td>Bader Salfiti</td>
              <td>0109285889127</td>
              <td>Berlin</td>
              <td>11 - 5 - 2019</td>
              <td><NavLink to="/members">more info</NavLink></td>
            </tr>
            </tbody>
        </table>
      
      
      
      </div>
    </div>
  );
}
