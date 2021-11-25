import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../store/auth";
import { Styles } from "../components/sections/Header/styled";
export const Navbar = () => {
  const location = useRouter();
  const { user, authenticated, logout } = useAuth();
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-dark"
      style={{
        border: "0px solid black",
        boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.1)",
        backgroundColor: "#111B2B"
      }}
    >
      <div className="container-fluid pl-0 mt-12px mb-12px">
        <div className="navbar-icon">
          <a className="navbar-brand" href="/">
            <Image
              src="/../assets/images/Logo.png"
              alt="logo-img"
              width="221"
              height="54"
            />
          </a>
        </div>
        {!location.pathname.includes("onboard") ? (
          <>
            {/* *******authenticated and not in onboard pages so 1signup/login 2)complete your signup 3)Logout */}
            <li>
              {authenticated ? (<>
                {user?.organization?.onboardStatus != "FINISH_SETUP" ? (
                  <>
                    {/* for mobile */}
                    <a type="button" id="exampleModal-1" style={{ marginRight: "-20px" }} className="btn-style-thirteen" data-bs-toggle="modal" data-bs-target="#exampleModal" href="/">
                      <span className="navbar-toggler-icon light"></span>
                    </a>
                    <CompleteSignup />
                    {/* for desktop */}
                    <Styles.ghostButton className="nav-link complete-signup-button" style={{
                      color: "white", background: "black", marginRight: "1rem",
                      paddingRight: "1.3rem", paddingLeft: "1.3rem", fontSize: "17px"
                    }} onClick={() => location.push('/onboard/signup/company')}>
                      Complete your Signup
                    </Styles.ghostButton >
                  </>) : (
                  <Styles.ghostButton
                    className="nav-link"
                    style={{ backgroundColor: "white", color: "black", display: "inline", marginRight: "1rem", paddingRight: "1.3rem", paddingLeft: "1.3rem", fontSize: "17px" }}
                    onClick={logout}
                  >
                    LOGOUT
                  </Styles.ghostButton>)
                }</>) : (<>
                  <Styles.ghostButton style={{ display: "inline", paddingRight: "1.3rem", paddingLeft: "1.3rem", fontSize: "17px" }}
                    className="nav-link responsive-signup-button"
                    onClick={() => location.push("/onboard/signup")}
                  >
                    SIGNUP
                  </Styles.ghostButton>
                  <Styles.ghostButton style={{ color: "white", background: "#111b2b", paddingRight: "1.3rem", paddingLeft: "1.3rem", fontSize: "17px" }}
                    className="nav-link responsive-login-button"
                    onClick={() => location.push("/onboard/login")}
                  >
                    LOGIN
                  </Styles.ghostButton></>
              )}
            </li>
            {/*authenticated and NOT IN ONBOARD PAGES so 1signup/login 2)complete your signup 3)Logout  ********/}
          </>




        ) : (


          // ONBOARD PAGES


          <>
            {/* if not authenticated and ONBOARD PAGES then 2 condtion 1)login or 2) signup */}
            {!authenticated ? (

              <li className="onboarding-login">
                <section className="username">
                  {!location.pathname.includes("login") ? (
                    <Styles.ghostButton style={{ color: "white", background: "#111b2b", display: "inline", padding: "0.6rem 1.3rem 0.6rem 1.3rem", fontSize: "17px" }} className="nav-link nunito res-onboard-login"
                      onClick={() => location.push("/onboard/login")}>
                      LOG IN
                    </Styles.ghostButton>
                  ) : (
                    <Styles.ghostButton style={{ color: "white", background: "#111b2b", display: "inline", padding: "0.6rem 1.3rem 0.6rem 1.3rem", fontSize: "17px" }} className="nav-link nunito res-onboard-login"
                      onClick={() => location.push("/onboard/signup")}>
                      SIGN UP
                    </Styles.ghostButton>)}
                </section>
              </li>
            ) : (

              // {/* // if authenticated then 2 condition 1)logout or 2)go to dasboard */}
              <li>
                <section className="username">
                  <span
                    title={user?.name} style={{ fontSize: "18px" }} className="nunito text-sm text-white cursor-default">
                    Hello, {user?.firstName} &nbsp;
                    {user?.lastName}
                  </span>
                  {user?.organization.onboardStatus == "FINISH_SETUP" ? (
                    <Styles.ghostButton style={{ background: "black", color: "white", display: "inline", marginLeft: "0.5rem", paddingRight: "0.6rem", paddingLeft: "0.6rem", fontSize: "17px" }}
                      className="nunito"
                      onClick={() => location.push("/")}
                    >Go to dashboard
                    </Styles.ghostButton>
                  ) : (<Styles.ghostButton className="nunito" style={{ color: "white", background: "#111b2b", display: "inline", marginLeft: "1rem", paddingRight: "1.3rem", paddingLeft: "1.3rem", paddingTop: "6px", fontSize: "17px" }} onClick={logout}>
                    LOG OUT
                  </Styles.ghostButton>)}


                </section>

              </li>
            )}
          </>

        )}

      </div>
    </nav>
  );
}
const CompleteSignup = () => {
  const location = useRouter();
  return (
    <>
      <div
        className="modal"
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
                  <div class="col-md-6 ml-auto">
                    <Image width="250px"
                      height="250px"
                      src='/assets/images/LoginPage.png'
                      alt="login-page" /></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Styles.ghostButton style={{
                background: "#111b2b",
                color: "white", display: "inline", paddingRight: "1.3rem", paddingLeft: "1.3rem", paddingTop: "10px",
                paddingBottom: "10px", fontSize: "17px", marginRight: "28px"
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

export default Navbar;