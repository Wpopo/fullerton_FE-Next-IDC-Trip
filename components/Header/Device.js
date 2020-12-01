import React, { useState, Fragment } from 'react';
import Router from 'next/router';
import Dialog from '@material-ui/core/Dialog';
import CONSTANTS from 'Components/constants';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const Menus = CONSTANTS.Header.Menus;
const MemberMenu = CONSTANTS.Header.MemberMenu;
const Header = ({
  open = false,
  Login,
  Logout,
  isLogin,
  rootClasses,
  classes,
  headerStyle
}) => {
  const [viewIdx, setViewIdx] = useState(null);
  // Menu點擊事件
  const handleViewIndx = idx => {
    if (viewIdx === idx) {
      setViewIdx(null);
    } else setViewIdx(idx);
  };

  // 依據是否登入顯示不同Menu
  const o = {
    index: 6,
    title: '會員中心',
    subMenu: [{ pages: MemberMenu }]
  };
  let CombinMenu = isLogin ? Menus.slice().concat(o) : Menus;

  return (
    <Dialog
      fullScreen
      open={open}
      className={`${rootClasses.root} ${classes.root}`}
    >
      <div className={classes.header}>{headerStyle}</div>
      {CombinMenu.map(menu => (
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

            {/* 登入的情況 顯示會員中心 */}
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
      <div className={classes.loginWrap}>
        {isLogin ? (
          <span onClick={() => Logout()}>登出</span>
        ) : (
          <span onClick={() => Login()}>登入</span>
        )}
      </div>
    </Dialog>
  );
};

const styles = theme => ({
  root: {
    fontSize: '24px!important',

    '& .menu:': {
      display: 'flex',
      alignItems: 'center'
    },

    '& .title': {
      width: '50%',
      margin: 'auto',
      display: 'block',
      padding: '8px 0'
    },

    '& ul': {
      margin: 0,
      padding: '16px 0',
      fontSize: '20px',
      border: `solid 1px ${Palette.secondary['menu-li-bg']}`,
      backgroundColor: Palette.secondary['menu-li-bg']
    },

    '& li': {
      width: '40%',
      margin: 'auto',
      padding: '8px 0px',
      '& a:hover': {
        color: '#007BFF!important'
      }
    },

    '& .line': {
      width: '45%',
      maxWidth: '395px',
      margin: '8px auto 8px auto!important',
      'border-top': '2px solid #d9d9d9!important'
    },

    [theme.breakpoints.down('sm')]: {
      '& .title': { width: '100%', paddingLeft: '5px' },
      '& li': { width: '80%' },
      '& .line': { width: '85%' }
    }
  },
  header: {
    margin: '0'
  },
  loginWrap: {
    display: 'flex',
    'justify-content': 'center',
    marginTop: '64px',
    padding: '48px 0',
    borderTop: '1px solid #c1c1c1',

    '& span': {
      cursor: 'pointer'
    }
  }
});
export default withStyles(styles)(Header);
