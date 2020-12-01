import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const LabelWrap = ({ value = '', classes }) => {
  return (
    <div className={classes.root}>
      <div className='icon' />
      <span>{value}</span>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    '& .icon': {
      width: '6px',
      height: '22px',
      backgroundColor: '#86C8F0'
    },
    '& span': {
      paddingLeft: '8px',
      color: Palette.secondary['gray-60'],
      fontSize: '20px',
      fontWeight: 'bold'
    }
  }
};
export default withStyles(styles)(LabelWrap);
