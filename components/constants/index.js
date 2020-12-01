const API_Domain = 'https://beta-www.idealcard.com.tw/';

const CONSTANTS = {
  // for API
  API: {
    // 取卡地點
    TAKE_PLACE: 'roamAPI/v1/takeplace',
    // 查詢會員資訊
    MEMBER: 'roamAPI/v1/member',
    // 成立訂單
    ORDER: 'roamAPI/v1/order',
    // 更新訂單
    UPDATE_ORDER: num => 'roamAPI/v1/order/' + num,
    // 產品列表
    PRODUCT: (chid = 1) => 'roamAPI/v1/product?chid=' + chid,
    // 愛心碼檢查
    LOVE_CODE: num => 'idealAPI/einvoice/loveCode?loveCode=' + num,
    // 手機載具檢查
    BAR_CODE: num => 'idealAPI/einvoice/phoneBarCode?phoneBarCode=' + num,
    // 取得MemberID
    GET_MEMBER_ID: 'roamAPI/api/getSessionData.php',
    // 取得是否登入
    CHECK_LOGIN: 'roamAPI/api/isExistedSession.php',
    // 登入API
    LOGIN: (url = 'https://www.idealcard.com.tw') => API_Domain + '?url=' + url,
    // 登出API
    LOGOUT: (url = 'https://www.idealcard.com.tw') =>
      API_Domain + 'api/logout.php?url=' + url
  },
  // for local Storage
  STORAGE: {
    GET: {
      BOOKING: () => localStorage.getItem('booking'),
      TOKEN: () => localStorage.getItem('token'),
      BUY: () => localStorage.getItem('buy')
    },
    SET: {
      BOOKING: value => localStorage.setItem('booking', value),
      TOKEN: value => localStorage.setItem('token', value),
      BUY: value => localStorage.setItem('buy', value)
    }
  },

  // for Image Setting
  IMAGE: {
    banner: {
      LG: {
        img_1: 'static/images/banner/banner_1280_1.jpg',
        img_2: 'static/images/banner/banner_1280_2.jpg',
        img_3: 'static/images/banner/banner_1280_3.jpg'
      },
      MD: {
        img_1: 'static/images/banner/banner_1024_1.jpg',
        img_2: 'static/images/banner/banner_1024_2.jpg',
        img_3: 'static/images/banner/banner_1024_3.jpg'
      },
      SM: {
        img_1: 'static/images/banner/banner_660_1.jpg',
        img_2: 'static/images/banner/banner_660_2.jpg',
        img_3: 'static/images/banner/banner_660_3.jpg'
      }
    },
    KV: {
      index: {
        LG: {
          kv_1: 'static/images/kv/index_kv_1280_1.jpg',
          kv_2: 'static/images/kv/index_kv_1280_2.jpg',
          kv_3: 'static/images/kv/index_kv_1280_3.jpg'
        },
        MD: {
          kv_1: 'static/images/kv/index_kv_1024_1.jpg',
          kv_2: 'static/images/kv/index_kv_1024_2.jpg',
          kv_3: 'static/images/kv/index_kv_1024_3.jpg'
        },
        SM: {
          kv_1: 'static/images/kv/index_kv_660_1.jpg',
          kv_2: 'static/images/kv/index_kv_660_2.jpg',
          kv_3: 'static/images/kv/index_kv_660_3.jpg'
        }
      }
    },
    detail: {
      banner: {
        LG: 'static/images/banner/detail_banner_960.jpg',
        SM: 'static/images/banner/detail_banner_660.jpg'
      },
      KV: {
        LG: {
          kv_1: 'static/images/detail_kv/detail_kv_1280_1.jpg',
          kv_2: 'static/images/detail_kv/detail_kv_1280_2.jpg',
          kv_3: 'static/images/detail_kv/detail_kv_1280_3.jpg'
        },
        MD: {
          kv_1: 'static/images/detail_kv/detail_kv_1024_1.jpg',
          kv_2: 'static/images/detail_kv/detail_kv_1024_2.jpg',
          kv_3: 'static/images/detail_kv/detail_kv_1024_3.jpg'
        },
        SM: {
          kv_1: 'static/images/detail_kv/detail_kv_660_1.jpg',
          kv_2: 'static/images/detail_kv/detail_kv_660_2.jpg',
          kv_3: 'static/images/detail_kv/detail_kv_660_3.jpg'
        }
      }
    }
  },

  // for Page SiteMap
  VIEW: [
    {
      title: '商品首頁',
      v: 'index'
    },
    {
      title: '商品詳細',
      v: 'booking'
    }
  ],

  // for Header SiteMap
  Header: {
    IndexPage: 'https://www.idealcard.com.tw/index.php',
    Menus: [
      {
        index: 1,
        title: '產品介紹',
        subMenu: [
          {
            title: '預付(如意)卡',
            pages: [
              {
                text: '4G預付卡介紹',
                url:
                  'https://www.idealcard.com.tw/product.php?product=4Gintroduce'
              },
              {
                text: '4G預付卡申請上網',
                url:
                  'https://www.idealcard.com.tw/product.php?product=4Gprepayapply'
              }
            ]
          },
          {
            topLine: true,
            title: '4G預付門號卡申辦',
            pages: [
              {
                text: '7-ELEVEN便利商店',
                url:
                  'https://www.idealcard.com.tw/product.php?product=4Gcardseven'
              },
              {
                text: '全家便利商店',
                url:
                  'https://www.idealcard.com.tw/product.php?product=4Gcardfamily'
              }
            ]
          },
          {
            topLine: true,
            title: '超商儲值教學',
            pages: [
              {
                text: '超商儲值教學',
                url:
                  'https://www.idealcard.com.tw/product.php?product=codestore'
              }
            ]
          }
        ]
      },
      {
        index: 2,
        title: 'e儲值專區',
        url: 'https://www.idealcard.com.tw/buy.php'
      },
      {
        index: 3,
        title: '加值專區',
        subMenu: [
          {
            pages: [
              {
                text: '買上網送CATCHPLAY電影',
                url: 'https://www.idealcard.com.tw/value.php?value=catchplay'
              },
              {
                text: '來電小幫手',
                url: 'https://www.idealcard.com.tw/value.php?value=callcatcher'
              },
              {
                text: '定期定額',
                url: 'https://www.idealcard.com.tw/value.php?value=sip'
              },
              {
                text: '紅利折抵',
                url: 'https://www.idealcard.com.tw/value.php?value=dividend'
              }
            ]
          }
        ]
      },
      {
        index: 4,
        title: '酷遊卡',
        self: 'true',
        url: '/'
      },
      {
        index: 5,
        title: '客服中心',
        subMenu: [
          {
            pages: [
              {
                text: '常見問題',
                url: 'https://www.idealcard.com.tw/customer.php?arg=common'
              },
              {
                text: '聯絡客服',
                url: 'https://www.idealcard.com.tw/customer.php?arg=service'
              }
            ]
          }
        ]
      }
    ],
    MemberMenu: [
      {
        text: '我的交易紀錄',
        url: 'https://www.idealcard.com.tw/member.php?arg=trade'
      },
      {
        text: '我的抵用券',
        url: 'https://www.idealcard.com.tw/member.php?arg=coupon'
      },
      {
        text: '修改會員資料',
        url: 'https://www.idealcard.com.tw/member.php?arg=amend'
      },
      {
        text: '贈品領取紀錄',
        url: 'https://www.idealcard.com.tw/member.php?arg=prize'
      },
      {
        text: '定期定額儲值',
        url: 'https://www.idealcard.com.tw/member.php?arg=sip'
      }
    ]
  }
};

export default CONSTANTS;
