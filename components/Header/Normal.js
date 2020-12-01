import React, { useState, useEffect, useRef, Fragment } from 'react';
import Router from 'next/router';
import CONSTANTS from 'Components/constants';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Menus = CONSTANTS.Header.Menus;
const MemberMenu = CONSTANTS.Header.MemberMenu;
const Header = ({ Login, Logout, isLogin, MemberName, classes }) => {
  // 監聽滑鼠點擊事件 是否離開Menu
  useEffect(() => {
    // componentDidMount
    document.addEventListener('mousedown', checkViewIndx);

    // componentWillUnmount
    return () => {
      document.removeEventListener('mousedown', checkViewIndx);
    };
  }, []);

  const refMenu = useRef();
  const [viewIdx, setViewIdx] = useState(null);
  const [showMemberMenu, setShowMemberMenu] = useState(false);

  // Menu點擊事件
  const handleViewIndx = idx => {
    setShowMemberMenu(false);

    if (viewIdx === idx) {
      setViewIdx(null);
    } else setViewIdx(idx);
  };

  // 檢查點擊事件，是否點在Menu外面。
  // 若是，則關閉Menu
  const checkViewIndx = e => {
    if (!refMenu.current.contains(e.target)) {
      setViewIdx(null);
      setShowMemberMenu(false);
    }
    return;
  };

  return (
    <div className={classes.root} ref={refMenu}>
      {Menus.map(menu => (
        <div
          className='menu'
          key={menu.index}
          onClick={() => handleViewIndx(menu.index)}
        >
          <span className='title'>
            {menu.url ? (
              // 內網導路由
              menu.self ? (
                <span onClick={() => Router.push(menu.url)}>{menu.title}</span>
              ) : (
                // 外網導連結
                <a href={menu.url}>{menu.title}</a>
              )
            ) : (
              menu.title
            )}
          </span>

          {menu.subMenu && viewIdx === menu.index ? (
            <ul>
              {menu.subMenu.map((sMenu, idx) => (
                <Fragment key={idx}>
                  {sMenu.topLine ? <span className='line' /> : null}
                  {sMenu.title ? (
                    <li className='subTitle'>{sMenu.title}</li>
                  ) : (
                    ''
                  )}
                  {sMenu.pages.map((page, idx2) => (
                    <li key={idx2}>
                      {page.self ? (
                        // 內網導路由
                        <span onClick={() => Router.push(page.url)}>
                          {page.text}
                        </span>
                      ) : (
                        // 外網導連結
                        <a href={page.url}>{page.text}</a>
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          ) : (
            ''
          )}
        </div>
      ))}

      {/* 登入 */}
      {isLogin ? (
        <div className={classes.loginWrap}>
          <div className='wrap'>
            <span>{`${MemberName} 您好~`}</span>
            <span
              className='img loginUserIcon'
              onClick={() => {
                setShowMemberMenu(!showMemberMenu);
                setViewIdx(null);
              }}
            />
          </div>
          {showMemberMenu ? (
            <ul>
              {MemberMenu.map(menu => (
                <li key={menu.url}>
                  <a href={menu.url}>{menu.text}</a>
                </li>
              ))}
              {/* 登出 */}
              <li>
                <span onClick={() => Logout()}>登出</span>
              </li>
            </ul>
          ) : null}
        </div>
      ) : (
        <div className={classes.loginWrap}>
          <span onClick={() => Login()}>登入{isLogin}</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: {
    display: 'inline-flex',
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    paddingLeft: '25px',

    '& .menu': {
      padding: '8px 16px'
    },

    '& ul': {
      fontSize: '14px',
      margin: '10px 20px 0 0',
      padding: '8px 0px',
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      border: 'solid 1px rgba(0,0,0,0.15)',
      borderRadius: '.25rem'
    },

    '& li': {
      padding: '4px 24px',
      whiteSpace: 'noWrap',

      '&:hover': {
        backgroundColor: '#f8f9fa'
      },

      '&.subTitle': {
        color: '#919191',
        '&:hover': {
          color: '#919191',
          backgroundColor: 'unset'
        }
      }
    }
  },

  loginWrap: {
    position: 'absolute',
    right: '70px',
    cursor: 'pointer',

    '& .wrap': {
      display: 'flex',
      alignItems: 'center',
      '& .img': {
        margin: '5px 0 0 10px',
        width: '41px',
        height: '41px'
      },
      '& span': {
        height: '20px',
        color: Palette.secondary['gray-40'],
        fontSize: '14px'
      }
    },

    '& ul': {
      margin: 'auto'
    }
  }
};
export default withStyles(styles)(Header);
