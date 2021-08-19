import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../store/auth";
import { Layout_2 } from "../../components";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const { authenticated, login } = useAuth();
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({ email: "", password: "" });

  const isValid = form.email.trim() && form.password.trim() &&
    !error;
  console.log(isValid)
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };
  

  // React.useEffect(() => {
  //   if (authenticated) {
  //     router.push('/')
  //   }
  // }, [authenticated])


  const submit = async () => {
    try {
      setError("");
      const user = await login({
        email: form.email,
        password: form.password,
      });
      if (user?.sub) {
        router.push('/onboard/signup/company')
      }
    } catch (error) {
      if (error?.code === 401) {
        setError("Email or password is incorrect!");
      }
    }
  };
  return (
    <>
    <Layout_2>
    <div className="container">
          <div className="row">
            <div className="col-md-7 col-md-offset-3">
      <Panel>
      <h2 style={{alignItems:"left",marginTop:"20px",marginBottom:"20px",fontWeight:"bold",fontSize:"36px",fontFamily: '"Nunito",sans-serif'}}>Login</h2>
        <FieldSet>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter your email"
          />
        </FieldSet>
        <FieldSet>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            onChange={onChange}
            value={form.password}
            placeholder="Enter your password"
          />
        </FieldSet>
       
        <Submit
          className={!isValid ? "disabled" : ""}
          onClick={() => isValid && submit()}
          disabled={!form.email || !form.password}
        >
          SUBMIT
        </Submit>
     
         
        <button className="bold" style={{margin:"0.4rem 0 1.4rem -2.4rem",fontWeight:"600" }}>
        <span style={{color:"#111B2B"}}> Not registered yet? </span>   <Link href="/onboard/signup"> Register instead?   </Link>
          </button>
     
        {error && <Error>{error}</Error>}
      </Panel>
      </div>
        <div className="col-md-5 col-md-offset-3" style={{"marginTop":"200px"}}>
        <Image width="360px"
         height="350px"
          src='/assets/images/Login.png'
          alt="login"/>
          </div>
        </div></div>
      <div style={{marginBottom:"4rem"}}></div>
      </Layout_2>
      <div style={{marginTop:"14rem"}}></div>
      <Footer/>
      </>
  );
}

const Panel = styled.section`
  width: 320px;
  display:flex;
  flex-direction:column;
  margin-left: auto;
  justify-content: center;
  margin-right: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 10rem;
  @media (max-width: 479px) {
    width: 230px;
  }`;

const FieldSet = styled.fieldset`
width: 100%;
display:flex;
flex-direction:column;
margin-bottom: 1rem;
`;

const Label = styled.label`
--tw-text-opacity: 1;
color: #111B2B;
font-family: "Nunito", sans-serif;
font-weight: bold;
margin-bottom: 4px;
    font-size: 20px;
`;

const Input = styled.input`
width: 120%;
display: block;
border-width: 1px;
height: 2.5rem;
border-color: #111b2b;
border-radius: 0.25rem;
padding-left: 0.5rem;
padding-right: 0.5rem;
margin-top: 7px;
outline: 2px solid transparent;
outline-offset: 2px;
border: none;
    border-radius: 0px;
    border-bottom: 2px solid #111B2B;
&:focus {
  border-width: 2px;
  border-color: #111b2b;
}
`;

const Error = styled.span`
align-self: flex-start;
display: block;
--tw-text-opacity: 1;
color: rgba(239, 68, 68, var(--tw-text-opacity));
margin-top: 0.5rem;
 
`;

const Submit = styled.button`
width: 120%;
font-family: Work Sans, sans-serif;
font-size: 20px;
margin-top: 2rem;
border-radius: 0.25rem;
height: 2.5rem;
--tw-bg-opacity: 1;
background-color: #111B2B;
--tw-text-opacity: 1;
border:none;
text-transform: uppercase;
letter-spacing: 0.05em;
border-radius: 15px;
color: #fff;
padding-top: 11px;
padding-bottom: 38px;

&:disabled {
  background: #CEDEF3;
  border-radius: 15px;
  cursor: not-allowed;
 
}

`;