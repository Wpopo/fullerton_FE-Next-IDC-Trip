import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const LoadingLinear = ({ classes }) => {
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
};

const styles = {
  root: {
    height: '70vh',
    '& .MuiLinearProgress-root': {
      width: '33.333%',
      top: '50%',
      left: '33.333%',
      backgroundColor: Palette.secondary['gray-20']
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#00A0FF'
    }
  }
};
export default withStyles(styles)(LoadingLinear);
