import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from 'Components/Provider/ProductProvider';
import { MainContext } from 'Components/Provider/MainProvider';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';
import Notice from './detailNotice';
import PriceWrap from 'Components/common/PriceWrap';
import LabelWrap from 'Components/common/LabelWrap';
import LoadingLinear from 'Components/common/LoadingLinear';
import Palette from 'Styled/palette';
import { InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const detail = ({ cataID, classes }) => {
  const infoList = [
    {
      id: 1,
      icon: 'time',
      value: '急件預定服務：可當天線上預訂當天機場取卡',
      isFocus: true
    },
    { id: 2, icon: 'signal', value: '享高速上網4G/LTE網路吃到飽不降速' },
    { id: 3, icon: 'hotSpot', value: '隨插即用，免設定，支援熱點功能' },
    {
      id: 4,
      icon: 'telecommunication',
      value:
        '使用日本Docomo網路，全境覆蓋率高達99%；韓國SK Telecom網路，訊號穩定有保障'
    }
  ];

  const introductionList = [
    '使用天數：5 / 8 天',
    '適用國家：日本、韓國通用，離島、郊區與山區訊號可能較弱',
    '電信公司：日本Docomo/Softbank可雙網切換 ；韓國SK Telecom，訊號穩定有保障',
    '上網速度：高速上網4G/3G(不支援4G的地區時)',
    '流量限制：無流量限制，網路吃到飽不降速，上傳美照、打卡不間斷',
    '熱點分享：可以，但不保證每支手機都能成功分享',
    '通話功能：不具通話、簡訊功能',
    '卡片規格：Standard,Micro,Nano 三合一 SIM卡，內附有卡針',
    '設定APN：隨插即用，無法使用時再手動設定apn(請至當地再插上sim卡使用)',
    '可否加值：否，本卡無法自行加值流量'
  ];

  const [isLoading, setLoading] = useState(true);
  const [cID, setCataID] = useState(null);
  const [pID, setPID] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const {
    checkAPI,
    isReady,
    CataList,
    ProductList,
    getProductInfo
  } = useContext(ProductContext);
  const { setBookingInfo, getBookingInfo, goToIndex, goToProcess } = useContext(
    MainContext
  );

  useEffect(() => {
    Helper.screen.scrollToTop();
  }, []);

  useEffect(() => {
    // 取得產品 API資料
    if (!isReady) {
      checkAPI();
    }

    if (ProductList !== null && CataList !== null) {
      // 取得目前應顯示商品的資料
      getStorgeData();
      setLoading(false);
    }
  }, [isReady]);

  const getStorgeData = () => {
    const value = getBookingInfo();
    if (value === undefined || value === null) return;

    setCataID(JSON.parse(value).cataID);
    setPID(JSON.parse(value).pID);

    // 取得新的產品資訊
    setProductInfo(getProductInfo(JSON.parse(value).pID));
  };

  // 產品下拉式選單異動
  const handleChange = e => {
    const productID = e.target.value;
    setPID(productID);
    // 設定Local Storage
    setBookingInfo(cID, productID);
    // 取得新的產品資訊
    setProductInfo(getProductInfo(productID));
  };

  return isLoading || productInfo === null ? (
    <LoadingLinear />
  ) : (
    <div className={classes.root}>
      {/* 畫面上半部 */}
      <div className='page_top'>
        {/* 麵包屑 */}
        <div className='breadCrumbs'>
          <span onClick={() => goToIndex()}>首頁</span> > 酷遊卡
        </div>

        {/* KV廣告 */}
        <div className='page_banner'>
          <div className='KV_Image' id='banner' />
        </div>

        {/* 選單列 */}
        <div className={classes.selectWrap}>
          <InputLabel className='cataInput'>{CataList[cID].name}</InputLabel>
          <Select
            value={productInfo.productName}
            renderValue={value => `${value}`}
            onChange={handleChange}
            variant='outlined'
            className='productList'
          >
            {CataList[cID].group.map(id =>
              ProductList[id].map(product => (
                <MenuItem key={product.productId} value={product.productId}>
                  {product.productName}
                </MenuItem>
              ))
            )}
          </Select>
        </div>
        {/* 商品資訊 */}
        <div className={classes.prodcut}>
          <img className='productImg img' src={productInfo.pic_src} />

          <div className='info'>
            <p className='title'>{productInfo.productName}</p>
            {infoList.map(item => (
              <div className='textWrap' key={item.id}>
                <span className={`img ${item.icon}Icon`} />
                <span className={item.isFocus ? 'focus' : ''}>
                  {item.value}
                </span>
              </div>
            ))}

            <div className='orderWrap'>
              <div className='price'>
                <PriceWrap type='original' value={productInfo.ori_price} />
                <PriceWrap type='special' value={productInfo.price} />
              </div>
              <Button
                className=' btn'
                variant='contained'
                onClick={() => {
                  goToProcess(pID);
                }}
              >
                立即預定
              </Button>
            </div>
          </div>
        </div>

        {/* 商品介紹 */}
        <div className={classes.introduction}>
          <LabelWrap value='商品介紹' />
          {introductionList.map((txt, idx) => (
            <li key={idx}>{txt}</li>
          ))}
        </div>
      </div>

      {/* 畫面中半部 */}
      <div className={`page_mid ${classes.detail_KV}`}>
        {/* 如何使用 */}
        <div className='KV_Image' id='kv_1' />

        {/* 取卡資訊 */}
        <div className='KV_Image' id='kv_2' />
        <div className='KV_Image' id='kv_3' />
      </div>

      {/* 畫面下半部 */}
      <div className='page_bottom'>
        {/* 注意事項 */}
        <Notice />
        {/* 常見問題 */}
        <div className={classes.problem}>
          <LabelWrap value='常見問題' />
          <Button
            className='btn QA_btn'
            variant='contained'
            onClick={() =>
              window.open(
                'https://www.idealcard.com.tw/customer.php?arg=common',
                '_self'
              )
            }
          >
            更多Q&A查詢
          </Button>
        </div>
      </div>

      <div className='orderBtnWrap'>
        <Button
          className=' btn'
          variant='contained'
          onClick={() => {
            goToProcess(pID);
          }}
        >
          立即預定
        </Button>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    maxWidth: '1280px',
    margin: 'auto',

    '& p': { margin: 'auto' },
    '& .btn': {
      width: '200px',
      height: '48px',
      fontSize: '20px'
    },
    '& .orderBtnWrap': { display: 'none' },

    '& .breadCrumbs': {
      padding: '17px 0 17px 20px',
      fontSize: '16px',
      color: Palette.secondary['gray-60'],
      '& span': { color: '#919191', cursor: 'pointer' }
    },

    '& .page_banner': {
      '& div': {
        maxWidth: '960px',
        height: '150px'
      },
      '& #banner': {
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.banner.LG})`,

        '@media (max-width: 660px)': {
          backgroundImage: `url(${CONSTANTS.IMAGE.detail.banner.SM})`
        }
      }
    },

    '& .page_top': {
      maxWidth: '960px',
      margin: 'auto'
    },
    '& .page_mid': {
      maxWidth: '1280px',
      margin: 'auto',
      padding: '40px 0px',
      display: 'grid'
    },
    '& .page_bottom': {
      maxWidth: '960px',
      margin: 'auto',
      padding: '0 20px 40px 20px'
    },

    [theme.breakpoints.down('md')]: {
      '& .page_top': {
        padding: '0 20px',
        '& .breadCrumbs': {
          padding: '17px 0'
        }
      },
      '& .orderBtnWrap': {
        display: 'block',
        position: 'sticky',
        zIndex: '10',
        width: '100%',
        height: '100px',
        left: 0,
        bottom: 0,
        backgroundColor: Palette.primary['white-2'],
        '& .btn': {
          width: '90%',
          left: '5%',
          right: '5%',
          top: '25%'
        }
      }
    }
  },

  selectWrap: {
    padding: '40px 20px 0 20px',
    '& .productList': {
      width: '335px',
      paddingLeft: '10px',
      color: '#000000',
      '&:before, &:after': { content: 'unset' }
    },

    [theme.breakpoints.down('md')]: {
      padding: '40px 0 0 0',
      '& .cataInput': { display: 'block' },
      '& .productList': {
        padding: '10px 0 0 0',
        width: '100%',
        maxWidth: '335px'
      }
    }
  },

  prodcut: {
    display: 'flex',
    maxWidth: '850px',
    padding: '20px 20px 40px 20px',
    '& .productImg': { height: '300px', width: '300px' },

    '& .info': {
      paddingLeft: '30px',

      '& .title': {
        fontSize: '36px',
        padding: '17px 0 20px 0',
        lineHeight: '42px'
      },
      '& .textWrap': {
        display: 'flex',
        alignItems: 'flex-start',
        color: Palette.secondary['gray-60'],
        fontSize: '14px',
        fontWeight: 300,
        paddingBottom: '8px',

        '& .focus': { color: Palette.primary['red-1'] },

        '& span': {
          '&.img': {
            width: '18px',
            minWidth: '18px',
            height: '18px',
            marginRight: '8px'
          }
        }
      },
      '& .orderWrap': {
        display: 'flex',
        'justify-content': 'space-between',
        alignItems: 'flex-end',

        '& .specialPrice': { fontSize: '36px' }
      }
    },

    [theme.breakpoints.down('md')]: {
      padding: '20px 0 40px 0',
      flexDirection: 'column',
      '& .productImg': {
        margin: 'auto',
        width: '100%',
        maxWidth: '335px',
        maxHeight: '335px'
      },
      '& .info': { padding: 0 },
      '& .price': {
        display: 'flex',
        flex: 1,
        'justify-content': 'space-between'
      },
      '& .btn': { display: 'none' }
    }
  },

  introduction: {
    padding: '0 20px',
    color: Palette.secondary['gray-60'],
    lineHeight: 1.6,
    fontWeight: 300,
    '& li': {
      width: 'calc(100% - 2.2em)',
      listStyle: 'none',
      position: 'relative',
      marginLeft: '15px',
      left: '1.2em'
    },
    '& li:before': {
      content: '"・"',
      position: 'absolute',
      left: '-1.2em'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0'
    }
  },

  problem: {
    paddingTop: '40px',
    '& .btn': {
      marginTop: '20px'
    },

    '& .QA_btn': {
      color: Palette.secondary['gray-50'],
      backgroundColor: `${Palette.secondary['gray-20']}!important`,
      backgroundImage: 'unset'
    }
  },

  detail_KV: {
    '& div': {
      height: '500px',
      maxWidth: '1280px'
    },

    '& #kv_1': {
      backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.LG.kv_1})`
    },
    '& #kv_2': {
      backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.LG.kv_2})`
    },
    '& #kv_3': {
      backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.LG.kv_3})`
    },

    [theme.breakpoints.down('lg')]: {
      '& #kv_1': {
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.MD.kv_1})`
      },
      '& #kv_2': {
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.MD.kv_2})`
      },
      '& #kv_3': {
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.MD.kv_3})`
      }
    },

    '@media (max-width: 660px)': {
      '& #kv_1': {
        height: '600px',
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.SM.kv_1})`
      },
      '& #kv_2': {
        height: '848px',
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.SM.kv_2})`
      },
      '& #kv_3': {
        height: '848px',
        backgroundImage: `url(${CONSTANTS.IMAGE.detail.KV.SM.kv_3})`
      }
    }
  }
});
export default withStyles(styles)(detail);
