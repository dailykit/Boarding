import React, { PureComponent } from "react";
import VideoBanner from "./subcomponents/homepage/VideoBanners";
import ScheduleMeetingSection1 from "./subcomponents/shared/ScheduleMeetingSection1";
import BannerSection2 from "./subcomponents/shared/BannerSection2";
export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <BannerSection2
          headingSize2="3.75rem"
          highlightSize="5rem"
          backgroundColor="#111B2B"
          rightimageurl="/assets/images/phone.gif"
          heading={"Get your share of subscription Revenue at "}
          highlight={"$29"}
          heading2={"/month"}
          subheading={""}
          whitebuttontext={"GET STARTED"}
          buttonlink={"/onboard/signup"}
        />
        <VideoBanner/>
        <BannerSection2
          headingSize="2.75rem"
          descriptionSize="20px"
          backgroundColor="#fff"
          rightimageurl={"/assets/images/ImageBanner1.png"}
          heading={"Easy and Intuitive Sign Up Process"}
          bluesubheading={""}
          description="Customer Experience should be easy. With DailyKIT, get Higher Conversions and Customer Retention"
          descriptionpoints={[
            "Showcase Subscription Plans in Elegant Cards.",
            "Give your customers the control to choose from Item Count, Servings & Delivery Week-Day.",
            "Increase Conversions by funneling Customers to preview menus prior to signing up.",
          ]}
          imageFirst
          height="546px"
          width="546px"
        />
        <BannerSection2
          headingSize="2.75rem"
          descriptionSize="20px"
          backgroundColor="#fff"
          leftimageurl={"/assets/images/Fold 3.png"}
          heading={"Take Full Control of your Subscription Store"}
          bluesubheading={""}
          description=""
          descriptionpoints1={[
            "Create Custom Plans and Options",
            "Auto-Card Debit At Cut Off Time",
            "Offer Dynamic Delivery Prices",
          ]}
          descriptionpoints2={[
            "Set Weekly Start & Cutoff Time",
            "Precise Zip-Code Based Geo-Fencing for Delivery",
            "Configure Your Delivery Days",
          ]}
          
          height="546px"
          width="546px"
        />
        <BannerSection2
          headingSize="	2.75rem"
          descriptionSize="20px"
          backgroundColor="#fff"
          rightimageurl={"/assets/images/Fold 5.png"}
          heading={"Why Choose DailyKIT?"}
          bluesubheading={""}
          description="The Success Of Your Business depends on How quickly you can respond to Changing Trends"
          descriptionpoints={[
            "Add Permanent Items to Plans. For example,  Common & Most Sold Items could be added for each week",
            "Easily Add Your Rotating Items and Weekly Specials based on Each Week's activity",
            "Bulk Actions for Ease of Use so that you can Add Menu Items into multiple plans at once with ease",
            "Got a Premium Product? Add and price to it using Add On Prices."
          ]}
          imageFirst
          height="530px"
          width="460px"
        /><BannerSection2
          headingSize="	2.75rem"
          descriptionSize="20px"
          backgroundColor="#fff"
          leftimageurl={"/assets/images/Fold 6.png"}
          heading={"We are not done yet"}
          bluesubheading={""}
          description=""
          descriptionpoints1={[
            "Manage multiple categories for easy browsing",
            "SEO-Friendly URL-based pages for Products & Categories",
            "Product Tags for easy filtering and discoverability",
            "Mobile and Desktop Friendly so that you don’t miss out on any Customers"
          ]}
          descriptionpoints2={[
            "Display Your Beautiful Product Pictures for Higher Conversion",
            "Add Enticing product descriptions to Convert More",
            "Fully Integrated Social Media sharing for every product page",
          ]}
         
          height="494px"
          width="546px"
        /><BannerSection2
          headingSize="	2.75rem"
          descriptionSize="20px"
          backgroundColor="#fff"
          rightimageurl={"/assets/images/Fold 7.png"}
          heading={"Nope, still not done. We’ve got more"}
          bluesubheading={""}
          description="Customer Experience should be easy. With DailyKIT, get Higher Conversions and Customer Retention"
          descriptionpoints={[
            "Schedule your BreakFast, Lunch, Dinner or Daily/Weekly Recurring, Festive Menus.",
            "Control your food cost with Sales Price Recommendations",
            "Smart Insights with Automated Sales Reports with conversion details",
            "Create Smart Rewards, Vouchers and Coupons using our CRM",
            "Delivery Integrations Supporting Selected Delivery Partners from your locality"
          ]}
          imageFirst
          height="590px"
          width="550px"
        />

        <ScheduleMeetingSection1
          leftimageurl={"/assets/images/Fold 7.png"}
          heading={"If you still have questions, Talk to Us."}
          question1={"How Do You Schedule A Meeting?"}
          answer1={"Select the date on the calendar, the time slot, and then simply fill in your information. Done!"}
          question2={"What Happens After You Schedule A Meeting? "}
          answer2={"We will send you a calendar invite to your supplied email address with the Google Meet link at the scheduled date & time. In the event that you're unable to join by laptop/computer, we will call you on the given phone number"}
        />
      </div>
    );
  }
}
