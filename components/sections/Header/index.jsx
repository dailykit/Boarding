// import React from "react";
// import { useRouter } from "next/router";
// import { Styles } from "./styled";
// import {useAuth } from "../../../store/auth";
// import Image from "next/image";
// const Header = () => {
//   const location = useRouter();
//   const router=useRouter()
//   const { user, logout, authenticated } = useAuth();
//   return (
//     <nav
//     className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
//     style={{
//       border: "0px solid black",
//       boxShadow: "5px 5px 5px #888888",
//     }}
//   >
//     <div className="container-fluid mt-2 mb-2" style={{display:"flex","justifyContent":"space-between"}}>
//       <a className="navbar-brand" onClick={() => location.push("/")} style={{ marginLeft: "1.5rem" }}>
//         <Image
//           src="/assets/images/Logo.png"
//           alt=""
//           width="181"
//           height="54"
//         />
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav special-styling me-auto mb-2 mb-lg-0"> 
//           {authenticated ? (
//         <section  className="username">
//           <span
//             title={user?.name} style={{fontSize:"16px"}}
//             className="nunito rounded-full w-8 h-8 text-sm text-black cursor-default"
//           >
//             Hello, {user?.firstName}
//             {user?.lastName}
//           </span>
//           {user?.organization.onboardStatus=="FINISH_SETUP"? (
//             <Styles.Auth
//               className="nunito solid text-white border-0"
//               style={{"marginLeft":"0.5rem"}}
//               onClick={() => router.push("/")}
//             >
//               Go to dashboard
//             </Styles.Auth>
//           ):(<Styles.Auth onClick={logout} className="ghost text-white text-uppercase border-0">
//           Logout
//         </Styles.Auth>)}
          
          
//         </section>
//       ) : (
//         <section className="username-2">
//           {!location.pathname.includes("login") && (
//             <Styles.Auth
//               className="nunito solid text-white text-uppercase border-0"
//               onClick={() => location.push("/onboard/login")}
//             >
//               Login
//             </Styles.Auth>
//           )}
//           {!location.pathname.includes("signup") && (
//             <Styles.Auth
//               className="nunito solid text-white text-uppercase border-0"
//               onClick={() => router.push("/onboard/signup")}
//             >
//               Sign Up
//             </Styles.Auth>
//           )}
//         </section>
//       )}
//           </ul></div>
//           </div>
//           </nav>
//   );
// };

// export default Header;
