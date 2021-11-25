import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dailykit | Home</title>
        <meta
          name="Dailykit: The Only Trend-Responsive Food-Tech Solution You'll Ever Need."
          content="Dailykit is the only trend responsive platform that allows you to sell anything from Meal Kits, Meal Prep, Subscription, On Demand, Ready to Eat, Grocery..,etc and manage Operations like a boss with Inventory, Recipe Management, Menu Management, Product Management, Manage Ghost Brands, Order Management and Delivery Tracking and many more."
        />
        <meta
          property="og:title"
          content="Dailykit: The only trend responsive platform that you'll ever need."
          key="ogtitle"
        />
        <meta property="og:url" content="https://dailykit.org" />
        <meta
          property="og:description"
          content="Dailykit is the only trend responsive platform that allows you to sell anything from Meal Kits, Meal Prep, Subscription, On Demand, Ready to Eat, Grocery..,etc and manage Operations like a boss with Inventory, Recipe Management, Menu Management, Product Management, Manage Ghost Brands, Order Management and Delivery Tracking and many more."
          key="ogdesc"
        />
      </Head>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
