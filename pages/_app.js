import App, { Container } from 'next/app';
import { register, unregister } from 'next-offline/runtime';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from 'Styled/materialUITheme';
import MainProvider from 'Components/Provider/MainProvider';
import ProductProvider from 'Components/Provider/ProductProvider';
import MemberProvider from 'Components/Provider/MemberProvider';
import PayProvider from 'Components/Provider/PayProvider';

class MyApp extends App {
  componentDidMount() {
    // register sw
    register();
  }
  componentWillUnmount() {
    // unregister sw
    unregister();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MainProvider>
          <MemberProvider>
            <PayProvider>
              <ProductProvider>
                <MuiThemeProvider theme={muiTheme}>
                  <Component {...pageProps} />
                </MuiThemeProvider>
              </ProductProvider>
            </PayProvider>
          </MemberProvider>
        </MainProvider>
      </Container>
    );
  }
}

export default MyApp;
