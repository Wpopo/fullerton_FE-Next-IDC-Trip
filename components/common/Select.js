import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { PayContext } from 'Components/Provider/PayProvider';
import Palette from '../../styled/palette';

function SimpleSelect(props) {
    const { updateInvoiceArea } = React.useContext(PayContext)

    //console.log("--111-props->", props.data)
    const { classes } = props;
    const [values, setValues] = React.useState({
        item: props.defaultValue,
    });

    function handleChange(event) {
        //console.log("---select->", event.target.value)
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value
        }));
        let obj = {}
        let item = props.item
        obj[item] = event.target.value

        switch (event.target.value) {
            case "公司戶":
                updateInvoiceArea(5)
                break;
            case "捐贈":
            case "13579陽光社福基金":
                updateInvoiceArea(0)
                break;
            case "個人戶":
            case "會員載具":
                updateInvoiceArea(2)
                break;
            case "手機條碼":
                updateInvoiceArea(3)
                break;
            case "自然人憑證":
                updateInvoiceArea(4)
                break;
            case "其他":
                updateInvoiceArea(1)
                break;
            default:

        }
        props.passData(obj)
    }


    useEffect(() => {
        // console.log("-XX-->", props.confere)
        // props.data改變
        if (props.confere == 1 || props.confere == 2) {
            setValues({
                item: props.data[0],
            })
        }
    }, [props.confere]);

    useEffect(() => {
        // console.log("-town改變-->", props.townFlag)
        // town改變
        if (props.townFlag) {
            setValues({
                item: props.townFlag,
            })
        }
    }, [props.townFlag]);

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl} error={props.error}>
                <Select
                    value={values.item}
                    onChange={handleChange}
                    name="item"
                    renderValue={value => `${value}`}
                    className={classes.selectEmpty}
                    input={<BootstrapInput name="item" id="age-customized-select" error={props.error} />}
                >
                    {props.data.map((item, index) => {
                        //console.log(item, index)
                        return (
                            <MenuItem className={classes.menuItem} key={index} value={item}>{item}</MenuItem>
                        )
                    })}
                </Select>
                {props.error && <FormHelperText>{props.error}</FormHelperText>}
            </FormControl>
        </form>
    );
}

const BootstrapInput = withStyles(theme => ({
    input: {
        borderColor: props => props.error ? Palette.error['main'] : '',
    }
}))(InputBase);

const styles = {
    root: {
        width: '100%',
        '@media (max-width:540px)': {
            width: props => props.double ? '48%' : '100%',

        },
    },
    formControl: {
        width: props => props.width,
        '@media (max-width:540px)': {
            width: props => props.width ? '100%' : '100%',
            marginBottom: '10px',
        },
        '& .MuiSelect-root': {
            paddingLeft: props => props.padding || '22px',
            '@media (max-width:540px)': {
                paddingRight: '60px',
                display: 'inline-block',
                lineHeight: '55px',
            },
        },
        '& .MuiSelect-select:hover': {
            borderColor: props => props.error ? Palette.error['main'] : Palette.primary['blue-1'],
        },
        '& .MuiSelect-select:focus': {
            borderColor: props => props.error ? Palette.error['main'] : Palette.primary['blue-1'],
        }
    },
};

export default withStyles(styles)(SimpleSelect);