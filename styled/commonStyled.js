import styled, { css } from 'styled-components';
import Palette from 'Styled/palette';

const sizes = {
  tablet: 1024,
  phone: 540,
  pad: 994,
  phone375: 375
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const CommonWrapper = styled.div`
  background-color: ${Palette.primary['white-2']};

  font-family: 'Noto Sans TC', Helvetica, Quicksand, Microsoft JhengHei,
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif !important;

  .img {
    width: 100%;
    background-size: cover;
    display: inline-block;
  }

  // 禁止text-selected
  .no_copy {
    -webkit-user-select: none; // Chrome all, Safari all
    -moz-user-select: none; // Firefox all
    -ms-user-select: none; // IE 10+
    user-select: none; // Likely future
  }

  // 圖檔置中縮小
  .KV_Image {
    background-size: cover;
    background-position: center;
  }

  // 圖檔
  .header-hamburger {
    background-image: url(static/images/icon-menu.jpg);
  }

  .timeIcon {
    background-image: url(static/images/timeIcon.svg);
  }

  .signalIcon {
    background-image: url(static/images/signalIcon.svg);
  }

  .hotSpotIcon {
    background-image: url(static/images/hotSpotIcon.svg);
  }

  .telecommunicationIcon {
    background-image: url(static/images/telecommunicationIcon.svg);
  }

  .defaultCardIcon {
    background-image: url(static/images/defaultCard.png);
  }

  .loginUserIcon {
    background-image: url(static/images/loginUser.png);
  }
`;

export const IndexWrapper = styled.div`
  max-width: 1280px;
  margin: 80px auto 0;
`;

export const LabelButton = styled.div`
  width: 160px;
  height: 48px;
  object-fit: contain;
  border-radius: 24px;
  border: 3px solid ${Palette.primary['blue-2']};
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 500;
  color: ${Palette.primary['blue-2']};
  text-align: center;
  line-height: 42px;

  ${media.phone`
      width: 160px;
      height: 60px;
      border-radius: 30px;
      line-height: 53px;
  `}
`;

export const Template = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  padding: 17px 160px 40px;
  margin: 0 auto;
  box-sizing: border-box;
  font-size: 16px;
  color: ${Palette.secondary['gray-60']};
  margin-top: 80px;

  ${media.pad`
    width: 100%;
    padding: 20px;
  `}

  .siteMapText {
    margin-bottom: 17px;
    .one {
      color: #919191;
      cursor: pointer;
    }
  }
`;

export const TermsWrapper = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 1.38;
  color: ${Palette.secondary['gray-60']};

  ol{
    padding-inline-start: 18px;

    li{
      margin-bottom: 15px;

      .smallList{
        padding-inline-start: 18px;
        　li{
          list-style:none;
          margin-left: 29px;
          text-indent: -29px;
        }
      }

      .title{
        margin: 7px 0;

        .inline{
          margin: 7px 0;
          display: inline-block;
        }
      }
    }
  }
`;
