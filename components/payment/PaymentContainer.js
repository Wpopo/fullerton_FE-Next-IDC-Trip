import React, { useEffect } from 'react';
import InputText from 'Components/common/InputText';
import Steppers from 'Components/common/Steppers';
import Select from 'Components/common/Select';
import CheckBox from 'Components/common/CheckBox';
import { ConfirmWrapper } from 'Styled/paymentStyled';
import StepButton from 'Components/common/StepButton';
import Dialog from 'Components/common/Dialog';
import PaymentDetail from 'Components/payment/PaymentDetail';
import { LabelButton } from 'Styled/commonStyled';
import { addressCode } from '../../static/addressCode';
import { PayConsumer, PayContext } from 'Components/Provider/PayProvider';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';
import Router from 'next/router';


// 需要確認資料list
const checkItem = {
    donation: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid'],
    other: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid', 'carrierId'],
    member: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid', 'name', 'city', 'town', 'address'],
    phone: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid', 'phoneCode'],
    cdc: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid', 'CDC'],
    company: ['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid', 'name', 'city', 'town', 'address', 'uniformNumber', 'title'],
};

const PaymentContainer = () => {

    const [cardMonth, setCardMonth] = React.useState(['MM'])
    const [cardYear, setCardYear] = React.useState(["YYYY"])
    const [invoiceMainItem, setInvoiceMainItem] = React.useState(['捐贈', '個人戶', '公司戶']) // 發票第一個欄位值
    const [invoiceSubItem, setInvoiceSubItem] = React.useState(null) // 發票第二個欄位值
    const [secSelect, setSecSelect] = React.useState('4') // 切換：發票第二區塊的內容：預設顯示的文字
    const [secList, setSecList] = React.useState('') // 切換：發票第二區塊的內容：選單內容
    const [errorMessage, setErrorMessage] = React.useState({}); // 錯誤訊息
    const [checkList, setCheckList] = React.useState(['checkedB', 'cardNumber', 'cardMonth', 'cardYear', 'cardValid']); // 確認list    
    const { soNumber, backData, updateBackData, updateFinishData } = React.useContext(PayContext)
    const [isDialog, setIsDialog] = React.useState(false)
    const [isLoadingButton, setLoadingButton] = React.useState(false)

    useEffect(() => {
        Helper.screen.scrollToTop();
    }, []);

    // 組出時間
    useEffect(() => {
        let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let year = Array.from({ length: 30 }, (v, k) => k + 2019);
        month.unshift('MM')
        year.unshift('YYYY')
        setCardMonth(month)
        setCardYear(year)
        //console.log(month)
    }, []);

    // 發票切換類型，組出第二欄位的選單
    useEffect(() => {
        setSecList('')
        if (secList == '捐贈') {
            //console.log("---捐贈--->")
            updateBackData({
                invoiceCarrierName: '捐贈',
                allInvoiceSecond: ["13579陽光社福基金", '其他'],
            })
            setSecSelect(1)
            setCheckList(checkItem.donation)
        }
        if (secList == '個人戶') {
            //console.log("---個人戶--->")
            updateBackData({
                invoiceCarrierName: '個人戶',
                allInvoiceSecond: ["會員載具", '手機條碼', '自然人憑證'],
            })
            setSecSelect(2)
            setCheckList(checkItem.member)
        }
        if (secList == '公司戶') {
            //console.log("---公司戶--->")
            updateBackData({
                invoiceCarrierName: '公司戶',
            })
            setSecSelect(0)
            setCheckList(checkItem.company)
        }
    }, [secList])

    // 子層傳送資料
    const passData = (value) => {
        //console.log("拿到--輸入-->", value)

        // 發票型態
        if (value['invoice']) {
            setInvoiceSubItem(['']) // 先把預選清單清掉
            setSecList(value['invoice']) // 再做一次map把清單存入
        }
        // 縣市取出鄉鎮
        if (value['city']) {
            let city = value['city']
            let area = [], townList = []
            addressCode.forEach((item) => {
                if (city.indexOf(item.CityName) !== -1) {
                    area = item.AreaList
                }
            })
            area.forEach((item) => {
                townList.push(item.AreaName)
            })

            updateBackData({
                city: value['city'],
                town: area[0].AreaName,
                zipCode: area[0].ZipCode,
                townList: townList,
                townZipCode: area,
            })
        }

        // 縣市取出鄉鎮
        if (value['town']) {

            let zipObj = backData['townZipCode'].filter((item) => {
                return item.AreaName == value['town']
            })

            updateBackData({
                town: value['town'],
                zipCode: zipObj[0].ZipCode,
            })
        }

        if (value['invoice'] == '捐贈') {
            updateBackData({
                mainType: 0,
                carrierId: '13579',
                invoiceSecond: "13579陽光社福基金",
            })
            setCheckList(checkItem.donation)
        }

        // 如果捐贈選了其他，carrierId要清掉值
        if (value['invoiceArea'] == '其他') {
            //console.log("----其他--->")
            updateBackData({
                invoiceSecond: "其他",
                mainType: 0,
                carrierId: '',
            })
            setCheckList(checkItem.other)
        }

        if (value['invoiceArea'] == '13579陽光社福基金') {
            updateBackData({
                invoiceSecond: "13579陽光社福基金",
                mainType: 0,
                carrierId: '13579',
            })
            setCheckList(checkItem.donation)
        }

        if (value['invoice'] == '個人戶' || value['invoiceArea'] == "會員載具") {
            updateBackData({
                invoiceSecond: '會員載具',
                mainType: 1,
                subType: 0,
            })
            setCheckList(checkItem.member)
        }

        if (value['invoiceArea'] == "手機條碼") {
            updateBackData({
                invoiceSecond: '手機條碼',
                mainType: 1,
                subType: 1,
            })
            setCheckList(checkItem.phone)
        }

        if (value['invoiceArea'] == "自然人憑證") {
            updateBackData({
                invoiceSecond: '自然人憑證',
                mainType: 1,
                subType: 2,
            })
            setCheckList(checkItem.cdc)
        }

        if (value['invoice'] == "公司戶") {
            updateBackData({
                mainType: 2,
            })
            setCheckList(checkItem.company)
        }

        if (!value['invoice'] && !value['invoiceArea'] && !value['city'] && !value['town']) {
            updateBackData(value)
        }

    }

    // 按下:確認--> 先確認必填欄位
    const handleNext = () => {
        //console.log("--->先確認必填欄位")
        setLoadingButton(true)

        // 資料來源
        let allData = backData;

        // 錯誤訊息
        let message = errorMessage;
        // 資料都正確，可以打api了
        let gotoNext = true;

        // 規則清單
        const regex = {

            number: (textInput) => {
                //console.log("--anme--->",textInput)
                const rule = /^[0-9]*$/;
                if (!rule.test(textInput)) {
                    return "請輸入數字"
                } else if (textInput.length < 1) {
                    return "此欄位為必填"
                } else {
                    return ""
                }
            },
            carrierId: (textInput) => {
                //console.log("--其他愛心碼--->",textInput)
                const rule = /^[0-9]*$/;
                if (!rule.test(textInput)) {
                    return "請輸入數字"
                } else if (textInput.length < 1) {
                    return "此欄位為必填"
                } else if (textInput.length > 50) {
                    return "超出50字元"
                } else {
                    return ""
                }
            },
            numValid: (textInput) => {
                //console.log("--anme--->",textInput)
                const rule = /^[0-9]*$/;
                if (!rule.test(textInput)) {
                    return "請輸入數字"
                } else if (textInput.length !== 3) {
                    return "請輸入3位數字"
                } else {
                    return ""
                }
            },
            uniform: (textInput) => {
                //console.log("--anme--->",textInput)

                const IdTaxNumberCheck = (idNum) => {

                    let validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
                        sum = 0,
                        calculate = function (product) { // 個位數 + 十位數
                            let ones = product % 10,
                                tens = (product - ones) / 10;
                            return ones + tens;
                        };

                    for (var i = 0; i < validateOperator.length; i++) {
                        sum += calculate(idNum[i] * validateOperator[i]);
                    }

                    if (sum % 10 == 0 || (idNum[6] == "7" && (sum + 1) % 10 == 0)) {
                        return false
                    }
                    //  失敗 
                    return true

                }

                const rule = /^[0-9]*$/;
                if (!rule.test(textInput)) {
                    return "請輸入數字"
                } else if (textInput.length < 1) {
                    return "此欄位為必填"
                } else if (textInput.length !== 8) {
                    return "請輸入正確統一編號"
                } else if (IdTaxNumberCheck(textInput)) {
                    return "請輸入正確統一編號"
                } else {
                    return ""
                }
            },
            numCard: (textInput) => {
                //console.log("--anme--->",textInput)
                const rule = /^[0-9]*$/;
                if (!rule.test(textInput)) {
                    return "請輸入數字"
                } else if (textInput.length !== 16) {
                    return "請輸入16位數字"
                } else {
                    return ""
                }
            },
            title: (textInput) => {
                if (!textInput) {
                    return "此欄位為必填"
                } else if (textInput.length > 50) {
                    return "超出50字元"
                } else {
                    return ""
                }
            },
            address: (textInput) => {
                if (!textInput) {
                    return "此欄位為必填"
                } else if (textInput.length > 250) {
                    return "超出250字元"
                } else {
                    return ""
                }
            },
            empty: (textInput) => {
                if (!textInput) {
                    return "此欄位為必填"
                } else {
                    return ""
                }
            },
            name: (textInput) => {
                //console.log("--anme--->", textInput)
                var length = textInput.replace(/[\u4e00-\u9fa5A-Za-z]/g, '').length > 0

                if (textInput.length > 50) {
                    return "字數請少於50個字";
                } else if (textInput.length < 2) {
                    return "請輸入完整姓名"
                } else if (length) {
                    return "請輸入中文或英文大小寫"
                } else {
                    return ""
                }
            },
            phoneCode: (textInput) => {
                //console.log("--手機條碼載具--->", textInput)

                let newcodePhone = textInput.replace(/[+./-]/g, '')
                const rule = /^[A-Z0-9]*$/;

                if (textInput.length !== 8) {
                    return "請輸入8碼手機條碼載具";
                } else if (!rule.test(newcodePhone)) {
                    return "請輸入大寫英文，數字"
                } else {
                    return ""
                }
            },
            CDC: (textInput) => {
                //console.log("--自然人憑證載具--->", textInput)
                const rule = /^[A-Z0-9]*$/;

                if (textInput.length !== 16) {
                    return "請輸入16碼自然人憑證載具";
                } else if (!rule.test(textInput)) {
                    return "請輸入大寫英文，數字"
                } else {
                    return ""
                }
            },
            check: (textInput) => {
                //console.log("--條款--->", textInput)
                if (!textInput) {
                    return "請確認條款"
                } else {
                    return ""
                }
            },
        }

        //檢查list
        const list = {
            cardNumber: regex.numCard,
            cardValid: regex.numValid,
            cardMonth: regex.empty,
            cardYear: regex.empty,
            carrierId: regex.carrierId,
            name: regex.name,
            city: regex.empty,
            town: regex.empty,
            address: regex.address,
            title: regex.title,
            uniformNumber: regex.uniform,
            phoneCode: regex.phoneCode,
            CDC: regex.CDC,
            checkedB: regex.check,
        };

        checkList.forEach((item) => {

            // 如果使用者沒有輸入，就當作空
            let inputValue = "";
            if (allData[item] === undefined) {
                inputValue = '';
            } else {
                inputValue = allData[item];
            }

            //console.log("--list->", list, item)
            let checkPoint = list[item](inputValue);

            //存入錯誤訊息
            message = { ...message, [item]: checkPoint };
            setErrorMessage(message)
            //console.log("--message->", message)

            // 有錯誤資料，不能打api
            if (checkPoint !== '') { gotoNext = false };
        })

        if (checkList.indexOf("carrierId") > 0 && gotoNext) {
            // 需要檢查 愛心碼api 
            Helper.fetch.GET(CONSTANTS.API.LOVE_CODE(allData['carrierId']), cb => {

                if (cb.data[0].isExist) {
                    //console.log('---成功-->')
                    checkDataValid(true)
                } else {
                    //console.log('---失敗-->')
                    checkDataValid(false)
                    message = { ...message, ['carrierId']: "請輸入正確愛心碼" };
                    setErrorMessage(message)
                }
            },
                () => {
                    checkDataValid(false)
                    message = { ...message, ['carrierId']: "系統錯誤，請稍後再試" };
                    setErrorMessage(message)
                });
        } else if (checkList.indexOf("phoneCode") > 0 && gotoNext) {
            //console.log("檢驗手機條碼",allData['phoneCode'])
            // 需要 檢驗手機條碼api 
            Helper.fetch.GET(CONSTANTS.API.BAR_CODE(allData['phoneCode']), cb => {
                if (cb.data[0].isExist) {
                    //console.log('手機條碼---成功-->')
                    checkDataValid(true)
                } else {
                    //console.log('手機條碼---失敗-->')
                    checkDataValid(false)
                    message = { ...message, ['phoneCode']: "請輸入正確手機條碼" };
                    setErrorMessage(message)
                }
            },
                () => {
                    checkDataValid(false)
                    message = { ...message, ['phoneCode']: "系統錯誤，請稍後再試" };
                    setErrorMessage(message)
                });
        } else {
            //console.log('other------->',gotoNext)
            checkDataValid(gotoNext)
        }
    }

    // 確認要不要打api
    const checkDataValid = (value) => {
        if (value) {
            //console.log("2222--資料--成功--跳轉--Api-->")
            makeData()
        } else {
            //console.log("11111--資料--失敗-->")
            setLoadingButton(false)
        }
    }

    // 組出Api資料--> (先發票的資訊)
    const makeData = () => {

        let invoiceData = {}

        if (backData.mainType == 0) {
            //console.log("--捐贈-->")
            // 捐贈
            invoiceData = {
                "invoice_carrier": '0',
                "carrier_id": backData.carrierId || '13579',
            }
        }

        if (backData.mainType == 1 && backData.subType == 0) {
            //console.log("--會員載具-->")
            // 會員載具
            invoiceData = {
                "invoice_carrier": '1',
                "name": backData.name,
                "zip_code": backData.zipCode,
                "city": backData.city,
                "address": backData.address,
            }
        }

        if (backData.mainType == 1 && backData.subType == 1) {
            // 手機載具
            //console.log("------手機載具-----打api----->")
            invoiceData = {
                "invoice_carrier": '2',
                "media_id": backData.phoneCode,
            }
        }

        if (backData.mainType == 1 && backData.subType == 2) {
            // 自然人
            //console.log("------自然人-----打api----->")
            invoiceData = {
                "invoice_carrier": '3',
                "CDC_id": backData.CDC,
            }
        }

        if (backData.mainType == 2) {
            // 公司戶
            //console.log("------公司戶-----打api----->")

            invoiceData = {
                "invoice_carrier": '4',
                "title": backData.title,
                "uniform_number": backData.uniformNumber,
                "name": backData.name,
                "zip_code": backData.zipCode,
                "city": backData.city,
                "address": backData.address,
            }
        }

        gotoOrderApi(invoiceData)
    }

    // 打Api: 成立訂單
    const gotoOrderApi = (invoiceData) => {
        //console.log("進入----正式::::訂單----更新---->")

        const token = CONSTANTS.STORAGE.GET.TOKEN();
        let data = {
            "payment_gateway": "1",
            "bank_code": "812",
            "card": {
                "card_id": backData.cardNumber,
                "expire_date": `${backData.cardYear}/${backData.cardMonth}`,
                "check_code": backData.cardValid,
            },
            "invoice": invoiceData
        };

        let headersObj = {
            headers: {
                'content-type': 'application/json',
                'ftc-token': token
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }


        Helper.fetch.POST(CONSTANTS.API.UPDATE_ORDER(soNumber), cb => {
            updateFinishData(cb)
            Router.push('/thanks')

        }, null, headersObj);
    }

    // 打開條款
    const openTerms = (value) => {
        setIsDialog(value)
    }

    //console.log('---errorMessage--->', errorMessage)
    let cityArray = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣", "澎湖縣", "金門縣", "連江縣"]
    return (
        <PayConsumer>
            {({ backData, updateUrl, invoiceArea }) => (
                <ConfirmWrapper>
                    {
                        isDialog ? <Dialog openTerms={openTerms} /> : null
                    }
                    <div className="mainTitle">付款資料</div>
                    <Steppers step={2} />
                    <div className="container">
                        <div className="stepTitile">確認訂單</div>
                        <PaymentDetail />
                        <div className="stepTitile inline">付款方式</div>
                        <LabelButton>
                            信用卡
                        </LabelButton>
                        <div className="payBase">
                            <div className="block">
                                <InputText maxLength={16} placeholder={"卡號"} defaultValue={backData.cardNumber} width={'100%'} passData={passData} name={'cardNumber'} error={errorMessage.cardNumber} />
                            </div>
                            <div className="block">
                                <Select double={true} data={cardMonth} defaultValue={backData.cardMonth || cardMonth[0]} width={'160px'} passData={passData} item={'cardMonth'} error={errorMessage.cardMonth} />
                                <Select double={true} data={cardYear} defaultValue={backData.cardYear || cardYear[0]} width={'160px'} passData={passData} item={'cardYear'} error={errorMessage.cardYear} />
                                <InputText maxLength={3} placeholder={"後三碼"} defaultValue={backData.cardValid} width={'450px'} passData={passData} name={'cardValid'} error={errorMessage.cardValid} />
                            </div>
                        </div>
                        <div className="stepTitile inline">發票類型</div>
                        <div className="invoiceBase">

                            <div className="block">
                                <Select data={invoiceMainItem} defaultValue={backData.invoiceCarrierName} width={'245px'} passData={passData} item={'invoice'} />
                                {invoiceArea != 5 && <Select confere={secSelect} data={backData.allInvoiceSecond} defaultValue={backData.invoiceSecond} width={'245px'} passData={passData} item={'invoiceArea'} />}
                            </div>

                            {invoiceArea == 1 ?
                                <div className="block">
                                    <InputText placeholder={"輸入捐贈碼"} defaultValue={backData.carrierId} name={'carrierId'} width={'245px'} passData={passData} error={errorMessage.carrierId} />
                                    <div className="loveCodeLink"><a href="https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/" target="_blank">愛心碼查詢</a></div>
                                </div>
                                : null
                            }
                            {invoiceArea == 2 ?
                                <div style={{ width: '500px' }}>
                                    <div className="block">
                                        <InputText placeholder={"請填寫發票收件人姓名"} defaultValue={backData.name} name={'name'} width={'245px'} passData={passData} error={errorMessage.name} />
                                    </div>
                                    <div className="block">
                                        <Select double={true} data={cityArray} defaultValue={backData.city || '縣市'} item={'city'} width={'245px'} passData={passData} error={errorMessage.city} />
                                        <Select double={true} data={backData.townList || []} townFlag={backData.town} defaultValue={backData.town || '鄉鎮地區'} item={'town'} width={'245px'} passData={passData} error={errorMessage.town} />
                                    </div>
                                    <div className="block">
                                        <InputText placeholder={"請填寫發票收件地址"} defaultValue={backData.address} name={'address'} width={'100%'} passData={passData} error={errorMessage.address} />
                                    </div>
                                </div>
                                : null
                            }
                            {invoiceArea == 3 ?
                                <div>
                                    <div className="block">
                                        <InputText placeholder={"請輸入載具條碼"} defaultValue={backData.phoneCode} name={'phoneCode'} width={'245px'} passData={passData} error={errorMessage.phoneCode} />
                                    </div>
                                </div>
                                : null
                            }
                            {invoiceArea == 4 ?
                                <div>
                                    <div className="block">
                                        <InputText placeholder={"請輸入自然人憑證"} defaultValue={backData.CDC} name={'CDC'} width={'245px'} passData={passData} error={errorMessage.CDC} />
                                    </div>
                                </div>
                                : null
                            }
                            {invoiceArea == 5 ?
                                <div style={{ width: '500px' }}>
                                    <div className="block">
                                        <InputText maxLength={8} placeholder={"請輸入統一編號"} defaultValue={backData.uniformNumber} name={'uniformNumber'} width={'245px'} passData={passData} error={errorMessage.uniformNumber} />
                                        <InputText placeholder={"請輸入公司名稱"} defaultValue={backData.title} name={'title'} width={'245px'} passData={passData} error={errorMessage.title} />
                                    </div>
                                    <div className="block">
                                        <InputText placeholder={"請填寫發票收件人姓名"} defaultValue={backData.name} name={'name'} width={'100%'} passData={passData} error={errorMessage.name} />
                                    </div>
                                    <div className="block">
                                        <Select double={true} data={cityArray} defaultValue={backData.city || '縣市'} passData={passData} item={'city'} width={'245px'} error={errorMessage.city} />
                                        <Select double={true} data={backData.townList || []} townFlag={backData.town} defaultValue={backData.town || '鄉鎮地區'} item={'town'} width={'245px'} passData={passData} error={errorMessage.town} />
                                    </div>
                                    <div className="block">
                                        <InputText placeholder={"請填寫發票寄送地址"} defaultValue={backData.address} width={'100%'} name={'address'} passData={passData} error={errorMessage.address} />
                                    </div>
                                </div>
                                : null
                            }

                        </div>

                        <div className="terms">
                            <CheckBox />
                            本人已詳閱並同意<span onClick={() => openTerms(true)}>相關服務條款</span>
                            {errorMessage.checkedB && <div className="errorText">{errorMessage.checkedB}</div>}
                        </div>
                        <div className="check">
                            <StepButton tetx={'確認付款'} handleNext={handleNext} isLoading={isLoadingButton} handleBefore={() => updateUrl('delivery')} />
                        </div>
                    </div>
                </ConfirmWrapper>
            )}
        </PayConsumer>
    )
}

export default PaymentContainer;