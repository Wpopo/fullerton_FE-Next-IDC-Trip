import React from 'react';
import Router from 'next/router';
import CONSTANTS from 'Components/constants';

const MainContext = React.createContext();

const MainProvider = props => {
  const viewList = CONSTANTS.VIEW;

  // 導向首頁
  const goToIndex = () => {
    Router.push('/index');
  };

  // 導向商品詳細頁
  const goToBooking = (cataID, pID) => {
    setBookingInfo(cataID, pID);
    Router.push('/booking');
  };

  // 導向訂購頁
  const goToProcess = pID => {
    setBuyInfo(pID);
    window.open(
      CONSTANTS.API.LOGIN(location.origin + '/process'),
      '_self'
    );
  };

  // 設定 目前顯示 商品資訊
  const setBookingInfo = (cataID, pID) => {
    CONSTANTS.STORAGE.SET.BOOKING(JSON.stringify({ cataID, pID }));
  };

  // 回傳 目前顯示 商品資訊
  const getBookingInfo = () => {
    return CONSTANTS.STORAGE.GET.BOOKING();
  };

  // 設定 欲訂購 商品資訊
  const setBuyInfo = pID => {
    CONSTANTS.STORAGE.SET.BUY(JSON.stringify({ pID }));
  };

  // 回傳 欲訂購 商品資訊
  const getBuyInfo = () => {
    return CONSTANTS.STORAGE.GET.BUY();
  };

  return (
    <MainContext.Provider
      value={{
        viewList,
        goToIndex,
        goToBooking,
        goToProcess,
        setBookingInfo,
        getBookingInfo,
        setBuyInfo,
        getBuyInfo
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

const MainConsumer = MainContext.Consumer;

export default MainProvider;
export { MainConsumer, MainContext };
