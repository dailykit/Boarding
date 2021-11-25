import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Styles } from "../../sections/Header/styled";

export const CompleteSignup = () => {
  const location = useRouter();
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered mt-4" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Complete your Signup
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div class="container-fluid">
                <div class="row justify-content-center">
                  <div class="col-md-6 ml-auto"><Image width="300px"
                    height="300px"
                    src='/assets/images/LoginPage.png'
                    alt="login-page" /></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Styles.ghostButton style={{
                background: "#111b2b",
                color: "white", display: "inline", paddingRight: "1.3rem", paddingLeft: "1.3rem", paddingTop: "10px",
                paddingBottom: "10px", fontSize: "17px", marginRight: "40px"
              }}
                className="nav-link"
                onClick={() => location.push('/onboard/signup/company')}>Complete your Signup</Styles.ghostButton >
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteSignup;