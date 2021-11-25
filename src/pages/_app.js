import "../styles/globals.css";
import Head from "next/head";
import React from 'react';
import { ApolloProvider } from '../lib/apollo';
import { AuthProvider } from '../store/auth';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        />
        {/* <!-- JavaScript Bundle with Popper --> */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
          crossOrigin="anonymous"
          defer
        ></script>

        <link
          href="https://fonts.googleapis.com/css2?family=Chivo:wght@100;400;700;900&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-206516548-1"></script>
        {/* facebook pixel */}
        <noscript><img src="https://www.facebook.com/tr?id=341238817743831&ev=PageView&noscript=1" height="1" width="1" style={{ "display": "none" }}
        /></noscript>
        {/* calendly form */}
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        ></script>

        {/* meta tags */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter" content="dailykitorg" key="twhandle" /> */}

        <meta property="og:type" content="website" key="ogsitetype" />
        <meta property="og:site_name" content="Dailykit" key="ogsitename" />
        <meta
          property="og:image"
          content="https://s3.us-east-2.amazonaws.com/dailykit.org/onboarding/images/Logo.png"
          key="ogimage"
        />
        <link rel="icon" href="/Dailykit Icon.png" />
      </Head>
      <ApolloProvider>
        <AuthProvider>
          <Component {...pageProps} />;
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;


