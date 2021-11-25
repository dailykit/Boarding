import React from "react";
import { useMutation } from "@apollo/client";
import { NextArrow, BackArrow, Flag } from "../assets/icons";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../store/auth";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import { UPDATE_USER, UPDATE_ORGANIZATION } from "../../../graphql";
import { Footer as Foter, Main, Field, Label, Form, GhostButton, Button, H2, Input } from "../../../components/styled";
import Footer from "../../../components/Footer";
import Confetti from 'react-dom-confetti';
var validator = require('validator');

export default function AboutYourself() {
  const { user } = useAuth();
  const history = useRouter();
  const [error, setError] = React.useState("");
  const [error2, setError2] = React.useState("");
  const [onProps, setOnProps] = React.useState(false);

  const [form, setForm] = React.useState({
    phoneNumber: "",
    designation: "",
  });
  // for validation
  React.useEffect(() => {
    if (form.phoneNumber && !validator.isMobilePhone(form.phoneNumber)) {
      return setError2("Please enter a correct phone Number");
    }
    if (form.designation && !validator.isAlpha(validator.blacklist(form.designation, ' '))) {
      return setError2("Enter your correct designation");
    }
    else {
      return setError2("");
    }
  })

  const [update_org] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: () => {
      history.push("/onboard/signup/pricing");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const config = {
    angle: 90,
    spread: "123",
    startVelocity: "19",
    elementCount: "25",
    dragFriction: 0.12,
    duration: "2160",
    stagger: 3,
    width: "10px",
    height: "7px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const [update] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      update_org({
        variables: {
          id: user.organization.id,
          _set: {
            onboardStatus: "PRICING",
          },
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    if (user?.id) {
      setForm((form) => ({
        ...form,
        designation: user?.designation || "",
        phoneNumber: user?.phoneNumber || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const submit = () => {
    if (!form.designation) return setError("Designation is required.");
    if (!form.phoneNumber) return setError("Phone Number is required.");
    update({
      variables: {
        id: user.id,
        _set: {
          designation: form.designation,
          phoneNumber: form.phoneNumber,
        },
      },
    });
    setOnProps(true)
  };

  return (
    <>
      <Layout>
        <Main>
          {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", margin: "2.3rem 0 2rem" }}>
            {/* back button */}

            <div style={{ display: "flex", justifyContent: "flex-end", fontWeight: "bold" }}>
              <BackButton onClick={() => history.push("/onboard/signup/company")}><BackArrow /></BackButton>
              <Button onClick={submit} style={{ marginRight: "20px" }} disabled={!form.designation || !form.phoneNumber} ><NextArrow color={form.designation && form.phoneNumber ? "#111B2B" : "#CEDEF3"} />
              </Button>
              <Confetti active={onProps} config={config} />
            </div>
            {/* end of next and back button */}
            <section className="mx-auto w-1/4" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <h2 className="nunito onboarding-heading" style={{ fontWeight: "bold", marginTop: "-35px" }}>Enter Your Details</h2>

              <Form style={{ width: "430px" }}>
                <Field>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    type="text"
                    required
                    id="designation"
                    name="designation"
                    value={form.designation}
                    placeholder="Enter your designation"
                    onChange={(e) => handleChange(e)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="phoneNumber" >Phone Number</Label>
                  <div style={{ "display": "flex", "flexDirection": "row" }}>
                    <ImageIcon ><Flag /> </ImageIcon><SelectIcon ><select
                      name="phoneid"
                      id="phoneid"
                      value={form.phoneid}
                      onChange={(e) => handleChange(e)}
                      style={{ width: "57.9px", display: "inline" }}
                    >
                      <option value="91">+91</option>
                    </select></SelectIcon >
                    <Input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      minlength="10"
                      value={form.phoneNumber}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter your phone number"
                    /></div>
                </Field>
                {error && (
                  <Error>{error}</Error>
                )}
                {error2 && (
                  <Error>{error2}</Error>
                )}
              </Form>
            </section>
          </div>

        </Main>

        {/* <div style={{marginBottom:"4rem"}}></div> */}
      </Layout ><Footer />
    </>
  );
};


const ImageIcon = styled.span`
flex: 1 1;
width: 30px;
height: 30px;
@media (max-width: 479px)  {
flex: 0 1;
}
`


const SelectIcon = styled.span`
flex:0 0;
width: 30px;
height: 30px;`

const Error = styled.span`
justify-self: start;
display: block;
--tw-text-opacity: 1;
color: rgba(239, 68, 68, var(--tw-text-opacity));
margin-top: 0.5rem;
`
export const BackButton = styled.button`
background: #fff;
border-style: none;
padding: 2px 10px 10px 5px;
height: 2.5rem;
margin-right:1075px;
width: 36px;
height: 36px;
font-weight: bold;
border: 3px solid #111B2B;
box-sizing: border-box;
border-radius: 14px;
@media (max-width: 479px)  {
  margin-right: 250px;
  }

`
