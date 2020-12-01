import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { PayConsumer } from 'Components/Provider/PayProvider';
import Palette from '../../styled/palette';

const DeliveryProduct = (props) => {
    //console.log("--props-->", props)
    const { classes } = props;

    return (
        <PayConsumer>
            {({ deliveryData, updateQty, addBoolean, minusBoolean }) => (
                <div className={classes.root}>
                    <div className="info">商品資訊</div>
                    <div className="detail">
                        <div className="title">{deliveryData.productName}</div>
                        <div className="count">
                            <div className="price">NT$<span>{deliveryData.price}</span></div>
                            <div className="chooseNum">
                                <Fab size="small" aria-label="minus" onClick={() => updateQty(-1)} disabled={minusBoolean}>
                                    <RemoveIcon />
                                </Fab>
                                <div className="num">{deliveryData.qty}</div>
                                <Fab size="small" aria-label="Add" onClick={() => updateQty(1)} disabled={addBoolean}>
                                    <AddIcon />
                                </Fab>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PayConsumer>
    );
};

const styles = {
    root: {
        width: '680px',
        padding: '30px 30px',
        boxShadow: '1px 2px 4px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
        '@media (max-width:540px)': {
            width: '100%',
        },

        '& .info': {
            fontSize: '16px',
            fontWeight: 300,
            color: '#595959',
        },
        '& .detail': {
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center',
            '@media (max-width:540px)': {
                'flex-wrap': 'wrap',
            },

            '& .title': {
                fontSize: '24px',
                color: ' #000000',
                width: '320px',
                '@media (max-width:540px)': {
                    fontSize: '30px',
                },
            },
            '& .count': {
                display: 'flex',
                width: '270px',
                'justify-content': 'space-between',
                'align-items': 'center',
                '@media (max-width:540px)': {
                    width: '100%',
                },

                '& .price': {
                    fontSize: '18px',
                    fontWeight: 500,
                    textAlign: 'right',
                    color: '#595959',

                    '& span': {
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: Palette.primary['red-1'],
                        paddingLeft: '3px',
                        '@media (max-width:540px)': {
                            fontSize: '36px',
                        },
                    }
                },
                '& .chooseNum': {
                    display: 'flex',
                    'align-items': 'center',

                    '& .MuiFab-sizeSmall': {
                        width: '37px',
                        height: '20px',
                        backgroundColor: '#ffffff',
                        boxShadow: 'none',
                        border: '2px solid #c5c5c5',
                        transform: 'scale(0.8)',

                        '& .MuiSvgIcon-root': {
                            width: '1.2em',
                            height: '1.2em',
                        }
                    },
                    '& .MuiFab-sizeSmall:hover': {
                        borderColor: Palette.primary['blue-2'],
                    },
                    '& .num': {
                        fontSize: '34px',
                        fontWeight: 'bold',
                        color: '#000000',
                        margin: '0 10px',
                        '@media (max-width:540px)': {
                            fontSize: '36px',
                        },
                    }
                },
            },
        }
    },
};
export default withStyles(styles)(DeliveryProduct);
