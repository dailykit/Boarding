import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../store/auth";
import { Layout_2 } from "../../components";
import Footer from "../../components/Footer";
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
        router.push('/onboard/signup')
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
      <Panel>
        <h1 className="text-2xl mb-6 mt-4 nunito" style={{"fontWeight":"bold"}}>Login</h1>
        <FieldSet>
          <Label htmlFor="email">Email</Label>
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
        <Link href="/onboard/signup">
          <button className="bold" style={{ "marginLeft": "-13rem" }}>
            Register instead?
          </button>
        </Link>
        <Submit
          style={{ marginTop: "0.2rem" }}
          className={!isValid ? "disabled" : ""}
          onClick={() => isValid && submit()}
          disabled={!form.email || !form.password}
        >
          Login
        </Submit>
        {error && <Error>{error}</Error>}
      </Panel>
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
  align-items: center;
  margin-right: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 10rem;
`;

const FieldSet = styled.fieldset`
width: 100%;
display:flex;
flex-direction:column;
margin-bottom: 1rem;
`;

const Label = styled.label`
font-weight: bold;
font-family:nunito;
--tw-text-opacity: 1;
color: rgba(75, 85, 99, var(--tw-text-opacity));
margin-bottom: 0.25rem;
`;

const Input = styled.input`
width: 100%;
display:block;
border-width: 1px;
height: 2.5rem;
border-radius: 0.25rem;
padding-left: 0.5rem;
padding-right: 0.5rem;
outline: 2px solid transparent;
outline-offset: 2px;
&.focus{
border-width: 2px;
--tw-border-opacity: 1;
border-color: rgba(156, 163, 175, var(--tw-border-opacity));
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
width: 100%;
font-family: "Nunito", sans-serif;
border-radius: 0.25rem;
height: 2.5rem;
--tw-bg-opacity: 1;
background-color:#8ac03b;
--tw-text-opacity: 1;
border:none;
color: rgba(255, 255, 255, var(--tw-text-opacity));
text-transform: uppercase;
letter-spacing: 0.05em;
padding-top:10px;
padding-bottom:10px;
&:disabled {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
  cursor: not-allowed;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
`;