import React from "react";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../store/auth";
import VerifyEmailBanner from "../../../components/VerifyEmailBanner";
import {Main} from "../../../components/styled";
import Footer from "../../../components/Footer";
import PricingSection1 from "../../../components/subcomponents/homepage/PricingSection1";

export default function Pricing() {
  const { user } = useAuth();
  const [option, setOption] = React.useState("cloud");
  const [onSelect1, setOnSelect1] = React.useState(false);


  const descriptionpoints1=["On demand store","Ecommerce","SEO Optimization","Meal Kit Specific Store capabilities","Upsell & Cross Sell","Build your own meal","Unlimited products"]
  const descriptionpoints2=["Discount codes ","SSL certificate ","Abandoned cart recovery ","Referral Programs and Wallet","Multi Locations Support","Recipe and Station Management ","Print shipping labels"] 
  
      return (
        <>
          <Layout>
            <Main>
              {!user?.keycloak?.email_verified && <VerifyEmailBanner />}
              <section className="mt-4 w-2/4">
              <h2 className="nunito" style={{fontWeight:"bold",fontSize:"36px",textAlign:"left",marginLeft:"32px"}}>Pricing</h2>
               
                <div className="nunito pricingsection2">
              </div>
                  <PricingSection1
                    paddingBottom={"0px"}
                    marginHeight={"-70px"}
                    offers={[
                      {
                        name: "Cloud Hosting",
                        price: "$ 29",
                        price_id: "price_1JCJetGKMRh0bTaia6mIjYwC",
                        email: user.email,
                        box_shadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
                      	onSelect:onSelect1,
    			              setOnSelect:setOnSelect1,
                      }
                    ]}
                  />
              </section>
              <div className="container">
              <div className="row">
              <div className="col-md-6 col-xs-10">
             
              <ul className="onDemandCategories2">
                {descriptionpoints1.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
          
            </div><div className="col-md-6 col-xs-10">
              
              <ul className="onDemandCategories2" >
                {descriptionpoints2.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
        <div className="moreFeatures">And More...</div>
            </div> </div>
            </div>
            </Main>
          </Layout> 
         <Footer />
        </>
      );
    }