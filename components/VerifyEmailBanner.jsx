import React from "react";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";
import { useAuth } from "../store/auth";

const VerfiyEmailBanner = () => {
  const { user } = useAuth();
  const [showBanner,setonShowBanner] = React.useState(false);

  const resend = async () => {
    try {
      const data = { id: user?.keycloakId };
      const url = `${window?._env_.PLATFORM_URL}/api/dailykit/verify/email`;
      await axios.post(url, data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Styles.Banner style={{display:showBanner && "none"}}>
      <Styles.Aside>
        <Image src="/assets/images/MailVerification.png"  width="70"
         height="70" alt="verifymail"/>
      </Styles.Aside>
      <Styles.Main>
        <section>
          <h3>Verification Mail Sent!</h3>
          <span style={{cursor:"pointer"}} onClick={()=>setonShowBanner(true)}>✖</span>
          <p>
          We need to verify your Email Address. Please check your inbox for a messsage from us. You’ll find confirmation link inside. 
          </p>
        
        </section>
        <section>
      <button onClick={resend}>RESEND</button>
        </section>
      </Styles.Main>
    </Styles.Banner>
  );
};

export default VerfiyEmailBanner;

const Styles = {
  Banner: styled.div`
  margin: 20px 20px 0px 20px;
    display: grid;
    background: #F2F2F2;
    font-family: "Nunito", sans-serif;
    height: 7rem;
    color: #111B2B;
    margin-bottom: 1rem;
    grid-template-columns: 96px 1fr;
    @media (max-width: 479px) {
      height: 12rem;
  }
  `,
  Aside: styled.aside`
    display: flex;
    font-family: "Nunito", sans-serif;
    align-items: center;
    justify-content: center;
    @media (max-width: 479px) {
        margin-bottom: 6rem;
    }
  `,
  Main: styled.main`
    display: grid;
    font-family: "Nunito", sans-serif;
    padding-right: 16px;
    grid-template-columns: 1fr auto;
    align-items: center;

    h3 {
      margin-top: 1rem;
      font-size: 32px;
      font-weight: bold;
      font-family: "Nunito", sans-serif;
      line-height: 2rem;
    }
    p {
      font-size: 18px;
      font-weight: 500;
      font-family: 'Work Sans', sans-serif;
      line-height: 1.25rem;
      width:78%;
      line-height: 21px;
    }
    button {
      background: #F2F2F2;
      color: #111B2B;
      font-weight: 500;
      font-family: 'Work Sans', sans-serif;
      padding-left: 22px;
      padding-right: 22px;
      padding-top:7px;
      font-size: 17.5px;
      padding-bottom:7px;
      border: 3px solid #111B2B;
      box-sizing: border-box;
      border-radius: 16px;
      margin-right: 1.5rem;
    }
    span{
      font-size: 19px;
      position: absolute;
      width: 12px;
      height: 12px;
      left: 1470px;
      top: 129px;
    }
    @media (max-width: 479px) {
    button{
      margin-bottom: 6rem;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
      padding-left: 0.7rem;
      padding-right: 0.7rem;
      font-size:12px;
    }
    h3{
      margin-top: 2rem;
    }
    p{
      font-size: 0.7rem;
      line-height: 1rem;
    }
  }
  `,
};
