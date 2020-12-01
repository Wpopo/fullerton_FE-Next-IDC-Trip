import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { PayContext } from 'Components/Provider/PayProvider';

export default function Checkboxes() {
    const [state, setState] = React.useState({
        checkedB: false,
    });

    const { updateBackData, backData } = React.useContext(PayContext)

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        updateBackData({ 'checkedB': event.target.checked })
    };

    useEffect(() => {
        //console.log("--checkedB----的變化---->", backData.checkedB)
        if (backData.checkedB) {
            setState({ checkedB: true })
        }

    }, [backData.checkedB]);

    return (
        <div>
            <Checkbox
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="checkedB"
                color="primary"
                inputProps={{
                    'aria-label': 'secondary checkbox',
                }}
            />
        </div>
    );
}