import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import faceIcon from './face-icon-100.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="br2 shadow-2 Tilt" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop:'5px'}} src={faceIcon} alt='Logo' /> 
                </div>
            </Tilt>

        </div>
    );
}

export default Logo;
// credit for image: <a target="_blank" href="https://icons8.com/icons/set/face-id">Face ID icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>