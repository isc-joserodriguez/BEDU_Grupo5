import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

function OrderProgress(props) {
    let status = props.status
    function progress(s) {
        let variant = ''
        let completion = 0
        switch (s) {
            case 0: variant = 'secondary'; completion = 0; break
            case 1: variant = 'secondary '; completion = 25; break
            case 2: variant = 'primary'; completion = 50; break
            case 3: variant = 'info '; completion = 75; break
            case 4: variant = 'success'; completion = 100; break
            default:variant = 'light '; completion = 0
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

export default OrderProgress

