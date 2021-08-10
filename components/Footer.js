import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <>
      <div className="flex-container">
        <div className="footer_section">
          <Image
            src="/assets/images/dailykit_logo.svg"
            width="50"
            height="60"
            style={{ paddingBottom: "1rem" }}
            alt="footer_logo"
          />
          <p>
            DailyKit is a Meal Kit Technology Platform
            <br />
            Our software suite - recipe management, manufacturing solution,
            sales and marketing platforms and delivery integrations are
            everything that your company needs to grow.
          </p>
        </div>
        <div className="footer_section">
          <h3>ABOUT US</h3>
          <p>
            <a href="/Aboutus/Ourphilosophy"> DailyKit Philosophy</a>
          </p>
        </div>

        <div className="footer_section">
          <h3>START A MEAL KIT BRAND</h3>

          <li>
            <a href="/restaurants/cafes"> QSR & Cafes</a>
          </li>
          <li>
            <a href="/restaurants/fine-dine-restaurants">
              Casual and Fine Dining
            </a>
          </li>
          <li>
            <a href="/cloud_kitchen">Cloud Kitchen</a>
          </li>
          <li>
            <a href="/bakerypage">Bakery</a>
          </li>
        </div>

        <div className="footer_section">
          <h3>Contact us</h3>

          <li>Rishi@dailykit.org</li>

          <li>+13125210704</li>
        </div>
      </div>

      <div className="copyright">
        Copyright © 2021 DailyKit Inc. All Rights Reserved.
      </div>
    </>
  );
};
export default Footer;
