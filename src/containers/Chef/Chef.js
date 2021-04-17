import React from 'react'
//import { Carousel, Card } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import {ProgressBar} from 'react-bootstrap'

import {FaConnectdevelop} from "react-icons/fa";


const Chef = () => {
    return (
        <>
        <ProgressBar now={30} animated={true} />
        <div className="progress">
            <div style={{backgroundColor:'red', width:"30%"}}></div>
        </div>
        <FaConnectdevelop style={{fontSize:"300px"}} />
        </>

    )
}

export default Chef
