import React, { Fragment } from 'react';


const Rank = ({ name, entries }) => {
    return(
        <Fragment>
        <div className='center f2'>
        <p>{`Hi ${name}, your current entry count is ${entries}`}</p>
        </div>
        </Fragment>
       
    );
}

export default Rank;