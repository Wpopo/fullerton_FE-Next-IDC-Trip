import React from 'react';
import { PayConsumer } from 'Components/Provider/PayProvider';

const PaymentDetail = () => {
    return (
        <PayConsumer>
            {({ deliveryData }) => (
                <div className="orderInfo">
                    <div className="infoBox">
                        <div className="title">送貨資訊</div>
                        <div className="moreInfoWrapper">
                            <div className="moreInfo">
                                <div className="left">取卡日期</div>
                                <div className="right">{deliveryData.day}</div>
                            </div>
                            <div className="moreInfo">
                                <div className="left">取卡地點</div>
                                <div className="right">{deliveryData.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="infoBox">
                        <div className="title">商品資訊</div>
                        <div className="priceWrapper price">
                            <div className="left">{deliveryData.productName}<span>X</span>
                                <span>{deliveryData.qty}</span>
                            </div>
                            <div className="right">NT$<span>{deliveryData.price}</span>
                            </div>
                        </div>
                    </div>
                    <div className="infoBox">
                        <div className="title">運費</div>
                        <div className="priceWrapper">
                            <div className="left">免運</div>
                            <div className="right">NT$<span>0</span>
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="infoBox total">
                        <div className="title">總計</div>
                        <div className="priceWrapper">
                            <div className="left"></div>
                            <div className="right">NT$<span className="red">{
                                (deliveryData.price) * (deliveryData.qty)
                            }</span>
                            </div>
                        </div>
                    </div>
                    <div className="infoBox">
                        <div className="title">取卡人資訊</div>
                        <div className="personWrap">
                            <div className="personItem">姓名<br />電話<br />E-mail</div>
                            <div className="personData">
                                <div className="subItem">{deliveryData.name}</div>
                                <div className="subItem">{deliveryData.tel}</div>
                                <div className="subItem">{deliveryData.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PayConsumer>
    )
}

export default PaymentDetail;