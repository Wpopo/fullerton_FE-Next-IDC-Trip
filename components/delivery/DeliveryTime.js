import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import Palette from '../../styled/palette';


function MaterialUIPickers(props) {

    const { classes } = props;
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [isShow, setIsShow] = React.useState(true);
    const [maxDate, setMaxDate] = React.useState('');

    function handleDateChange(date) {
        setIsShow(false)
        setSelectedDate(date);

        let dayForm = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        //console.log('dayForm---->', dayForm)
        props.passData({ 'day': dayForm })
    }

    useEffect(() => {
        // 取30天後日期
        let time = new Date();
        time.setDate(time.getDate() + 30);
        setMaxDate(time.getTime());

        // 如果有預設值
        if (props.defaultValue) {
            setSelectedDate(props.defaultValue);
            setIsShow(false)
        }
    }, []);

    return (
        <div className={classes.container}>
            <img className={classes.img} src='../../static/icon-timer.png' />
            {isShow && <div className={classes.text}>取卡日期</div>}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker className={classes.root}
                    error={props.error}
                    helperText={props.error ? props.error : ''}
                    disableToolbar
                    margin="normal"
                    inputVariant="outlined"
                    id="mui-pickers-date"
                    value={selectedDate}
                    format="yyyy/MM/dd"
                    maxDate={maxDate}
                    minDate={new Date()}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <svg className="MuiSvgIcon-root MuiSelect-icon" className={classes.svgIcon} focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                <path d="M7 10l5 5 5-5z"></path>
            </svg>
        </div>

    );
}

const styles = {
    container: {
        position: "relative",
        width: '230px',
        '@media (max-width:540px)': {
            width: '100%',
        },
    },
    img: {
        width: '22px',
        height: '22px',
        position: 'absolute',
        left: '28px',
        top: '29px',
        zIndex: 2,
        '@media (max-width:540px)': {
            top: '37px',
        },
    },
    text: {
        position: 'absolute',
        top: '25px',
        fontSize: '20px',
        fontWeight: 300,
        color: '#595959',
        'z-index': 2,
        left: '57px',
        '@media (max-width:540px)': {
            top: '33px',
        },
    },
    root: {
        width: '245px',
        height: 'auto',
        '@media (max-width:540px)': {
            width: '100%',
        },

        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                background: '#fff',
                borderRadius: '24px',
                '@media (max-width:540px)': {
                    borderRadius: '30px',
                },
            },
            '&:hover fieldset': {
                borderColor: props => props.error ? Palette.error['main'] : Palette.primary['blue-1'],
                borderWidth: '2px',
            },
            '&.Mui-focused fieldset': {
                borderColor: props => props.error ? Palette.error['main'] : Palette.primary['blue-1'],
            },
        },
        '& .MuiOutlinedInput-input': {
            'z-index': 2,
            padding: '10.5px 57px',
            fontWeight: 300,
            fontSize: '18px',
            'box-sizing': 'border-box',
            height: '48px',
            '@media (max-width:540px)': {
                height: '60px',
            },
        }
    },
    svgIcon: {
        width: '20px',
        top: '30px',
        right: '10px',
        position: 'absolute',
        pointerEvents: 'none',
        '@media (max-width:540px)': {
            top: '35px',
            right: '21px',
        },
    }
};

export default withStyles(styles)(MaterialUIPickers);