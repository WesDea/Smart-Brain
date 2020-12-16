import React, { Fragment } from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onSubmit, error, errorMessage }) => {
    //displays error if there is one to display
    const errorDiv = error ? <div className="center ma3 color-red">{errorMessage}</div>: '';
    return(
        <Fragment>
       <p className='f3 center'>
           {'This Magic Brain will detect a face in your pictures. Give it a shot.'}
       </p>
       {errorDiv}
       <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
           <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
           <button 
           className='w30 grow f4 ph3 pv2 dib white bg-light-purple'
           onClick={onSubmit}
           >Detect</button>
           </div>
       </div>
       </Fragment>
    );
}

export default ImageLinkForm;