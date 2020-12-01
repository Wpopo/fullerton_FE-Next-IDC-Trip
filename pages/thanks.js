
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { PayContext } from 'Components/Provider/PayProvider';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
import { ThanksWrapper } from 'Styled/thanksStyled';
import { Template } from 'Styled/commonStyled';
import Steppers from 'Components/common/Steppers';
import { CommonWrapper } from 'Styled/commonStyled';
import Helper from 'Lib/helper';

const invoice = {
    0: '捐贈',
    1: '個人戶',
    2: '公司戶',
}

const Thanks = () => {

    const [data, setData] = useState([]);
    const [isSucess, setIsSucess] = useState(false);
    const [showInvoice, setShowInvoice] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    const { finishData } = React.useContext(PayContext)

    const gotoHome = () => {
        Router.push('/')
    }

    const getOrderNumber = (value) => {
        let newValue = value.split('')
        for (let i = 0; i < 3; i++) {
            newValue.splice((i + 1) * 5 + i * 1, 0, ' ');
        }
        let finalValue = newValue.join('')
        setOrderNumber(finalValue)
    }

    const handleClick = () => {

        let redirect = ''
        switch (window.location.host) {
            case 'www.aircoolnet.com':
                redirect = 'https://www.idealcard.com.tw/member.php?arg=trade';
                break;
            default:
                redirect = 'https://beta-www.idealcard.com.tw/member.php?arg=trade';
        }

        if (isSucess) {
            location.href = redirect
        } else {
            Router.push('/')
        }
    }

    useEffect(() => {
        localStorage.removeItem('buy');
        Helper.screen.scrollToTop();
        if (finishData.length > 0) {
            setIsSucess(true)
            setData(finishData[0])
            setShowInvoice(invoice[finishData[0].invoice_carrier])
            getOrderNumber(finishData[0].so_number)
        } else {
            setIsSucess(false)
        }

    }, []);

    //console.log("---data->", data)

    return (

        <div>
            <CommonWrapper>
                <Header />
                <ThanksWrapper>
                    <Template>
                        <div className="siteMapText"><span className="one" onClick={gotoHome}>首頁</span><span>  > 酷遊卡</span></div>
                    </Template>
                    <div className="mainTitle">{isSucess ? "完成預訂" : "付款資料"}</div>
                    <Steppers step={isSucess ? 5 : 2} />
                    {
                        isSucess ?
                            <div>
                                <img src="../static/icon-ok.png" />
                                <div className="text">恭喜！您已付款成功，完成預訂，感謝您的訂購！</div>
                                <div className="contextBox">
                                    <div className="box">
                                        <div className="title">訂單編號</div>
                                        <div className="context">{orderNumber}</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">購買日期</div>
                                        <div className="context">{data.create_date}</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">取卡日期</div>
                                        <div className="context">{data.take_date}</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">取卡地點</div>
                                        <div className="context">{data.take_place}</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">購買商品</div>
                                        <div className="context">{data.line[0].product_name}
                                            <span className="gray">  X {data.line[0].quantity}</span>
                                        </div>
                                    </div>
                                    <div className="box">
                                        <div className="title">付款金額</div>
                                        <div className="context">NT$<span className="red"> {data.total}</span></div>
                                    </div>
                                    <div className="box">
                                        <div className="title">付款方式</div>
                                        <div className="context">信用卡刷卡</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">電子發票</div>
                                        <div className="context">{showInvoice}</div>
                                    </div>
                                    <div className="box">
                                        <div className="title">訂單狀態</div>
                                        <div className="context">成功</div>
                                    </div>
                                </div>
                                <div className="note">
                                    <div className="item">注意事項</div>
                                    <ul>
                                        <li>謝謝您的惠顧，富爾特能保有決定是否接受訂單及出貨與否之權利。我們將會寄一份完整的訂購明細至您的會員信箱供您留存。</li>
                                        <li>如果您有任何疑問，請來函至<a href="https://www.idealcard.com.tw/customer.php?arg=service" target="_blank">客服中心</a>或來電至 02-89124181，客服專員將竭誠為您服務。</li>
                                        <li>您也可以至我的交易紀錄中，查詢您的訂單。</li>
                                        <li>請依下訂時選擇之取卡日期，提供櫃檯人員列印之紙本憑證，或以手機出示訂單電子憑證上之QRcode 兌換商品。</li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div>
                                <img src="../static/icon-cross.png" />
                                <div className="text">交易失敗！</div>
                                <div className="note">
                                    <div className="item">貼心提醒</div>
                                    <ul>
                                        <li>本筆訂單已自動取消，若需繼續預訂，請您點選下方『重新預訂』。</li>
                                        <li>因酷遊卡網站不會紀錄您的信用卡資料，若須查詢交易失敗相關資訊，請向您的原發卡銀行查詢。</li>
                                        <li>您也可以至我的交易紀錄中，查詢您的訂單。</li>
                                        <li>請依下訂時選擇之取卡日期，提供櫃檯人員列印之紙本憑證，或以手機出示訂單電子憑證上之QRcode 兌換商品。</li>
                                    </ul>
                                </div>
                            </div>

                    }
                    <div className="button" onClick={() => handleClick()}>{isSucess ? '我的交易紀錄' : '重新預訂'}</div>
                </ThanksWrapper>
                < Footer />
            </CommonWrapper>
        </div >
    );
}

export default Thanks;