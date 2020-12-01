import React from 'react';
import ProductSummary from 'Components/Product/summary';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
import { CommonWrapper, IndexWrapper } from 'Styled/commonStyled';

const index = () => {
  return (
    <CommonWrapper>
      <Header />
      <IndexWrapper>
        <ProductSummary />
      </IndexWrapper>
      <Footer />
    </CommonWrapper>
  );
};

export default index;
