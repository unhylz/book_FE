// Header.js
import React from "react";
import Footer_logo from "../../../../assets/logos/Footer_logo.svg";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo">
          <img src={Footer_logo} alt="BSL_logo" />
        </div>
        <div className="page-info">
          <h3 className="info">Information</h3>
          <p className="detail">Phone: 123-456-7898</p>
          <p className="detail">Email: sentiment@gmail.com</p>
          <p className="detail">Fax: 123456</p>
          <p className="detail">
            Copyright @ Book Sentiment League All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
