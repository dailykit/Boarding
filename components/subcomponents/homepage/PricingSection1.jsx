import React from "react";
import { useRouter } from "next/router";
import { Button } from "../../styled"
import { useMutation } from "@apollo/client";
import { useAuth } from "../../../store/auth";
import { UPDATE_ORGANIZATION } from "../../../graphql";

export default function PricingSection1(props) {
const router = useRouter();
const { user } = useAuth();
const [update] = useMutation(UPDATE_ORGANIZATION, {
  onCompleted: () => {
    router.push("/onboard/signup/card-details");
  },
  onError: (error) => {
    console.log(error);
  }})
    
    const nextPage = () => {
      update({
        variables: {
          id: user.organization.id,
          _set: {
            onboardStatus: "CARD_DETAILS",
          },
        },
      });
      
      console.log(user)
    };
  return (
    <div className="nunito pricingsection1" style={{paddingBottom:props?.paddingBottom}}>
      {props.marginHeight && <div style={{ marginTop: props.marginHeight}}  />}
      {props.heading && <h6 className="price-heading">{props.heading}</h6>}
      {props.subheading && <h6 className="price-subheading">{props.subheading}</h6>}
      <div className="container mb-1">
        <div className="row justify-content-center">
          {props.offers.map((offer) => {
            return (
              <div className="col-md-4 col-xs-10" key={offer.name}>
                <div className="card pricing-box"style={{ boxShadow: offer.onSelect && offer.box_shadow }}>
                  <div className="card-body">
                    <h4 className="card-subtitle">{offer.name}</h4>
                    <h1 className="card-title d-inline">{offer.price}</h1>
                    <h5 className="d-inline">/month</h5>
                    {offer.price_id && <form action="/api/add-price-id" method="POST">
                      <input type="hidden" name="priceId" value={offer.price_id} />
                      <input type="hidden" name="email" value={offer.email} />
                      <Button className="mt-4" type="submit" role="link" onClick={()=>{nextPage();offer.setOnSelect(true);offer.resetOnSelect2(false);offer.resetOnSelect3(false)}}>
                        Select Plan</Button>
                    </form>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {props.buttontext && <a
          type="button"
          href="/pricing"
          className="mt-4 btn-style-thirteen green"
        >
          {props.buttontext}
        </a>}
        {props.dataAccount && <TrialForm
          dataAccount={props.dataAccount}
          dataForm={props.dataForm}
        />}
      </div>
    </div>
  );
}