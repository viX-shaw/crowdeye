import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'

export default props => 
  <div className='buttons fadein'>
    <div className='button'>
      <p>Select an image</p>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>
  </div>