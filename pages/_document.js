import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => ({
            ...sheet.collectStyles(<App {...props} />),
            ...sheets.collect(<App {...props} />)
          })
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html type='text/html'>
        <Head>
          {/* <link
            rel='icon'
            href='../../static/common/favicon.png'
            type='image/x-icon'
          /> */}
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <meta name='format-detection' content='telephone=no' />
          {this.props.styleTags}
          <style>{`
            body {
              margin: auto;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
              -webkit-transition-delay: 99999s;
              -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
            }
          `}</style>

          {/* Google Font */}
          <link
            href='https://fonts.googleapis.com/css?family=Noto+Sans+TC:100,300,400,500,700,900&display=swap&subset=chinese-traditional'
            rel='stylesheet'
          />

          {/* Reack-slick */}
          <link
            rel='stylesheet'
            type='text/css'
            charSet='UTF-8'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
          />
          <link
            rel='stylesheet'
            type='text/css'
            charSet='UTF-8'
            href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
