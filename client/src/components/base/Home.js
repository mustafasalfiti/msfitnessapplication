import React from "react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
        <div className="intro">
          <div className="intro-info">
            <h3>Only 20€ Per Month , Join our family now !</h3>
            <a className="btn" href="/">
              more info
            </a>
          </div>
          <div className="intro-images">
            <img src="1.jpg" alt="gym-1" />
            <img src="2.jpg" alt="gym-2" />
            <img src="3.jpg" alt="gym-3" />
          </div>
        </div>
      </header>

      <section className="courses">
        <h2>
          We Have our 20 courses included in our membership pay once and enjoy
          the everything{" "}
        </h2>
        <div className="row">
          <div className="info">
            <div className="img-1" />
            <div className="info-text">
              <h3>Discover our Courses for Members </h3>
              <a className="btn" href="/">
                more info
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>
          You Moved away no problem we got your back there is over 40 branch
          spreaded around germany just for you
        </h2>
        <div className="row">
          <div className="info">
            <div className="img-2" />
            <div className="info-text">
              <h3>We Have 40 branches spreaded around Germany </h3>
              <a className="btn" href="/">
                more info
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="social-media">
          <h3>Social Media</h3>
          <i className="fab fa-instagram" />
          <i className="fab fa-facebook" />
          <i className="fab fa-twitter" />
        </div>
        <h6>All Copyright reserved ! </h6>
        <div className="footer-address">
          <h2>MS Fitness</h2>
          <p>Kurzestr .24</p>
          <p>45156 Berlin</p>
          <p>Germany</p>
        </div>
      </footer>
    </div>
  );
}
