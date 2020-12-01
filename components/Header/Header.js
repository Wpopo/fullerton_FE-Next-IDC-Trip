import React, { useState, useContext, useEffect } from 'react';
import { MemberContext } from 'Components/Provider/MemberProvider';
import Router from 'next/router';
import Helper from 'Lib/helper';
import CONSTANTS from 'Components/constants';
import NormalHeader from './Normal';
import DeviceHeader from './Device';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const IndexPage = CONSTANTS.Header.IndexPage;
const Header = ({ classes }) => {
  const {
    token,
    handleToken,
    getStorageToken,
    clearStorageToken,
    name
  } = useContext(MemberContext);
  const [isLogin, setLogin] = useState(false);
  const [isXlScreen, setIsXlScreen] = useState(null);
  const [openDeviceMenu, setOpenDeviceMenu] = useState(false);

  useEffect(() => {
    // 第一次監控螢幕，因為SSR問題，所以必須等畫面Render才能監控
    if (isXlScreen === null && Helper.screen.originWidth !== undefined) {
      setIsXlScreen(Helper.screen.isXlScreen());
    }

    if (token === null) {
      // 檢查是否有Login Token or URL參數是否有session
      const session = getStorageToken() || Router.query.sessionId;

      if (
        session !== undefined &&
        session !== null &&
        session !== '' &&
        session !== token
      ) {
        Router.replace('/?sessionId', location.pathname);
        Router.push(location.pathname);
        handleToken(session);
        setLogin(true);
      }
    } else {
      setLogin(true);
    }

    // componentDidMount, componentDidUpdate
    handleIsXlScreen();

    // componentWillUnmount
    return Helper.offResize();
  });

  const Login = () => {
    window.open(
      CONSTANTS.API.LOGIN(location.origin + location.pathname),
      '_self'
    );
  };

  const Logout = () => {
    clearStorageToken();
    setLogin(false);
    window.open(
      CONSTANTS.API.LOGOUT(location.origin + location.pathname),
      '_self'
    );
  };

  // 螢幕 resize
  const handleIsXlScreen = () => {
    Helper.onResize(
      () => {
        if (isXlScreen !== Helper.screen.isXlScreen()) {
          setIsXlScreen(Helper.screen.isXlScreen());
        }
      },
      { detect_width: true }
    );
  };

  return (
    <div className={`${classes.root} no_copy`}>
      <div className={classes.wrap}>
        <Logo />
        {isXlScreen ? (
          // PC Style
          <NormalHeader
            Login={Login}
            Logout={Logout}
            isLogin={isLogin}
            MemberName={name}
          />
        ) : (
            // App Style
            <div className={classes.device}>
              <div
                className={classes.hamburgerWrap}
                onClick={() => setOpenDeviceMenu(true)}
              >
                <span className='img header-hamburger' />
                <span>選單</span>
              </div>
              <DeviceHeader
                Login={Login}
                Logout={Logout}
                isLogin={isLogin}
                headerStyle={
                  <div className={classes.wrap}>
                    <Logo />
                    <div className={classes.closeWrap}>
                      <span>關閉</span>
                      <span
                        className='img close'
                        onClick={() => setOpenDeviceMenu(false)}
                      />
                    </div>
                  </div>
                }
                rootClasses={classes}
                open={openDeviceMenu}
              />
            </div>
          )}
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    boxShadow: '0 2px 5px 0 rgba(89, 89, 89, 0.2)',
    fontSize: '16px',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',

    // 禁止text-selected
    '-webkit-user-select': 'none', // Chrome all, Safari all
    '-moz-user-select': 'none', // Firefox all
    '-ms-user-select': 'none', // IE 10+
    'user-select': 'none', // Likely future

    '& a': {
      display: 'block',
      color: '#000000',
      textDecoration: 'none'
    },

    '& .title': {
      '& a:hover, &:hover': {
        color: '#007BFF',
        cursor: 'pointer'
      }
    },

    '& ul': {
      'padding-inline-start': 0,
      'z-index': 10,
      'list-style-type': 'none',
      overflow: 'hidden'
    },

    '& li': {
      fontSize: '16px',
      '&.subTitle': {
        color: '#919191',
        '&:hover': {
          color: '#919191',
          backgroundColor: 'unset'
        }
      }
    },

    '& .line': {
      display: 'block',
      margin: '8px 0',
      borderTop: '1px solid #e9ecef'
    }
  },

  wrap: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1280px',
    height: '80px',
    margin: 'auto',

    '& .img': {
      backgroundSize: 'cover',
      display: 'inline-block'
    }
  },

  menuLogo: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',

    '& .logo': {
      width: '95px',
      height: '45px',
      marginLeft: '10px',
      backgroundImage: 'url(static/images/logo/logo.png)'
    },

    '& .fs': {
      fontSize: '20px'
    },

    [theme.breakpoints.down('sm')]: {
      '& .logo': { transform: 'scale(0.8)' },
      '& .fs': { fontSize: '16px' }
    }
  },

  closeWrap: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    'justify-content': 'flex-end',
    paddingRight: '30px',

    '& .close': {
      width: '29px',
      height: '29px',
      cursor: 'pointer',
      marginLeft: '10px',
      backgroundImage: 'url(static/images/icon-close.jpg)'
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      '& .close': { transform: 'scale(0.8)' }
    }
  },

  device: {
    display: 'flex',
    flex: 1,
    'justify-content': 'flex-end'
  },
  hamburgerWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '18px',
    paddingRight: '30px',
    cursor: 'pointer',

    '& .img': {
      width: '30px',
      height: '25px'
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    }
  }
});

const Logo = ({ classes = makeStyles(styles)() }) => {
  return (
    <div
      className={classes.menuLogo}
      onClick={() => window.open(IndexPage, '_self')}
    >
      <span className='img logo' />
      <span className='fs'>中華電信預付卡</span>
    </div>
  );
};

export default withStyles(styles)(Header);
