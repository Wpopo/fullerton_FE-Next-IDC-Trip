import React, { useEffect } from 'react';
import Pickers from 'Components/delivery/DeliveryTime';
import DeliveryProduct from 'Components/delivery/DeliveryProduct';
import { DeliveryWrapper } from 'Styled/paymentStyled';
import Steppers from 'Components/common/Steppers';
import InputText from 'Components/common/InputText';
import StepButton from 'Components/common/StepButton';
import Select from 'Components/common/Select';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';
import { PayConsumer, PayContext } from 'Components/Provider/PayProvider';
import { ProductContext } from 'Components/Provider/ProductProvider';
import { MainContext } from 'Components/Provider/MainProvider';
import { MemberContext } from 'Components/Provider/MemberProvider';
import Router from 'next/router';

// 注意事項
const notices = [
  {
    mian: '',
    subTitle: '',
    label: [
      '櫃台營業時間<span class="blue">AM 6:00~AM 24:00</span>，僅限於營業時間內提供取卡服務，若出國航班時間及到達機場時間為營業時間外，將不受理與負責，敬請留意"出國當日"到達機場的時間。',

    ],
    example: []
  },
  {
    mian: '【機場取卡說明】',
    subTitle: '',
    label: [
      '請提供「護照或身分證件」及「訂單確認信畫面」前往領卡。',
      '請於取卡日當天在櫃台營業時間內(<span class="blue">6~24</span>)前往取件；<span class="red">最晚取卡日</span>為預訂取卡日期+7天。',
      '櫃台僅供卡片領取，恕不提供開卡協助/說明等相關服務，敬請見諒。'
    ],
    example: []
  },
  {
    mian: '【機場取件，無鑑賞期退換貨規則】',
    subTitle: '桃園機場取卡：',
    label: [
      '訂購日的隔日中午12:00之前可免費取消訂單，商品款項及運費將會辦理退款；訂購日的隔日中午12:00之後取消訂單，商品款項將會辦理退款，但會收取手續費40元。</br>*如因物流未配卡導致退卡情況，則不在此限。',
      '已取卡一律不接受退貨。 ',
    ],
    example: []
  },
  {
    mian: '',
    subTitle: '舉例',
    label: [],
    example: [
      '若訂購日為<span class="red">2019/6/15 下午 19:59:04</span>，於訂購日隔日中午12點前(<span class="red">2019/06/16 中午12:00 前</span>)，則可免費取消。於訂購日隔日中午12點後(<span class="red">2019/06/16 中午12:00之後</span>)，若取消訂單，商品款項將會辦理退款，但須負擔手續費40元。',
    ]
  },
  {
    mian: '【未取卡說明】',
    subTitle: '',
    label: [
      '消費者若選擇機場櫃台取卡時，未於最晚取卡日(預訂取卡日期+7天)當天取貨，貨品將自動退回本公司，且視同隔日訂單自動取消；貨品款項將會辦理退款，但會酌收未取貨件手續費40元。',
    ],
    example: []
  },
  {
    mian: '',
    subTitle: '舉例',
    label: [],
    example: [
      '您的預約取卡日期為<span class="red">2019/06/18</span>，則最晚取卡日期為<span class="red">2019/06/25</span>，請務必於最晚取卡日期櫃台營業時間前前往取卡，若逾期未取卡，則視同隔日訂單自動取消，將收取手續費$40元。',
    ],
  },
];

const DeliveryContainer = () => {
  const [locationList, setLocationList] = React.useState(['取卡地點']); //location
  const [errorMessage, setErrorMessage] = React.useState({}); // 錯誤訊息
  const [isNoticeOpen, setOpenNotice] = React.useState(false);
  const [pId, setPId] = React.useState(''); // 商品id
  const [isLoadingButton, setLoadingButton] = React.useState(false)

  const {
    updateUrl,
    deliveryData,
    updateDeliveryData,
    updateSoNumber
  } = React.useContext(PayContext);

  const { getProductInfo, ProductList, checkAPI } = React.useContext(
    ProductContext
  );
  const { getBuyInfo } = React.useContext(MainContext);
  const { name, mail, phone } = React.useContext(MemberContext);

  // 取卡地點Api
  useEffect(() => {
    Helper.fetch.GET(CONSTANTS.API.TAKE_PLACE, cb => {
      if (cb !== undefined) {
        //console.log('取卡地點', cb);
        let arr = ['取卡地點'];
        cb.filter(item => {
          arr.push(item.name);
        });
        setLocationList(arr);
        updateDeliveryData({ locationList: cb });
      }
    });
  }, []);

  // 取卡人資訊
  useEffect(() => {
    //console.log("name", name)
    if (deliveryData.personInfo == 1) {
      updateDeliveryData({
        name: name,
        tel: phone,
        email: mail
      });
    }
  }, [name, mail, phone]);

  // 取得產品資料
  useEffect(() => {
    if (ProductList) {
      // 取得新的產品資訊
      const value = getBuyInfo();

      if (value) {
        const pID = JSON.parse(value).pID;
        let data = getProductInfo(pID);
        updateDeliveryData({
          productName: data.productName,
          price: data.price
        });
        setPId(pID);
      } else {
        Router.push('/');
      }
    } else {
      checkAPI();
    }
  }, [ProductList]);

  useEffect(() => {
    Helper.screen.scrollToTop();
  }, []);

  // 子層傳送資料
  const passData = value => {
    //console.log('拿到--輸入的資料-->', value);

    if (value['location'] == '取卡地點') {
      updateDeliveryData({
        location: '取卡地點',
        warehouseId: ''
      });
    } else if (value['location'] && value['location'] != '取卡地點') {
      let id = deliveryData.locationList.filter(element => {
        return element.name == value['location'];
      });
      //console.log(id)
      updateDeliveryData({
        location: value['location'],
        warehouseId: id[0].warehouse_id
      });
    } else {
      updateDeliveryData(value);
    }
  };

  // 按下一步，打preSo前的確認
  const handleNext = () => {
    setLoadingButton(true)

    // 資料來源
    let allData = deliveryData;
    // 需要確認的list
    let checkList = ['location', 'day', 'name', 'tel', 'email'];
    // 錯誤訊息
    let message = errorMessage;
    // 資料都正確，可以打api了
    let gotoNext = true;

    // 規則清單
    const regex = {
      location: textInput => {
        if (textInput == '取卡地點') {
          return '請選擇取卡地點';
        } else {
          return '';
        }
      },
      empty: textInput => {
        if (!textInput) {
          return '此欄位為必填';
        } else {
          return '';
        }
      },
      name: textInput => {
        //console.log("--anme--->", textInput)
        var length = textInput.replace(/[\u4e00-\u9fa5A-Za-z]/g, '').length > 0;

        if (textInput.length > 50) {
          return '字數請少於50個字';
        } else if (textInput.length < 1) {
          return '此欄位為必填';
        } else if (length) {
          return '請輸入中文或英文大小寫';
        } else {
          return '';
        }
      },
      tel: textInput => {
        //console.log("--anme--->",textInput)
        const rule = /^[0-9]*$/;
        if (!rule.test(textInput)) {
          return '請輸入數字';
        } else if (textInput.length < 1) {
          return '此欄位為必填';
        } else {
          return '';
        }
      },
      email: textInput => {
        const rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (textInput.length > 100) {
          return '字數請少於100個字';
        } else if (textInput.length < 1) {
          return '此欄位為必填';
        } else if (!rule.test(textInput)) {
          return '請輸入正確email格式';
        } else {
          return '';
        }
      }
    };

    //檢查list
    const list = {
      location: regex.location,
      day: regex.empty,
      name: regex.name,
      tel: regex.tel,
      email: regex.email
    };

    checkList.forEach(item => {
      // 如果使用者沒有輸入，就當作空
      let inputValue = '';
      if (allData[item] === undefined) {
        inputValue = '';
      } else {
        inputValue = allData[item];
      }

      let checkPoint = list[item](inputValue);

      //存入錯誤訊息
      message = { ...message, [item]: checkPoint };
      setErrorMessage(message);
      //console.log("--message->", message)

      // 有錯誤資料，不能打api
      if (checkPoint !== '') {
        gotoNext = false;
      }
    });

    if (gotoNext) {
      //console.log('--資料OK--跳轉--Api-->');
      gotoPreSoApi();
    } else {
      //console.log('--失敗---->');
      setLoadingButton(false)
    }
  };

  // goto-pre-OrderApi
  const gotoPreSoApi = () => {
    //console.log('進入----成立pre訂單-------->');

    const token = CONSTANTS.STORAGE.GET.TOKEN();
    let data = {
      seller_id: '1',
      type:'2',
      shoppingCart: [
        {
          product_id: pId,
          quantity: deliveryData.qty
        }
      ],
      take_date: deliveryData.day,
      warehouse_id: deliveryData.warehouseId,
      buyer_name: deliveryData.name,
      buyer_phone: deliveryData.tel,
      buyer_email: deliveryData.email
    };

    let headersObj = {
      headers: {
        'content-type': 'application/json',
        'ftc-token': token
      },
      method: 'POST',
      body: JSON.stringify(data)
    };

    Helper.fetch.POST(
      CONSTANTS.API.ORDER,
      cb => {
        if (cb !== undefined && !cb['errors']) {
          //console.log('----->成立訂單-pre->', cb);
          updateSoNumber(cb['so_number']);
          updateDeliveryData({
            personInfo: 2
          });
          //成功 轉跳
          updateUrl('pay');
        }
      },
      null,
      headersObj
    );
  };

  // 注意事項
  const handleOpenNotice = () => {
    setOpenNotice(!isNoticeOpen);
  };

  // 導回booking頁
  const gotoBooking = () => {
    Router.push('/');
  };

  //console.log("取得資料---->", deliveryData)
  return (
    <PayConsumer>
      {({ deliveryData }) => (
        <DeliveryWrapper>
          <div className='mainTitle'>填寫資料</div>
          <Steppers step={1} />
          <div className='container'>
            <div className='stepTitile'>送貨資訊</div>
            <Pickers
              passData={passData}
              error={errorMessage.day}
              defaultValue={deliveryData.day}
            />
            <div className='dateNote'>
              ▲【注意】此為預訂取卡日期，可當天線上預訂當天取卡！若未依約定日期(最晚取卡日)前往取卡，則視同隔日訂單自動取消，將收取手續費$40元。
            </div>
            <div className='locationBox'>
              <img src='../../static/icon-Location.png' />
              <Select
                error={errorMessage.location}
                data={locationList}
                defaultValue={deliveryData.location}
                width={'500px'}
                padding={'53px'}
                passData={passData}
                item={'location'}
              />
              <div className='noteButton' onClick={() => handleOpenNotice()}>
                注意事項
              </div>
            </div>
            {isNoticeOpen ? (
              <div className='noteSection'>
                {notices.map((list, index) => {
                  return (
                    <div className="noteBox" key={index}>
                      <span>{list.mian}</span>
                      <span className="subTitle">{list.subTitle}</span>
                      <ul>
                        {list.label.map((item, key) => {
                          return <li key={key} dangerouslySetInnerHTML={{ __html: item }}></li>;

                        })}
                      </ul>
                      <div>
                        {list.example.map((item, key) => {
                          return <div className="example" key={key} dangerouslySetInnerHTML={{ __html: item }}></div>;

                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <DeliveryProduct />
            {/*errorMessage.qty && <div className='errorQty'>數量已超過99</div>*/}
            <div className='stepTitile inline'>取卡人資訊</div>
            <div className='textInputSection'>
              <div className='block'>
                <InputText
                  placeholder={'取卡人姓名'}
                  infoFlag={deliveryData.name}
                  defaultValue={deliveryData.name}
                  error={errorMessage.name}
                  name={'name'}
                  width={'49%'}
                  passData={passData}
                />
                <InputText
                  placeholder={'電話'}
                  infoFlag={deliveryData.tel}
                  defaultValue={deliveryData.tel}
                  error={errorMessage.tel}
                  name={'tel'}
                  width={'49%'}
                  passData={passData}
                />
              </div>
              <div className='block'>
                <InputText
                  placeholder={'E-mail'}
                  infoFlag={deliveryData.email}
                  defaultValue={deliveryData.email}
                  error={errorMessage.email}
                  name={'email'}
                  width={'100%'}
                  passData={passData}
                />
              </div>
            </div>
            <div className='check'>
              <StepButton
                handleNext={handleNext}
                handleBefore={() => gotoBooking()}
                tetx={'下一步'}
                isLoading={isLoadingButton}
              />
            </div>
          </div>
        </DeliveryWrapper>
      )}
    </PayConsumer>
  );
};

export default DeliveryContainer;
