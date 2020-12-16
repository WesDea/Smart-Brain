import React, { Fragment } from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = ({ refreshPage }) => {
    return(
        <Fragment>
            <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-5" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div onClick={ refreshPage } className="Tilt-inner"><img className='icon' alt='logo' src={brain}/> </div>
            </Tilt>
            </div>
        </Fragment>
    )
}

export default Logo;