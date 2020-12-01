import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import palette from '../../styled/palette'


const useStyles = makeStyles(theme => ({
  root: {
    width: '600px',
    margin: '0 auto',
    '@media (max-width:540px)': {
      width: '100%',
    },
    '& .MuiPaper-root': {
      background: '#f7f7f7',
    },
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: palette.primary['blue-3'],
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: palette.primary['blue-3'],
    },
    '& .MuiStepIcon-root': {
      color: palette.secondary['gray-30'],
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      fontSize: '18px',
      marginTop: '10px',
      color: palette.secondary['gray-50'],
      '@media (max-width:540px)': {
        fontSize: '16px',
      },
    },
    '& .MuiStepper-root': {
      '@media (max-width:540px)': {
        padding: '0px',
      },
    },
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: palette.primary['blue-3'],
      borderTopWidth: '3px',
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: palette.primary['blue-3'],
      borderTopWidth: '3px',
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: palette.secondary['gray-30'],
      borderTopWidth: '3px',
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
}));

function getSteps() {
  return ['選擇商品', '填寫資料', '付款資料', '完成預訂'];
}

export default function CustomizedSteppers(props) {
  //console.log(props.step)

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(props.step);
  const steps = getSteps();

  useEffect(() => {
    if (props.step) {
      setActiveStep(props.step)
    }
  }, [props.step]);

  const connector = (
    <StepConnector
      classes={{
        active: classes.connectorActive,
        completed: classes.connectorCompleted,
        disabled: classes.connectorDisabled,
        line: classes.connectorLine,
      }}
    />
  );

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}