import React from 'react';
import ProductDetail from 'Components/Product/detail';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
import { CommonWrapper, IndexWrapper } from 'Styled/commonStyled';

const booking = () => {
  return (
    <CommonWrapper>
      <Header />
      <IndexWrapper>
        <ProductDetail />
      </IndexWrapper>
      <Footer />
    </CommonWrapper>
  );
};

export default booking;
