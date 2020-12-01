import styled, { css, keyframes } from 'styled-components';
import Palette from './palette';

const sizes = {
	tablet: 1024,
	pad: 994,
	phone: 540,
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

export const DeliveryWrapper = styled.div`
	.mainTitle{
		font-size: 28px;
		line-height: 1;
		text-align: center;
		color: #595959;
		margin-bottom: 25px;
	}
	.process{
		width: 400px;
		height: 70px;
		background: green;
		margin: 20px auto;
	}
	.container{
		margin: 0 auto;
		width: 680px;

		${media.pad`
			width: 680px;
			margin: 0 auto;
		`}

		${media.phone`
			width: 100%;
		`}

		.errorQty{
			color: ${Palette.error['main']};
			font-size: 14px;
			margin-top: 8px;
			min-height: 1em;
			text-align: left;
			margin: 8px 12px 0;
		}
		.stepTitile{
			font-size: 24px;
			color: #404040;
			margin-top: 30px;

			&.inline{
				margin: 38px 0 20px;
			}
		}
		.textInputSection{
			width: 500px;
			${media.phone`
				width: 100%;
			`}

			.block{
				display: flex;
				justify-content: space-between;
				width: 500px;
				margin-bottom: 10px;

				${media.phone`
					width: 100%;
					flex-wrap: wrap;
					margin-bottom: 0px;
				`}
			}
		}
		.check{
			margin: 35px auto 0;
			width: 415px;
			justify-content: space-between;
			display: flex;

			${media.phone`
				width: 100%;
			`}
		}
		.dateNote{
			font-size: 16px;
			line-height: 1.25;
			color: #404040;
			margin-left: 30px;
			margin-bottom: 20px;

			${media.phone`
				width: 80%;
			`}
		}
		.locationBox{
			display: flex;
			margin-bottom: 20px;
			position: relative;

			${media.phone`
				flex-wrap: wrap;
			`}

			img{
				position: absolute;
				z-index: 2;
				width: 17px;
				height: 25px;
				left: 29px;
				top: 12px;

				${media.phone`
					top: 18px;
				`}
			}

			.noteButton{
				width: 145px;
				height: 34px;
				border-radius: 6px;
				background-color: ${Palette.primary['blue-3']};
				font-size: 16px;
				font-weight: 500;
				line-height: 1;
				color: #ffffff;
				line-height: 34px;
				text-align: left;
				margin-top: 8px;
				margin-left: 20px;
				cursor: pointer;
				position: relative;
				box-sizing: border-box;
				padding-left: 20px;

				${media.phone`
					margin-top: 20px;
					width: 120px;
					height: 44px;
					line-height: 44px;
				`}

				&::after{
					content: "";
					background-image: url(../static/icon-arrow.png);
					position: absolute;
					right: 14px;
					top: 14px;
					width: 12px;
					height: 8px;
					background-size: cover;

					${media.phone`
						top: 18px;
					`}
				}
			}
		}
		.noteSection{
			font-size: 16px;
			line-height: 1.5;
			color: #404040;
			margin-left: 13px;

			${media.phone`
				width: 80%;
			`}

			.noteBox{
				.subTitle{
					display: block;
					padding-left: 20px;
				}
				ul{
					margin-block-start: 0.2em;

					li{
						.blue{
							color: ${Palette.primary['blue-3']};
						}
						.red{
							color: ${Palette.primary['red-1']};
						}
					}
				}
				.example{
					padding-left: 35px;
					margin-bottom: 15px;
					
					.blue{
						color: ${Palette.primary['blue-3']};
					}
					.red{
						color: ${Palette.primary['red-1']};
					}
				}
			}
		}
	}
`;

export const ConfirmWrapper = styled.div`

	.mainTitle{
		font-size: 28px;
		line-height: 1;
		text-align: center;
		color: #595959;
		margin-bottom: 25px;
	}
	.process{
		width: 400px;
		height: 70px;
		background: green;
		margin: 20px auto;
	}
	.container{
		margin: 0 auto;
		width: 680px;

		${media.pad`
			width: 92%;
			margin: 0 auto;
		`}

		${media.phone`
			width: 100%;
		`}

		.stepTitile{
			font-size: 24px;
			color: #404040;
			margin-top: 30px;

			${media.pad`
				width: 680px;
				margin: 30px auto 0;
			`}

			${media.phone`
				width: 100%;
			
			`}

			&.inline{
				margin: 38px 0 20px;

				${media.pad`
					margin: 38px auto 20px;
				`}
			}
		}

		.orderInfo{
			width: 680px;
			margin: 0 auto;
			box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.1);
			background-color: #ffffff;
			padding: 50px 55px;
			box-sizing: border-box;
			margin-top: 20px;
	
			${media.phone`
				width: 100%;
				padding: 30px;
			`}
	
			.infoBox{
				display: flex;
				margin-bottom: 15px;
	
				${media.phone`
					width: 100%;
					flex-wrap: wrap;
					justify-content:space-between;
				`}
	
				.title{
					width: 95px;
					font-size: 18px;
					font-weight: 300;
					color: #595959;
					margin-right: 24px;
					text-align: right;
	
					${media.phone`
						font-size: 16px;
						width: 28%;
						text-align: left;
						width: 100%;
					`}
				}
	
				.moreInfoWrapper{
					width: 500px;
	
					${media.phone`
						width: 100%;
					`}
	
					.moreInfo{
						display: flex;
						font-size: 18px;
						font-weight: 300;
						line-height: 1.44;
						color: #000000;
						
						.left{
							margin-right: 20px;

							${media.phone`
								width: 31%;
							`}
						}

						.right{
							${media.phone`
								width: 70%;
							`}
						}
					}
				}
				.priceWrapper{
					width: 500px;
					font-size: 18px;
					font-weight: 300;
					color: #000000;
					display: flex;
					justify-content:space-between;
					align-items: center;
					line-height: 25px;
	
					${media.phone`
						flex-wrap: wrap;
						width: 100%;
					`}
					
					.left{
						span{
							font-size: 20px;
							font-weight: bold;
							line-height: 1.5;
							color: #5a5a5a;
							margin-left: 7px;
						}
					}
					.right{
					
						span{
							display: inline-block;
							min-width: 43px;
							font-size: 24px;
							font-weight: bold;
							color: #000000;
							margin-left: 7px;
							text-align: right;
						}
						.red{
							color: #fe204e;
						}
					}
				}
				.priceWrapper.price{
				 
					.right{
						${media.phone`
							width: 100%;
							display: flex;
							justify-content: flex-end;
							align-items: center;
						`}
					}
				}
				.personWrap{
					font-size: 18px;
					font-weight: 300;
					line-height: 1.44;
					color: #000000;
					display: flex;
	
					${media.phone`
						width: 100%;
						flex-wrap: wrap;
					`}
	
					.personItem{
						width: 55px;
						text-align: right;
						margin-right: 20px;
	
						${media.phone`
							width: 24%;
						`}
					}
					.personData{
						${media.phone`
							width: 65%;
						`}

						.subItem{
							width: 100%;
							height: auto;
							word-break: break-all;
						}
					}
				}
			}
			.infoBox.total{
				.title{
					${media.phone`
						width: 28%;
						margin-bottom: 30px;
					`}
				}
				.priceWrapper{
					${media.phone`
						width: 35%;
					`}
				}
			}

			.infoBox:last-child{
				margin-bottom: 0px;
			}
			.line{
				width: 580px;
				height: 2px;
				background: #eeeeee;
				margin-bottom: 22px;

				${media.phone`
					width: 100%;
				`}
			}
		}
		.terms{
			display: flex;
			width: 280px;
			font-size: 16px;
			line-height: 1.5;
			color: #404040;
			margin: 30px auto;
			align-items:center;
			flex-wrap: wrap;
			justify-content: center;

			${media.phone`
				width: 100%;
				margin: 20px auto;
				font-size: 19px;
			`}
			
			span{
				color: ${Palette.primary['blue-3']};
				cursor: pointer;
				text-decoration: underline;
			}
			.errorText{
				font-size: 14px;
				color: ${Palette.error['main']};
				width: 290px;
			}
		}
		.check{
			margin: 0 auto;
			width: 415px;
			justify-content: space-between;
			display: flex;

			${media.phone`
				width: 100%;
				margin: 30px auto;
			`}
		}
		
		.payBase{
			display: flex;
			width: 500px;
			justify-content:space-between;
			flex-wrap: wrap;

			${media.phone`
				width: 100%;
			`}

			.block{
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 10px;

				${media.phone`
					flex-wrap: wrap;
					margin-bottom: 0px;
				`}
			}
		}
		.invoiceBase{
			display: flex;
			width: 500px;
			justify-content:space-between;
			flex-wrap: wrap;

			${media.phone`
				width: 100%;
			`}

			.block{
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 10px;

				${media.phone`
					flex-wrap: wrap;
				`}

				.loveCodeLink{
					margin-right: 143px;
					line-height: 50px;
					cursor: pointer;
					text-decoration: underline;
				}
			}
		}
	}
`;