import styled, { css, keyframes } from 'styled-components';
import Palette from './palette';

const sizes = {
    tablet: 1024,
    phone: 540,
    pad: 994,
    phone375: 375
}

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`
    return acc
}, {});

export const ThanksWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    margin: 0 auto;

    ${media.pad`
        padding: 0 20px;
        box-sizing: border-box;
    `}
    
    .mainTitle{
		font-size: 28px;
		line-height: 1;
		text-align: center;
        color: #595959;
        
        ${media.phone`
            margin-bottom: 20px;
        `}
	}

    img{
        width: 100px;
        height: 100px;
        margin: 10px auto 0;
        display: block;
        ${media.phone`
            margin-top: 40px;
        `}
    }
    .text{
        width: 528px;
        height: 32px;
        font-size: 24px;
        line-height: 1.33;
        text-align: center;
        color: #404040;
        margin: 20px auto 60px;

        ${media.phone`
            width: 90%;
            height: auto;
        `}
    }
    .contextBox{
        width: 680px;
        height: 437px;
        box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        margin: 0 auto;
        padding: 50px;
        box-sizing: border-box;

        ${media.phone`
            width: 100%;
            height: auto;
            padding: 30px;
        `}

        .box{
            display: flex;
            margin-bottom: 20px;
            align-items: center;
            align-items: flex-start;

            ${media.phone`
                margin-bottom: 16px;
            `}

            .title{
                width: 72px;
                height: 20px;
                font-size: 18px;
                font-weight: 300;
                line-height: 1.11;
                text-align: center;
                color: #595959;
                margin-right: 25px;

                ${media.phone`
                    width: 95px;
                `}
            }
            .context{
                height: auto;
                font-size: 18px;
                line-height: 1;
                color: #000000;

                ${media.phone`
                    width: 179px;
                    height: auto;
                    line-height: 22px;
                `}

                .red{
                    font-size: 24px;
                    font-weight: bold;
                    line-height: 1;
                    color: #fe204e;
                }
                .gray{ 
                    font-size: 20px;
                    font-weight: bold; 
                    line-height: 1.5; 
                    color: #5a5a5a;
                }
            }
        }
    }
    .note{
        width: 705px;
        margin: 40px auto 0;

        ${media.phone`
            width: 100%;
            height: auto;
        `}

        .item{
            font-size: 20px;
            font-weight: 900;
            line-height: 1;
            text-align: left;
            color: #404040;
            border-left: 5px solid #86C8F0;
            padding-left: 5px;
        }
        ul{
            ${media.pad`
                width: 90%;
            `}  

            li{
                font-size: 16px;
                font-weight: 300;
                line-height: 1.38;
                color: #404040;
                margin-bottom: 5px;

                ${media.phone`
                    margin-bottom: 10px;
                `}  
            }
        }
    }
    .button{
        width: 200px;
        height: 48px;
        border-radius: 25px;
        background: ${Palette.primary['blue-2']};
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        margin: 40px auto;
        line-height: 48px;
        cursor: pointer;

        ${media.phone`
            height: 60px;
            line-height: 60px;
            border-radius: 30px;
        `}  
    }
`;