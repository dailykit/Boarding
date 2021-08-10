import React from "react";
import Layout from "../../../components/Layout";
import { Radio } from "../../../components";
import { useAuth } from "../../../store/auth";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import {H2, Main} from "../../../components/styled";
import Footer from "../../../components/Footer";
import PricingSection1 from "../../../components/subcomponents/homepage/PricingSection1";

export default function Hosting() {
  const { user } = useAuth();
  const [option, setOption] = React.useState("cloud");
  const [onSelect1, setOnSelect1] = React.useState(false);
  const [onSelect2, setOnSelect2] = React.useState(false);
  const [onSelect3, setOnSelect3] = React.useState(false);
 
      return (
        <>
          <Layout>
            <Main>
              {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
              <section className="mt-4 mx-auto w-2/4">
                <H2>Hosting</H2>
                <Radio>
                  <Radio.Option
                    value={option}
                    id="cloud"
                    name="hosting"
                    onClick={() => setOption("cloud")}
                  >
                    Cloud Hosting
                  </Radio.Option>
                  <Radio.Option
                    id="self"
                    name="hosting"
                    value={option}
                    onClick={() => setOption("self")}
                  >
                    Self Hosting
                  </Radio.Option>
                </Radio>
                <div className="nunito pricingsection2">
              </div>
                {option === "cloud" ? (
                  <PricingSection1
                    paddingBottom={"0px"}
                    marginHeight={"-80px"}
                    offers={[
                      {
                        name: "Cloud Hosting",
                        price: "$ 29",
                        price_id: "price_1JCJetGKMRh0bTaia6mIjYwC",
                        email: user.email,
                        box_shadow: '1px 1px 2px rgb(255 255 255 / 30%),-1px -1px 2px rgb(223 223 222 / 50%),inset -5px 5px 10px rgb(223 223 222 / 20%),inset 5px -5px 10px rgb(223 223 222 / 20%),inset -5px -5px 10px rgb(255 255 255 / 90%),inset 5px 5px 13px rgb(223 223 222 / 90%)',
                      	onSelect:onSelect1,
    			              setOnSelect:setOnSelect1,
                        resetOnSelect2:setOnSelect2,
                        resetOnSelect3:setOnSelect3,
                      },
                      // {
                      //   name: "Premium",
                      //   price: "$ 79",
                      //   price_id: "price_1JCJfGGKMRh0bTaiuqXZltFb",
                      //   number: '4242424242424242',
                      //   email: user.email,
                      //   box_shadow: '1px 1px 2px rgb(255 255 255 / 30%),-1px -1px 2px rgb(223 223 222 / 50%),inset -5px 5px 10px rgb(223 223 222 / 20%),inset 5px -5px 10px rgb(223 223 222 / 20%),inset -5px -5px 10px rgb(255 255 255 / 90%),inset 5px 5px 13px rgb(223 223 222 / 90%)',
                      //   onSelect:onSelect2,
                      //   setOnSelect:setOnSelect2,
                      //   resetOnSelect2:setOnSelect1,
                      //   resetOnSelect3:setOnSelect3,
                      // },
                      // {
                      //   name: "Professional",
                      //   price: "$ 499",
                      //   price_id: "price_1JCJffGKMRh0bTai3tYKfX9n",
                      //   email: user.email,
                      //   box_shadow: '1px 1px 2px rgb(255 255 255 / 30%),-1px -1px 2px rgb(223 223 222 / 50%),inset -5px 5px 10px rgb(223 223 222 / 20%),inset 5px -5px 10px rgb(223 223 222 / 20%),inset -5px -5px 10px rgb(255 255 255 / 90%),inset 5px 5px 13px rgb(223 223 222 / 90%)',
                      //   onSelect:onSelect3,
                      //   setOnSelect:setOnSelect3,
                      //   resetOnSelect2:setOnSelect1,
                      //   resetOnSelect3:setOnSelect2,
                      // },
                    ]}
                  />) : (
                  <>
                    <div style={{ textAlign: "center" }}>
                      coming soon....
                    </div>
                  </>
                )
                }
              </section>
            </Main>
          </Layout> 
         <Footer />
        </>
      );
    }