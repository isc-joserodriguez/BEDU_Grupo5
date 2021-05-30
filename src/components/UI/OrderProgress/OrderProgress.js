import React from 'react'
import PropTypes from 'prop-types';

import ProgressBar from 'react-bootstrap/ProgressBar'

const OrderProgress = (props) => {
    let status = props.status
    const progress = {
        0: { variant: 'secondary', completion: 0 },
        1: { variant: 'warning ', completion: 25 },
        2: { variant: 'primary', completion: 50 },
        3: { variant: 'info ', completion: 75 },
        4: { variant: 'success', completion: 100 },
    }

    const { variant, completion } = progress[props.status]

    return (
        <div >
            <ProgressBar
                animated={status < 4 ? true : false}
                striped={status === 4 ? true : false}
                variant={variant}
                now={completion}
            />
        </div>
    )
}

OrderProgress.propTypes = {
    status: PropTypes.number.isRequired
}

export default OrderProgress

