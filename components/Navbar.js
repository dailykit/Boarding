import React, { PureComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../store/auth";
import { Styles} from "../components/sections/Header/styled";

export const Navbar = () => {
  const location = useRouter();
  const { user, authenticated, logout } = useAuth();
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg navbar-light"
      style={{
        border: "0px solid black",
        boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.1)",
        backgroundColor: "#111B2B"
      }}
    >
      <div className="container-fluid mt-2 mb-2">
        <a className="navbar-brand" href="/" style={{ marginLeft: "1.5rem" }}>
          <Image
            src="/assets/images/Logo.png"
            alt="logo-img"
            width="221"
            height="54"
          />
        </a>
        <button
          className="navbar-toggler navbar-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav special-styling me-auto mb-2 mb-lg-0">
        {!location.pathname.includes("onboard") ? (
       
            <>
             {/* *******authenticated and not in onboard pages so 1signup/login 2)complete your signup 3)Logout */}
              <li className="nav-item">
                {authenticated ? (<>
                  {user?.organization?.onboardStatus != "FINISH_SETUP" ? (
                  <button type="button" className="nav-link btn-style-fourteen mt-4"
                  onClick={()=>location.push('/onboard/signup/company')}>
                  Complete your Signup
                 </button>) : (
                 <Styles.ghostButton 
                      className="nav-link"
                      style={{backgroundColor:"white",color:"black",display:"inline",marginRight:"1rem",paddingRight:"1.3rem",paddingLeft:"1.3rem",fontSize:"17px"}}
                      onClick={logout}
                    >
                      LOGOUT
                    </Styles.ghostButton>)
                  }</>) : (<>
                  <Styles.ghostButton style={{backgroundColor:"white",color:"black",display:"inline",marginRight:"1rem",paddingRight:"1.3rem",paddingLeft:"1.3rem",fontSize:"17px"}}
                    className="nav-link"
                    onClick={() => location.push("/onboard/signup")}
                  >
                    SIGNUP
                  </Styles.ghostButton>
                  <Styles.ghostButton style={{color:"white",display:"inline",paddingRight:"1.3rem",paddingLeft:"1.3rem",fontSize:"17px"}}
                  className="nav-link"
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

                <li className="nav-item">
                  <section className="username">
                  {!location.pathname.includes("login") ? (
                        <Styles.ghostButton style={{color:"white",display:"inline",padding:"0.6rem 1.3rem 0.6rem 1.3rem",fontSize:"17px",marginLeft:"24rem"}} className="nav-link nunito"
                         onClick={() => location.push("/onboard/login")}>
                            LOG IN
                            </Styles.ghostButton>
                  ) : (
                    <Styles.ghostButton style={{color:"white",display:"inline",padding:"0.6rem 1.3rem 0.6rem 1.3rem",fontSize:"17px",marginLeft:"24rem"}} className="nav-link nunito" 
                         onClick={() => location.push("/onboard/signup")}>
                           SIGN UP
                            </Styles.ghostButton>)}
                  </section>
                </li>
              ) : (

                // {/* // if authenticated then 2 condtion 1)logout or 2)go to dasboard */}
                <li className="nav-item">
                  <section className="username" style={{marginLeft: "55rem"}}>
                    <span
                      title={user?.name} style={{ fontSize: "18px" }} className="nunito text-sm text-white cursor-default">
                      Hello, {user?.firstName} &nbsp;
                      {user?.lastName}
                    </span>
                    {user?.organization.onboardStatus == "FINISH_SETUP" ? (
                      <Styles.ghostButton style={{color:"white",display:"inline", marginLeft: "0.5rem",paddingRight:"0.6rem",paddingLeft:"0.6rem",fontSize:"17px"}}
                        className="nunito"
                        onClick={() => location.push("/")}
                      >
                        Go to dashboard
                      </Styles.ghostButton>
                    ) : (<Styles.ghostButton className="nunito" style={{color:"white",display:"inline",marginLeft: "1rem",paddingRight:"1.3rem",paddingLeft:"1.3rem",paddingTop:"6px",fontSize:"17px"}} onClick={logout}>
                      LOG OUT
                    </Styles.ghostButton>)}


                  </section>

                </li>
              )}
            </>
         
        )}
        </ul>
       </div>
      </div>
    </nav>
  );
}

export default Navbar;