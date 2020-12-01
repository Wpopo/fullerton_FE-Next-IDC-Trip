import React from 'react';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const summarySkeleton = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className='page_top'>
        <div className='banner bone' />
      </div>

      <div className='page_mid'>
        <Card />
        <Card />
        <Card cusClass='padNone mobileNone' />
        <Card cusClass='padNone mobileNone' />
        <Card cusClass='padNone mobileNone' />
        <Card cusClass='padNone mobileNone' />
      </div>

      <div className='page_bottom'>
        <div className='bottomBox bone' />
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    '& .bone': { backgroundColor: Palette.secondary['gray-10'] },
    '& .page_mid': {
      padding: '198px 0 10px 0',
      display: 'flex',
      'justify-content': 'center',
      flexWrap: 'wrap'
    },
    '& .banner': { height: '300px' },
    '& .card': {
      width: '300px',
      height: '368px',
      display: 'inline-grid',
      margin: '0 15px 30px 15px',
      '& .img': { height: '176px' },
      '& .infoWrap': {
        height: '192px',
        backgroundColor: '#FFFFFF',
        '& .title': {
          width: '250px',
          height: '24px',
          margin: '24px 0 4px 21px'
        },
        '& .title2': { width: '166px', height: '24px', marginLeft: '21px' },
        '& .boxWrap': {
          position: 'relative',
          '& div': { position: 'absolute' },
          '& .box1': {
            width: '77px',
            height: '12px',
            top: '35px',
            left: '21px'
          },
          '& .box2': {
            width: '45px',
            height: '12px',
            top: '60px',
            left: '21px'
          },
          '& .box3': {
            width: '40px',
            height: '22px',
            top: '55px',
            left: '72px'
          },
          '& .box4': {
            width: '100px',
            height: '40px',
            top: '10px',
            right: '20px'
          },
          '& .box5': {
            width: '100px',
            height: '40px',
            top: '58px',
            right: '20px'
          }
        }
      }
    },
    '& .bottomBox': { width: '100%', height: '500px' },
    [theme.breakpoints.down('lg')]: {
      '& .padNone': { display: 'none' }
    }
  }
});

const Card = ({ cusClass = '' }) => (
  <div className={`card ${cusClass}`}>
    <div className='img bone' />
    <div className='infoWrap'>
      <div className='title bone' />
      <div className='title2 bone' />
      <div className='boxWrap'>
        <div className='box1 bone' />
        <div className='box2 bone' />
        <div className='box3 bone' />
        <div className='box4 bone' />
        <div className='box5 bone' />
      </div>
    </div>
  </div>
);
export default withStyles(styles)(summarySkeleton);
