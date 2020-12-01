import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const PriceWrap = ({ type = 'original', value = 0, classes }) => {
  if (type === 'original') {
    return (
      <div className={classes.root}>
        原價<span className='ori'>NT$</span>
        <span className='ori originalPrice'>{value}</span>
      </div>
    );
  } else if (type === 'special') {
    return (
      <div className={classes.root}>
        特價<span>NT$</span>
        <span className='specialPrice'>{value}</span>
      </div>
    );
  } else {
    return null;
  }
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: Palette.secondary['gray-50'],
    fontSize: '12px',
    fontWeight: 300,
    height: '38px',

    '& span': { lineHeight: '24px' },
    '& .ori': { textDecoration: 'line-through' },
    '& .originalPrice': {
      fontSize: '14px',
      fontWeight: 'normal',
      paddingLeft: '1px'
    },
    '& .specialPrice': {
      fontSize: '24px',
      fontWeight: 'bold',
      paddingLeft: '4px',
      color: Palette.primary['red-1']
    },

    '@media (max-width: 660px)': {
      fontSize: '16px',
      '& .originalPrice': { fontSize: '16px' },
      '& .specialPrice': { fontSize: '36px' }
    }
  }
});
export default withStyles(styles)(PriceWrap);
