import React, { useState } from 'react';

const PayContext = React.createContext()

const ProductProvider = (props) => {

    const [backData, setBackData] = useState({
        "invoiceCarrierName": '捐贈',
        "invoiceSecond": "13579陽光社福基金",
        "allInvoiceSecond": ["13579陽光社福基金", '其他'],
        'mainType': 0,
    })
    const [urlPath, setUrlPath] = useState("delivery");
    const [invoiceArea, setInvoiceArea] = useState("0");
    const [deliveryData, setDeliveryData] = useState({
        'location': '取卡地點',
        'day': '',
        'qty': 1,
        'name': '',
        'tel': '',
        'email': '',
        'warehouseId': '',
        'locationList': [],
        'personInfo': 1
    });
    const [soNumber, setSoNumber] = useState("");
    const [finishData, setFinishData] = useState([]);

    const [addBoolean, setAddBoolean] = useState(false); // 加不能按
    const [minusBoolean, setMinusBoolean] = useState(true); // 減不能按

    // 最後完成頁
    const updateFinishData = (value) => {
        setFinishData(value)
    }

    // pre so number
    const updateSoNumber = (value) => {
        setSoNumber(value)
    }

    const updateQty = (value) => {
        //console.log("--切換: 訂購數量------>", value)

        let total = deliveryData.qty + value
        //console.log("--切換: 訂購數量------>", total)
        if (total > 98) {
            setAddBoolean(true)
        } else if (total < 2) {
            setMinusBoolean(true)
        }
        else {
            setMinusBoolean(false)
            setAddBoolean(false)
        }
        setDeliveryData(oldValues => ({
            ...oldValues, ['qty']: total
        }));

    }

    const updateBackData = (value) => {
        //console.log("--更新:回放資料------>", value)
        setBackData(oldValues => (
            Object.assign({}, oldValues, value)
        ))
    }

    const updateInvoiceArea = (value) => {
        //console.log("--切換:發票顯示區塊------>", value)
        setInvoiceArea(value)
    }

    const updateUrl = (value) => {
        //console.log("--切換:URL------>", value)
        setUrlPath(value)
    }

    const updateDeliveryData = (value) => {
        //console.log("--切換:運送資料------>", value)
        setDeliveryData(oldValues => (
            Object.assign({}, oldValues, value)
        ))
    }



    //console.log("成立訂單------>", backData)
    return (
        <PayContext.Provider
            value={{
                backData: backData,
                updateBackData: updateBackData,
                urlPath: urlPath,
                updateUrl: updateUrl,
                invoiceArea: invoiceArea,
                updateInvoiceArea: updateInvoiceArea,
                deliveryData: deliveryData,
                updateDeliveryData: updateDeliveryData,
                updateQty: updateQty,
                soNumber: soNumber,
                updateSoNumber: updateSoNumber,
                finishData: finishData,
                updateFinishData: updateFinishData,
                addBoolean: addBoolean,
                minusBoolean: minusBoolean,
            }}
        >
            {props.children}
        </PayContext.Provider>
    )
}

const PayConsumer = PayContext.Consumer

export default ProductProvider
export { PayConsumer, PayContext }
