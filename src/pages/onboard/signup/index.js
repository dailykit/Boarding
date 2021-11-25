import React from "react";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";

import Link from 'next/link'
import { useRouter } from "next/router";
import { Label, Main, Input, Field } from "../../../components/styled";
import * as utils from "../../utils";

import { useAuth } from "../../../store/auth";
import { ADMIN_EXISTS } from "../../graphql";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";

import Image from "next/image";

var validator = require('validator');

export default function Signup() {

  const router = useRouter();
  const { dispatch } = useAuth();

  const [error, setError] = React.useState("");
  const [error2, setError2] = React.useState("");
  const [email, validEmail] = React.useState(true);

  const [FirstName, validFirstName] = React.useState(true);
  const [LastName, validLastName] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const [check_email] = useLazyQuery(ADMIN_EXISTS, {
    onCompleted: ({ admins = [] }) => {
      if (admins.length > 0) {
        setError("Email already exists!");
      }
      else {
        setError("");
      }
    },
  });

  const [form, setForm] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const isValid =
    form.email.trim() &&
    form.password.trim() &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    !error;

  const onChange = (e) => {

    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  // for validation
  React.useEffect(() => {
    form.email && validEmail(validator.isEmail(form.email));
    form.firstName && validFirstName(validator.isAlpha(form.firstName));
    form.lastName && validLastName(validator.isAlpha(form.lastName));
    if (!email || !FirstName || !LastName) {
      setError2("Please check your credientials");
    }
    else {
      setError2("");
    }
  })

  const submit = async () => {
    setSubmitting(true);
    console.log("submission started")
    try {
      const result = await utils.register({
        email: form.email,
        password: form.password,
        lastName: form.lastName,
        firstName: form.firstName,
      });
      if (result?.success) {
        console.log("submitting successful")
        const user = await utils.login({
          email: form.email.trim(),
          password: form.password.trim(),
        });

        if (user?.sub) {
          dispatch({ type: "SET_USER", payload: { email: user?.email } });
          router.push("/onboard/signup/company");
        }
      }
    } catch (error) {
      console.log("submission failed", error)
      setError(error);
    } finally {
      console.log("submission failed")
      setSubmitting(false);
    }
  };

  const handleEmailExists = (value) =>
    check_email({ variables: { where: { email: { _eq: value } } } });


  return (
    <>
      <Layout>
        <Main>
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-xs-10">
                <Panel style={{ fontWeight: "bold" }}>
                  <h2 className="onboarding-heading" style={{ marginTop: "20px", fontWeight: "bold" }}>Register</h2>
                  <Field style={{ "marginTop": "0.5rem" }}>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="firstName"
                      name="firstName"
                      id="firstName"
                      required
                      value={form.firstName}
                      onChange={onChange}
                      placeholder="Enter your first name"
                    />
                  </Field>
                  <Field style={{ "marginTop": "0.5rem" }}>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="lastName"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={onChange}
                      placeholder="Enter your last name"
                    />
                  </Field>
                  <Field style={{ "marginTop": "0.5rem" }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      required
                      onChange={onChange}
                      placeholder="Enter your email"
                      onBlur={(e) => handleEmailExists(e.target.value.trim())}
                    />
                    {error && (
                      <Error>{error}</Error>
                    )}
                  </Field>
                  <Field style={{ "marginTop": "0.5rem" }}>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      name="password"
                      type="password"
                      required
                      onChange={onChange}
                      value={form.password}
                      placeholder="Enter your password"
                    />
                  </Field>
                  <Link href="/onboard/login">
                    <button className="bold ml--17rem" style={{ fontWeight: "bold" }}>
                      Login instead?
                    </button>
                  </Link>
                  <Submit
                    style={{ marginTop: "0.2rem" }}
                    className={!isValid || submitting ? "disabled" : ""}
                    onClick={(e) => (isValid || !submitting) && submit()}
                    disabled={!form.firstName || !form.lastName || !form.email || !form.password || !email || !FirstName || !LastName || error}
                  >  {submitting ? "Submitting" : "Submit"}
                  </Submit>
                  {error2 && (
                    <Error>{error2}</Error>
                  )}
                </Panel>
              </div>
              <div className="col-md-5 col-xs-10" style={{ "marginTop": "100px" }}>
                <Image width="300px"
                  height="300px"
                  src='/assets/images/LoginPage.png'
                  alt="login-page" />
              </div>
            </div></div>
        </Main>
      </Layout>
      <Footer />
    </>
  );
};

const Panel = styled.section`
width: 380px;
display: flex;
margin-left: auto;
margin-right: auto;
flex-direction: column;
justify-content: center;
align-content: center;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
`;

const Ellipse = styled.div`
display:inline;
width: 22px;
height: 22px;
border-radius: 50%;
padding: 0px 10px 0px 10px;
border: 3px dashed white;
box-sizing: border-box;
`

const Error = styled.span`
justify-self: start;
display: block;
--tw-text-opacity: 1;
color: rgba(239, 68, 68, var(--tw-text-opacity));
margin-top: 0.5rem;
`
// const Field = styled.fieldset`
// width: 100%;
// display: flex;
// flex-direction: column;
// margin-bottom: 0.5rem;
// `;

// const Input = styled.input`
// width: 100%;
// display: block;
// border-width: 1px;
// height: 2.5rem;
// border-radius: 0.25rem;
// padding-left: 0.5rem;
// padding-right: 0.5rem;
// outline: 2px solid transparent;
// outline-offset: 2px;
// &:focus {
//   border-width: 2px;
//   --tw-border-opacity: 1;
//   border-color: rgba(96, 165, 250, var(--tw-border-opacity));
// }
// `;

const Submit = styled.button`
width: 109.5%;
font-family: "Nunito", sans-serif;
font-size: 20px;
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
padding-top: 13px;
padding-bottom: 36px;

&:disabled {
  background: #CEDEF3;
  border-radius: 15px;
  cursor: not-allowed;
 
}
@media (max-width: 479px) {
  width: 80.5%;
  margin-left: 16px;
}

`;