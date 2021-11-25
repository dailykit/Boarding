import React from "react";
import { useRouter } from "next/router";
import { Button } from "../../styled";
import { useMutation } from "@apollo/client";
import { useAuth } from "../../../store/auth";
import { UPDATE_ORGANIZATION } from "../../../graphql";
import Image from "next/image";
export default function PricingSection1(props) {
  const router = useRouter();
  const { user } = useAuth();
  const [update] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: () => {
      router.push("/onboard/signup/card-details");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const nextPage = () => {
    update({
      variables: {
        id: user.organization.id,
        _set: {
          onboardStatus: "CARD_DETAILS",
        },
      },
    });

    console.log(user);
  };
  return (
    <div className="nunito pricingsection1">
      <div className="container mb-1">
        <div className="row justify-content-start">
          {props.offers.map((offer) => {
            return (
              <div className="col-md-12 col-xs-2" key={offer.name}>
                <div className="card pricing-box">
                  <div className="card-body">
                    <div className="row">
                      <div
                        className="col-md-4 col-xs-2"
                        style={{ marginTop: "-60px", marginLeft: "-60px" }}
                      >
                        <Image
                          width="240px"
                          height="200px"
                          src="https://s3.us-east-2.amazonaws.com/dailykit.org/onboarding/images/Select_Plan.png"
                          alt="select-plan"
                        />
                      </div>
                      <div
                        className="col-md-4 col-xs-2 mt-18px"
                        style={{ marginLeft: "60px" }}
                      >
                        <h1 className="card-title d-inline">{offer.price}</h1>
                        <h5 className="d-inline price-duration">/month</h5>
                      </div>

                      <div className="col-md-4 col-xs-2 mt-28px">
                        {offer.price_id && (
                          <form action="/api/add-price-id" method="POST">
                            <input
                              type="hidden"
                              name="priceId"
                              value={offer.price_id}
                            />
                            <input
                              type="hidden"
                              name="email"
                              value={offer.email}
                            />
                            <button
                              className="pricing-button"
                              type="submit"
                              role="link"
                              onClick={() => {
                                nextPage();
                                offer.setOnSelect(true);
                              }}
                            >
                              CONTINUE
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
