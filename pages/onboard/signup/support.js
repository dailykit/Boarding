// import React from "react";
// import { useMutation } from "@apollo/client";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import {
//   Tip,
//   Info,
//   Card,
//   Main,
//   Footer as Foter,
//   GhostButton,
//   Button,
//   H2,
//   CheckBoxWrapper,
// } from "../../../components/styled";

// import Layout  from "../../../components/Layout";
// import { useAuth } from "../../../store/auth";
// import { BulbEmoji } from "../../../assets/icons";
// import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
// import { UPDATE_ORGANIZATION } from "../../../graphql";
// import Footer from "../../../components/Footer";
// import Confetti from 'react-dom-confetti';

// export default function Support() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [support, setSupport] = React.useState(false);
//   const [onProps,setOnProps] = React.useState(false);
//   const [update] = useMutation(UPDATE_ORGANIZATION, {
//     onCompleted: () => {
//       router.push("/onboard/signup/import");
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   const nextPage = () => {
//     update({
//       variables: {
//         id: user.organization.id,
//         _set: {
//           onboardStatus: "IMPORT",
//         },
//       },
//     });
//     setOnProps(true)
//   };
//   const prevPage = () => router.push("/onboard/signup/hosting");
//   const config = {
//     angle: 90,
//     spread: "127",
//     startVelocity: "25",
//     elementCount: "25",
//     dragFriction: 0.12,
//     duration: "2160",
//     stagger: 3,
//     width: "10px",
//     height: "10px",
//     perspective: "500px",
//     colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
//   };
//   return (
//     <>
//     <Layout>
//       <Main>
//         {!user?.keycloak?.email_verified && <VerifyEmailBanner />}

//         <section className="mt-3 mx-auto w-2/4">
//           <H2>Installation and Onboarding Support</H2>
//           <CheckBoxWrapper>
//             <input
//               type="checkbox"
//               id="support"
//               checked={support}
//               onChange={() => setSupport(!support)}
//             />
//             <label htmlFor="support">
//               I want installation and onboard support
//             </label>
//           </CheckBoxWrapper>
//           <Info>
//             <div>
//               <Tip>
//                 <span>
//                   <BulbEmoji />
//                 </span>
//                 <p className="w-3/4">
//                   Dailykit is here to help! With simplified intallation and
//                   onboarding support, we will
//                 </p>
//               </Tip>
//               <ul>
//                 <li>Setup your software</li>
//                 <li>Import your data</li>
//                 <li>Train your staff</li>
//                 <li>Provide 3 months of 24x7 world class support</li>
//               </ul>
//             </div>
//             <Card>
//               <h4>We have a plan for you</h4>
//               <span id="strike">$3000</span>
//               <span id="discount">100% off (limited)</span>
//               <span id="price">Free</span>
//             </Card>
//           </Info>
//         </section>

//       </Main>
//       <Foter style={{justifyContent:"space-between",fontWeight: "bold",marginTop:"-80px"}}>
//         <GhostButton onClick={() => prevPage()} style={{"marginLeft":"10px"}}><Image
//             height="12px"
//             src="/assets/icons/green-arrow.png"
//             alt="icon"
//             width="16px"
//             className="ml-4"
//           />&nbsp;Back</GhostButton>
//         <Button
//           onClick={() => nextPage()}
//           style={{"marginLeft":"58rem",marginTop:"-1.5px"}}
//         >
//           Next <Image
//         height="12px"
//         src="/assets/icons/arrow.png"
//         alt="icon"
//         width="16px"
//         className="ml-4"
//       />
//         </Button> <Confetti active={ onProps } config={ config }/>
//       </Foter>
//       {/* <div style={{marginBottom:"4rem"}}></div> */}
//       </Layout>
//       <Footer/>
//    </>
//   );
// }