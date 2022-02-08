import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="/env-config.js" />
        </Head>
        <body>
          <div id="portal" />
          <Main />
          <NextScript />
          <script defer src="/analytics.js" />
          <script defer src="/facebook.js" />
          <script defer src="/googleTagManager.js" />
          <div id="fb-root"></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v10.0'
              });
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `,
            }}
          />

          <div className="fb-customerchat"
            attribution="page_inbox"
            page_id="454878825266203">
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;


