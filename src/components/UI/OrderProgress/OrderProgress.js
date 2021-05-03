import React from 'react'
import PropTypes from 'prop-types';

import ProgressBar from 'react-bootstrap/ProgressBar'

const OrderProgress = (props) => {
    let status = props.status
    const progress = (s) => {
        let variant = ''
        let completion = 0
        switch (s) {
            case 0: variant = 'secondary'; completion = 0; break
            case 1: variant = 'warning '; completion = 25; break
            case 2: variant = 'primary'; completion = 50; break
            case 3: variant = 'info '; completion = 75; break
            case 4: variant = 'success'; completion = 100; break
            default: variant = 'light '; completion = 0
        }
        return [variant, completion]
    }

    let progressBarStatus = progress(props.status)

    return (
        <div >
            <ProgressBar animated={status < 4 ? true : false} striped={status === 4 ? true : false} variant={progressBarStatus[0]} now={progressBarStatus[1]} />
        </div>
    )
}

OrderProgress.propTypes = {
    status: PropTypes.number.isRequired
}

export default OrderProgress

