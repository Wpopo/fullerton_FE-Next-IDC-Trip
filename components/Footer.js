import React from 'react';
import Palette from 'Styled/palette';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const Footer = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <Button
          className='btn'
          variant='outlined'
          onClick={() =>
            window.open(
              'https://www.idealcard.com.tw/customer.php?arg=service',
              '_self'
            )
          }
        >
          聯絡客服
        </Button>
        <div className='text'>
          <span className='tel'>電話: 02-8912-4181</span>
          <span className='time'>時間: 週一至週六9:00~21:00．</span>
          <span className='time_2'>週日9:00~18:00</span>
        </div>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    height: '150px',
    display: 'flex',
    'justify-content': 'center',
    backgroundColor: Palette.secondary['gray-40'],

    [theme.breakpoints.down('sm')]: {
      height: '240px'
    }
  },

  wrap: {
    display: 'flex',
    flex: 1,
    maxWidth: `${1280 - 160 - 160}px`,
    padding: '0 50px',
    alignItems: 'center',

    '& .btn': {
      minWidth: '140px',
      height: '44px',
      fontSize: '20px'
    },

    '& .text': {
      fontSize: '18px',
      color: Palette.secondary['gray-20'],
      paddingLeft: '20px',
      '& .tel': { display: 'block' }
    },

    [theme.breakpoints.down('md')]: {
      padding: '0 25px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      'justify-content': 'center',

      '& .text': {
        fontSize: '16px',
        padding: '8px 0 0 0',
        '& span': { display: 'block', textAlign: 'center' }
      }
    }
  }
});
export default withStyles(styles)(Footer);
