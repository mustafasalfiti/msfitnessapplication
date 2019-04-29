import React from "react";
import Navbar from "./Navbar";
import { NavLink } from 'react-router-dom';

export default function ShowProduct() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
    <div className="showproducts">
    <div className="title">
      <h2>Our Products for the best Prices!</h2>
    </div>

      <div className="sp-container">
        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>


        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>
        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>

        <div className="sp-box">
          <img src="../1.jpg" />
          <p>Whey Protein</p>
          <NavLink to="#">more info</NavLink>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  
    </div>
  );
}
