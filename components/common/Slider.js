import React from 'react';
import ReactSlick from 'react-slick';
import CONSTANTS from 'Components/constants';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Slider = ({ classes }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: true
  };

  return (
    <ReactSlick
      className={`${classes.root} ${classes.imageWrap}`}
      {...settings}
    >
      <div className='KV_Image banner' id='index_banner1' />
      <div className='KV_Image banner' id='index_banner2' />
      <div className='KV_Image banner' id='index_banner3' />
    </ReactSlick>
  );
};

const styles = theme => ({
  root: {
    '& .slick-dots': {
      bottom: '-28px',
      '& li': {
        width: '8px',
        height: '8px',
        padding: '0px 5px 0 5px',
        '& button': {
          width: '8px',
          height: '8px',

          '&:before': {
            width: '8px',
            height: '8px',
            textShadow: '1px 1px 1px #BBBBBB',
            opacity: 1,
            color: '#FFFFFF'
          }
        },

        '& button:hover:before': {
          opacity: 1,
          color: Palette.primary['blue-4']
        },

        '&.slick-active': {
          '& button:before': {
            opacity: 1,
            color: Palette.primary['blue-4']
          }
        }
      },

      [theme.breakpoints.down('md')]: {
        bottom: '-53px'
      },
      [theme.breakpoints.down('xs')]: {
        bottom: '-29px'
      }
    },
    '& .slick-arrow': {
      zIndex: 10,
      width: '48px',
      height: '48px',
      '&:before': {
        color: 'unset',
        opacity: 1,
        width: '100%',
        lineHeight: '48px',
        backgroundSize: 'cover',
        display: 'inline-block'
      }
    },
    '& .slick-prev': {
      left: '50px',
      '&:before': {
        backgroundImage: 'url(static/images/slider/left.png)'
      }
    },
    '& .slick-next': {
      right: '50px',
      '&:before': {
        backgroundImage: 'url(static/images/slider/right.png)'
      }
    },

    [theme.breakpoints.down('md')]: {
      '& .slick-arrow': { display: 'none!important' }
    }
  },
  imageWrap: {
    '& .banner': {
      maxWidth: '1280px',
      height: '400px'
    },
    '& #index_banner1': {
      backgroundImage: `url(${CONSTANTS.IMAGE.banner.LG.img_1})`
    },
    '& #index_banner2': {
      backgroundImage: `url(${CONSTANTS.IMAGE.banner.LG.img_2})`
    },
    '& #index_banner3': {
      backgroundImage: `url(${CONSTANTS.IMAGE.banner.LG.img_3})`
    },

    [theme.breakpoints.down('lg')]: {
      '& #index_banner1': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.MD.img_1})`
      },
      '& #index_banner2': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.MD.img_2})`
      },
      '& #index_banner3': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.MD.img_3})`
      }
    },

    '@media (max-width: 660px)': {
      '& #index_banner1': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.SM.img_1})`
      },
      '& #index_banner2': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.SM.img_2})`
      },
      '& #index_banner3': {
        backgroundImage: `url(${CONSTANTS.IMAGE.banner.SM.img_3})`
      }
    }
  }
});

export default withStyles(styles)(Slider);
