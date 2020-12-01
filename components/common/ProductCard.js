import React, { useContext } from 'react';
import { MainContext } from 'Components/Provider/MainProvider';
import PriceWrap from 'Components/common/PriceWrap';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';

/**
 *
 * @param {object} data // Product資料
 * @param {number} chid // CataLog ID
 */
const ProductCard = ({ data, cataID, classes }) => {
  if (data === undefined) return null;

  const { goToBooking, goToProcess } = useContext(MainContext);
  const { productId, productName, pic_src, ori_price, price } = data;
  return (
    <div className={classes.root}>
      <div
        className={`KV_Image ${classes.image}`}
        style={{ backgroundImage: 'url(' + pic_src + ')' }}
      />

      <div className={classes.info}>
        <div className='title'>{productName}</div>
        <div className='boxWrap'>
          <div className='item'>
            <PriceWrap type='original' value={ori_price} />
            <Button
              className='btn'
              variant='text'
              onClick={() => goToBooking(cataID, productId)}
            >
              商品詳情
            </Button>
          </div>

          <div className='item'>
            <PriceWrap type='special' value={price} />
            <Button
              className='btn'
              variant='contained'
              onClick={() => {
                goToProcess(productId);
              }}
            >
              立即預定
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'inline-block',
    margin: '15px',
    width: '300px!important',
    height: '378px',
    boxShadow: '1px 2px 4px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',

    '&.defaultCardWrap': {
      [theme.breakpoints.down('md')]: {
        display: 'none!important'
      }
    },

    '@media (max-width: 660px)': {
      width: '100%!important',
      minHeight: '465px',
      maxWidth: '335px'
    }
  },
  image: {
    height: '176px',
    backgroundColor: '#A3E0E1',

    '@media (max-width: 660px)': {
      height: '212px'
    }
  },
  info: {
    '& .title': {
      height: '56px',
      padding: '20px 20px 0px 20px',
      fontSize: '24px',
      fontWeight: '300',
      lineHeight: '28px',

      // 超過兩行顯示 「...」
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': 2, // 選擇行數
      '-webkit-box-orient': 'vertical'
    },
    '& .boxWrap': {
      height: '86px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      'justify-content': 'space-between',

      '& .item': {
        display: 'flex',
        'justify-content': 'space-between',
        alignItems: 'flex-end'
      }
    },

    '@media (max-width: 660px)': {
      '& .title': {
        height: '88px',
        fontSize: '36px',
        lineHeight: '44px'
      },

      '& .boxWrap': {
        height: '100px'
      },
      '& .btn': {
        width: '120px',
        height: '45px',
        fontSize: '20px',
        lineHeight: '16px'
      }
    }
  },
  defaultCardTextWrap: {
    padding: '93px 0 0 28px',

    '& p': {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1.43',
      color: '#FFFFFF',
      margin: '0'
    },
    '& .title': {
      fontSize: '100px',
      fontWeight: 'bold',
      lineHeight: '0.9'
    },
    '& .title_unit': {
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '0.82',
      paddingLeft: '2px'
    },
    '& .sub_title': {
      fontSize: '32px',
      fontWeight: '900',
      lineHeight: '0.56',
      paddingTop: '15px'
    },
    '& .text': {
      paddingTop: '22px'
    }
  }
});

export const DefaultCard = ({ classes = makeStyles(styles)() }) => (
  <div className={`${classes.root} defaultCardWrap img defaultCardIcon`}>
    <div className={classes.defaultCardTextWrap}>
      <p>
        <span className='title'>99</span>
        <span className='title_unit'>%</span>
      </p>
      <p className='sub_title'>全境覆蓋率</p>
      <div className='text'>
        <p>日本使用電信</p>
        <p>Docomo / Softbank 網路</p>
        <p>韓國使用電信</p>
        <p>SK Telecom 網路</p>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(ProductCard);
