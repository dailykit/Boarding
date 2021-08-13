import React from "react";
import {NextArrow} from "/assets/icons";
import moment from "moment-timezone";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import { Footer as Foter, Main, Field, Label, Form, Button, H2, Input } from "../../../components/styled";

import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../store/auth";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import { UPDATE_ORGANIZATION } from "../../../graphql";
import { useTimezones, useCurrencies } from "../../../utils";
import Confetti from 'react-dom-confetti';

export default function Company() {
  const { user } = useAuth();
  const history = useRouter();
  const [tzSearch, setTzSearch] = React.useState("");
  const { timezones } = useTimezones(tzSearch);
  const [onProps, setOnProps] = React.useState(false);
  const [currencySearch, setCurrencySearch] = React.useState("");
  const { list: currencies } = useCurrencies(currencySearch);
  const [update] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: () => {
      history.push("/onboard/signup/about-yourself");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [form, setForm] = React.useState({
    company: "",
    currency: "",
    timezone: "",
    employeesCount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };
  const config = {
    angle: 90,
    spread: "29",
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
  React.useEffect(() => {
    if (user.organization?.id) {
      setForm((form) => ({
        ...form,
        currency: user.organization?.currency || "",
        company: user.organization?.organizationName || "",
        timezone: user.organization?.timeZone || moment.tz.guess(),
      }));
    }
  }, [user.organization]);

  const save = () => {
    if (!form.company) return setError("Company's Name is required.");
    update({
      variables: {
        id: user.organization.id,
        _set: {
          timeZone: form.timezone,
          currency: form.currency,
          onboardStatus: "ABOUT_YOURSELF",
          organizationName: form.company,
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <section className="mb-2 mx-auto w-1/4" style={{ "height": "27rem", marginTop:"2.4rem",display: "flex", justifyContent: "center", flexDirection: "column" }}>
              <Form style={{ fontWeight: "bold",width: "380px" }}>
                <h2 className="nunito" style={{marginTop:"20px",fontWeight:"bold",fontSize:"34px"}}>Enter Company Details</h2>
                <Field>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={form.company}
                    placeholder="Enter your Company's name"
                    onChange={(e) => handleChange(e)}
                  />
                </Field>
                <Field>
                  <Label htmlFor="currency">Currency</Label>
                  <Combobox
                    aria-label="Currencies"
                    onSelect={(item) =>
                      handleChange({
                        target: { name: "currency", value: item },
                      })
                    }
                  >
                    <StyledComboboxInput
                      value={form.currency}
                      placeholder="Select Currency"
                      onChange={(e) => {
                        setCurrencySearch(e.target.value.trim());
                        handleChange({
                          target: {
                            name: "currency",
                            value: e.target.value.trim(),
                          },
                        });
                      }}
                    />
                    {currencies.length > 0 && (
                      <StyledComboboxPopover portal={false}>
                        {currencies.length > 0 ? (
                          <ComboboxList>
                            {currencies.map((node) => {
                              return (
                                <ComboboxOption
                                  key={node.title}
                                  value={node.value}
                                  placeholder="Select a currency"
                                />
                              );
                            })}
                          </ComboboxList>
                        ) : (
                          <span
                            style={{
                              display: "block",
                              margin: 8,
                            }}
                          >
                            No results found
                          </span>
                        )}
                      </StyledComboboxPopover>
                    )}
                  </Combobox>
                </Field>
                <Field>
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Combobox
                    aria-label="Timezones"
                    onSelect={(item) =>
                      handleChange({
                        target: { name: "timezone", value: item },
                      })
                    }
                  >
                    <StyledComboboxInput
                      value={form.timezone}
                      placeholder="Select Timezone"
                      onChange={(e) =>
                        setTzSearch(e.target.value.trim()) ||
                        handleChange({
                          target: {
                            name: "timezone",
                            value: e.target.value.trim(),
                          },
                        })
                      }
                    />
                    {timezones.length > 0 && (
                      <StyledComboboxPopover portal={false}>
                        {timezones.length > 0 ? (
                          <ComboboxList>
                            {timezones.map((timezone) => {
                              return (
                                <ComboboxOption
                                  key={timezone.title}
                                  value={timezone.title}
                                  placeholder="Select a timezone"
                                />
                              );
                            })}
                          </ComboboxList>
                        ) : (
                          <span
                            style={{
                              display: "block",
                              margin: 8,
                            }}
                          >
                            No results found
                          </span>
                        )}
                      </StyledComboboxPopover>
                    )}
                  </Combobox>
                </Field>
                <Field>
                  <Label htmlFor="employeesCount">No. of Employees</Label>
                  <select
                    name="employeesCount"
                    id="employeesCount"
                    value={form.employeesCount}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="5">5-10</option>
                    <option value="10">10-20</option>
                    <option value="20">20-50</option>
                    <option value="50">50-100</option>
                    <option value="100">100-500</option>
                    <option value="500">500+</option>
                  </select>
                </Field>
              </Form>
            </section>
          </div>
        </Main>
        <Foter>
        <Confetti active={onProps} config={config} />
          <Button onClick={save} disabled={!form.company} style={{ "fontWeight": "bold",marginTop:"-80px" }}><NextArrow color={form.company ? "#111B2B":"#CEDEF3"}/>
          </Button>
         
        </Foter>
        
      </Layout>
      {/* <div style={{marginBottom:"4rem"}}></div> */}
      <Footer />
    </>
  );
};



const StyledComboboxPopover = styled(ComboboxPopover)`
  padding: 4px 0;
  position: absolute;
  margin-top: -10px;
  background: #fff;
  z-index: 100;
  width: 320px;
  overflow-y: auto;
  max-height: 340px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  [data-reach-combobox-option] {
    padding: 4px 8px;
    list-style: none;
    :hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  [data-user-value] {
  }
  [data-suggested-value] {
    color: #ada9a9;
  }
`;

const StyledComboboxInput = styled(ComboboxInput)`
  width: 320px;
  height: 40px;
  border: none;
  color: #686d7b;
  border-bottom: 2px solid #e1e1e1;
  &::placeholder {
    color: #969696;
  }
  &:focus {
    outline: transparent;
    border-bottom: 2px solid #8ac03b;
  }
`;
