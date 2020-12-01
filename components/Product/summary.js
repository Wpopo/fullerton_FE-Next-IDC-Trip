import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from 'Components/Provider/ProductProvider';
import SummarySkeleton from './summarySkeleton';
import CONSTANTS from 'Components/constants';
import ProductCard, { DefaultCard } from 'Components/common/ProductCard';
import Slider from 'Components/common/Slider';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Summary = ({ classes }) => {
  const cataID = 1;
  const [isLoading, setLoading] = useState(true);
  const { checkAPI, isReady, CataList, ProductList } = useContext(
    ProductContext
  );

  useEffect(() => {
    if (!isReady) {
      checkAPI();
    }

    if (ProductList !== null && CataList !== null) {
      setLoading(false);
    }
  }, [isReady]);

  return isLoading ? (
    <SummarySkeleton />
  ) : (
    <div className={classes.root}>
      {/* Slider */}
      <div className='banner'>
        <Slider />
      </div>
      {/* 文案 */}
      <div className={classes.titleWrap}>
        <div className='title'>最新公告</div>
        <div className='text'>
          歡慶酷遊卡網站開賣～機場取卡限時免運只到9/30！
          什麼！！還有急件預定服務，可當天線上預訂當天機場取卡喔。♥
        </div>
      </div>
      {/* 商品卡片區 */}
      <div className={classes.productCardWrap}>
        <DefaultCard />
        {CataList[cataID].group.map(cid =>
          ProductList[cid].map(product => {
            return (
              <ProductCard
                key={product.productId}
                data={product}
                cataID={cataID}
              />
            );
          })
        )}
      </div>
      {/* 廣告圖區 */}
      <div className={classes.imageWrap}>
        <div className='KV_Image' id='index_KV1' />
        <div className='KV_Image' id='index_KV2' />
        <div className='KV_Image' id='index_KV3' />
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    '& .banner': {
      '& img': {
        height: '400px'
      }
    },

    [theme.breakpoints.down('xs')]: {
      '& .banner': {
        '& img': {
          height: '540px!important'
        }
      }
    }
  },
  titleWrap: {
    display: 'flex',
    'justify-content': 'center',
    marginTop: '10px',
    padding: '50px 45px 40px 45px',
    color: Palette.secondary['gray-60'],

    '& .title': {
      fontSize: '20px',
      fontWeight: 'bold',
      minWidth: '80px',
      whiteSpace: 'nowrap'
    },

    '& .text': {
      fontSize: '18px',
      maxWidth: '590px',
      paddingLeft: '9px'
    },

    [theme.breakpoints.down('md')]: {
      paddingTop: '75px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '75px 40px 40px 40px',

      '& .text': {
        padding: '8px 0 0 0'
      }
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '50px'
    }
  },
  productCardWrap: {
    margin: 'auto',
    padding: '0 0 80px 0',
    width: '990px',
    display: 'flex',
    flexWrap: 'wrap',
    'justify-content': 'flex-start',
    [theme.breakpoints.down('lg')]: {
      width: '660px'
    },
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      'justify-content': 'center'
    }
  },
  imageWrap: {
    display: 'grid',
    '& div': {
      height: '500px',
      maxWidth: '1280px'
    },

    '& #index_KV1': {
      backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.LG.kv_1})`
    },
    '& #index_KV2': {
      backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.LG.kv_2})`
    },
    '& #index_KV3': {
      backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.LG.kv_3})`
    },

    [theme.breakpoints.down('lg')]: {
      '& #index_KV1': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.MD.kv_1})`
      },
      '& #index_KV2': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.MD.kv_2})`
      },
      '& #index_KV3': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.MD.kv_3})`
      }
    },

    '@media (max-width: 660px)': {
      '& div': { height: '600px' },

      '& #index_KV1': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.SM.kv_1})`
      },
      '& #index_KV2': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.SM.kv_2})`
      },
      '& #index_KV3': {
        backgroundImage: `url(${CONSTANTS.IMAGE.KV.index.SM.kv_3})`
      }
    }
  }
});

export default withStyles(styles)(Summary);
