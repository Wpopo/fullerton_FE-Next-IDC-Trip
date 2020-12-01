import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    container: {
        width: 'inherit',
        display: 'flex',
        'justify-content': 'space-between',
        '@media (max-width:540px)': {
            width: '100%',
        },
    },
    next: {
        width: '200px',
        height: '48px',
        fontSize: '20px',
        fontWeight: 500,
        color: '#ffffff',
        borderRadius: '25px',
        '@media (max-width:540px)': {
            height: '60px',
            borderRadius: '30px',
            width: '48%',
        },
    },
    previous: {
        width: '200px',
        height: '48px',
        fontSize: '20px',
        fontWeight: 'normal',
        color: '#595959',
        borderRadius: '25px',
        backgroundImage: 'linear-gradient(0deg, #d9d9d9, #d9d9d9)',
        '@media (max-width:540px)': {
            height: '60px',
            borderRadius: '30px',
            width: '48%',
        },
    },
    loading:{
        width: '45px',
        position:"absolute",
    }
});

const StepButton = (props) => {
   
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Button
                className={classes.previous}
                variant='outlined'
                onClick={() => props.handleBefore()}
            >上一步</Button>
            <Button
                className={classes.next}
                variant='contained'
                onClick={() => props.handleNext()}
                disabled={props.isLoading}
            >{props.isLoading ? <img className={classes.loading} src="../static/loading.gif"/>: props.tetx} </Button>
        </div>
    )
}

export default StepButton;