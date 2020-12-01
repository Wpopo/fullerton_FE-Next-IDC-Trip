import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import DeliveryContainer from 'Components/delivery/DeliveryContainer';
import PaymentContainer from 'Components/payment/PaymentContainer';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
import { Template } from 'Styled/commonStyled';
import { PayConsumer } from 'Components/Provider/PayProvider';
import { CommonWrapper } from 'Styled/commonStyled';

const Payment = () => {
  const gotoHome = () => {
    Router.push('/');
  };

  useEffect(() => {
    // 沒有pid
    if (localStorage.getItem("buy") === null) {
      Router.push('/');
    } 

    // 沒有token
    if (
      localStorage.getItem('token') === null &&
      location.href.indexOf('?sessionId') < 0
    ) {
      Router.push('/');
    }
  }, []);

  return (
    <PayConsumer>
      {({ urlPath }) => (
        <div>
          <CommonWrapper>
            <Header />
            <Template>
              <div className="siteMapText"><span className="one" onClick={gotoHome}>首頁</span><span>  > 酷遊卡</span></div>
              {urlPath == 'delivery' && <DeliveryContainer />}
              {urlPath == 'pay' && <PaymentContainer />}
            </Template>
            <Footer />
          </CommonWrapper>
        </div>
      )}
    </PayConsumer>
  );
};

export default Payment;
