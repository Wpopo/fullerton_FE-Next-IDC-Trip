import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Palette from '../../styled/palette';

function TextFields(props) {
    const { classes } = props;
    const [values, setValues] = React.useState({
        name: props.defaultValue,
    });

    const handleChange = name => event => {
        // console.log('----->', name, event.target.value)
        setValues({ ...values, ['name']: event.target.value });

        var obj = {}
        obj[name] = event.target.value
        props.passData(obj)
    };

    useEffect(() => {
        //console.log("--取卡人info改變-->", props.infoFlag)
        if (props.infoFlag) {
            setValues({
                name: props.infoFlag,
            })
        }
    }, [props.infoFlag]);

    return (
        <div className={classes.container} noValidate autoComplete="off">
            <TextField error={props.error}
                id="outlined-bare"
                className={classes.root}
                placeholder={props.placeholder}
                value={values.name}
                onChange={handleChange(props.name)}
                margin="normal"
                variant="outlined"
                helperText={props.error ? props.error : ''}
                inputProps={{
                    maxLength: props.maxLength,
                    'aria-label': 'bare'
                }}
            />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: props => props.width,
        '@media (max-width:540px)': {
            width: props => props.width ? '100%' : '100%',
            marginBottom: '10px',
        },
    },
    root: {
        margin: 0,
        width: '100%',
        '& .MuiInputBase-input': {
            fontWeight: 300,
        },
        '& .MuiOutlinedInput-root': {
            fontSize: '20px',
            fontWeight: 'normal',
            lineHeight: 1,
            color: '#595959',
            padding: '0px 20px 0 25px',
            height: '48px',
            'box-sizing': 'border-box',
            '@media (max-width:540px)': {
                height: '60px',
            },

            '& fieldset': {
                borderRadius: '24px',
                background: '#fff',
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
                borderWidth: '2px',
            },
        },
        '& .MuiOutlinedInput-input::placeholder': {
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: '30px',
            color: '#595959',
            opacity: 1,
        },
        '& .MuiOutlinedInput-input': {
            'z-index': 2,
            padding: '4px 0px',
        }
    },
};

export default withStyles(styles)(TextFields);