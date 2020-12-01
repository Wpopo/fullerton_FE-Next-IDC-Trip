import React, { useState } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';

const MemberContext = React.createContext();

const MemberProvider = props => {
  // token
  const [token, setToken] = useState(null);
  // 會員姓名
  const [name, setName] = useState('');
  // 會員信箱
  const [mail, setMail] = useState('');
  // 會員電話
  const [phone, setPhone] = useState('');

  // 設定Token 並取得會員資料
  const handleToken = t => {
    setToken(t);
    getMemberInfo(t);
  };

  const getMemberInfo = t => {
    Helper.fetch.GET(
      CONSTANTS.API.MEMBER,
      cb => {
        if (cb !== undefined) {
          setName(cb.Name);
          setPhone(cb.Mobile);
          setMail(cb.Email);
          CONSTANTS.STORAGE.SET.TOKEN(t);
        } else {
        }
      },
      null,
      {
        'Content-Type': 'application/json',
        'ftc-token': t
      }
    );
  };

  const getStorageToken = () => CONSTANTS.STORAGE.GET.TOKEN();
  const clearStorageToken = () => {
    setToken(null);
    CONSTANTS.STORAGE.SET.TOKEN('');
  };

  return (
    <MemberContext.Provider
      value={{
        token,
        handleToken,
        getStorageToken,
        clearStorageToken,
        name,
        mail,
        phone
      }}
    >
      {props.children}
    </MemberContext.Provider>
  );
};

const MemberConsumer = MemberContext.Consumer;

export default MemberProvider;
export { MemberConsumer, MemberContext };
