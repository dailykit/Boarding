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
          <script defer src="/googleTagManager.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;


