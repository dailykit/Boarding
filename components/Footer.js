import React from "react";
import Image from "next/image";
import { FacebookIcon, SearchIcon, LinkedIn } from "/assets/icons";
const Footer = () => {
  return (
    <div style={{ background: "#111B2B", color: "#fff", height: "400px" }}>
      <div className="container flex-container" style={{ flexDirection: "row" }}>
        <div className="row">
          <div className="col-md-12 col-sm-12" style={{ margin: "60px 0 -40px 0" }}>
            <Image
              src="/assets/images/Logo.png"
              width="170"
              height="45"
              style={{ paddingBottom: "1rem" }}
              alt="footer_logo"
            /></div>
        </div></div>
      <div className="container" style={{ flexDirection: "row", marginBottom: "40px" }} >
        <div className="row">
          <h5 className="col-md-2 col-sm-8 footer-links">
            About Us
          </h5>
          <h5 className="col-md-3 col-sm-8 footer-links">
            Terms & Conditions
          </h5>
          <h5 className="col-md-2 col-sm-8 footer-links">
            Privacy Policy
          </h5>
          <h5 className="col-md-3 col-sm-8 footer-links">
            Refund & Cancellation
          </h5>
          <h5 className="col-md-2 col-sm-8 footer-links">
            Contact us
          </h5>
        </div>
      </div>
      <div className="container flex-container" style={{ flexDirection: "row", marginBottom: "80px" }}>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <FacebookIcon /> &nbsp; &nbsp;<SearchIcon /> &nbsp; &nbsp;<LinkedIn />
          </div>
        </div>

      </div>
      <div className="copyright">
        Copyright © 2021 DailyKit Inc. All Rights Reserved.
      </div>
    </div>
  );
};
export default Footer;
