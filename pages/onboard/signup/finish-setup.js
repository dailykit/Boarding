import React from "react";
import styled from "styled-components";
import { useMutation,useLazyQuery } from "@apollo/client";
import Image from 'next/image';
import Layout  from "../../../components/Layout";
import {Main } from "../../../components/styled";
import { useAuth } from "../../../store/auth";
import { ADMIN_URL_EXISTS } from "../../../graphql";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import { UPDATE_ORGANIZATION } from "../../../graphql";
import Footer from "../../../components/Footer";
import Confetti from 'react-dom-confetti';


export default function FinishSetup() {
  const { user } = useAuth();
  console.log(user.organization.onboardStatus)
  return (
    <div  hidesteps={user?.organization?.onboardStatus === "FINISH_SETUP"? true:false}>
      <Layout hidesteps={user?.organization?.onboardStatus === "FINISH_SETUP"?true: false} style={{marginBottom:"20rem"}}>
      <Main >
        {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
        {user?.organization?.onboardStatus === "SETUP_DOMAIN" ? (
          <Installation />
        ) : (
          <GifCycle />
        )}
      </Main>
      </Layout><Footer/>
  </div>
  );
}
const config = {
  angle: "90",
  spread: "230",
  startVelocity: "32",
  elementCount: "200",
  dragFriction: 0.12,
  duration: "2160",
  stagger: 3,
  width: "18px",
  height: "16px",
  perspective: "384px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};
const Installation = () => {
  const { user } = useAuth();
  const [name, setName] = React.useState("");
  const [onProps,setOnProps] = React.useState(false);
  const [error, setError] = React.useState("");
  const [check_url] = useLazyQuery(ADMIN_URL_EXISTS, {
  
    onCompleted: ({url}) => {
      console.log({url})
      if (url.length > 0) {
        setError("This url already exists!");
      } 
      else {
        setError(false);
      }
    },
  });

  const handleUrlExists = (value) =>
    check_url({ variables: { where: {"organization":{"organizationUrl": 
    {"_eq":value}}}
}})

  const [update, { loading }] = useMutation(UPDATE_ORGANIZATION, {
    onError: (error) => {
      console.log(error);
    },
  });

  const submit = () => {
    update({
      variables: {
        id: user.organization?.id,
        _set: {
          instanceRequested: true,
          onboardStatus: "FINISH_SETUP",
          organizationUrl: `${name}.dailykit.app`,
        },
      },
    });
  setOnProps(true)

  };
  return (
    <div className="flex-container" style={{ display: "flex", justifyContent: "center", margin: "1rem 0 2rem" }}>
       <div className="container">
          <div className="row">
          
      <div className="col-md-6 finishSetupSection mx-auto" >
      <h2 className="nunito onboardingheading3" style={{marginTop:"20px",marginBottom:"39px",fontWeight:"bold"}}>Customize your URL</h2>
        <Para>
          This is where you will access your apps <br/>
          and manage your team. Make sure to<br/>
          bookmark it once you’re inside.
        </Para>
        <section className="mb-3 flex flex-col items-center">
          <Input
            required
            id="name"
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            placeholder="Enter your subdomain"
            onChange={(e) => {setName(e.target.value.trim()); handleUrlExists(e.target.value.trim()+".dailykit.app")}}
            style={{display:"inline",marginBottom:"15px"}}
          />
          <Button
          style={{display:"inline"}}
          onClick={submit}
          disabled={!name || loading || !user?.keycloak?.email_verified  || error}
        >
          {loading ? "Saving" : "SAVE"}
        </Button> 
        <br/>
          <Para className="text-left nunito" style={{fontWeight:"600",fontSize:"18px"}} >{name}.dailykit.app</Para>
          
          <div style={{marginLeft:"10rem"}}><Confetti active={ onProps } config={ config }/></div>
          
        </section>
        {error && (
            <Error>{error}</Error>
          )}
      </div>
      <div className="col-md-5 col-md-offset-3" style={{"marginTop":"20px"}}>
        <Image width="320px"
         height="270px"
          src='/assets/images/FinishSetup.png'
          alt="login-page"/>
          </div>
        </div></div>
    </div>
  );
};


const GifCycle = () => {
  const { user } = useAuth();
  return (
    <div className="relative">
      {user.organization?.instanceStatus === "SETUP_COMPLETED" ? (
        <header className="text-left p-3 absolute z-10 inset-0 h-full">
          <h1 className="mb-3 text-2xl font-medium text-white ">
            You're DailyOS is ready to use.
          </h1>
          {user.organization.url && (
            <a
              target="__blank"
              rel="noopener noreferrer"
              href={`https://${user.organization.url}/desktop`}
              className="bg-green-500 text-white rounded inline-flex items-center px-3 h-10"
            >
              Go to DailyOS
            </a>
          )}
        </header>
      ) : (
        <header className="text-left p-3 absolute z-10 inset-0 h-full">
              <h2 className="nunito text-center" style={{marginTop:"20px",fontWeight:"bold",fontSize:"34px"}}> Setting up your instance!
           
          </h2>
           <Para2>
            This could take a while. In the meantime, enjoy this GIF sequence
            we've curated for you.
          </Para2>
        </header>
      )}
      <section className="finish-setup-gifs">
        <Image src="/assets/images/gif-maker.gif"
        width="720px"
        height="500px"
        />
       
        </section>
    </div>
  );
};


const Error=styled.span`
justify-self: start;
display: block;
--tw-text-opacity: 1;
color: rgba(239, 68, 68, var(--tw-text-opacity));
margin-top: 0.5rem;
font-weight:bold;
font-family:nunito;
`
const Para= styled.span`
font-family: Work Sans;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
color: #111B2B;
`

const Para2= styled.span`
font-family: Work Sans;
font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 28px;
color: #111B2B;
display: flex;
justify-content: center;
`
export const Input = styled.input`
margin-top: 1.5rem;
font-family: "Nunito", sans-serif;
width: 54%;
display: block;
border-width: 1px;
height: 2.5rem;
border-color: #111b2b;
border-radius: 0.25rem;
border: none;
 border-bottom: 2px solid #111B2B;
padding-left: 0.5rem;
padding-right: 0.5rem;
outline: 2px solid transparent;
outline-offset: 2px;
&:focus {
  border-width: 2px;
  border-color: #111b2b;
}
`;
const Button = styled.button`
background: #fff;
border-style: none;
padding: 2px 10px 10px 5px;
height: 2.5rem;
width: 66px;
height: 36px;
font-family: Work Sans;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;
margin-left:10px;
text-transform: uppercase;

color: #111B2B;
padding: 3px 13px 3px 10px;
border: 3px solid #111B2B;
box-sizing: border-box;
border-radius: 14px;
   &:disabled {
      cursor: not-allowed;
      border: 3px solid #CEDEF3;
      color: #CEDEF3;
   }
`
