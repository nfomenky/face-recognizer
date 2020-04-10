import React from 'react'

const Navigation = ({ onRouteChange }) => {
    return (
        isSignedIn ?
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('signin')}
                >Sign out</p>
            </nav>

            :
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className='f3 link dim black underline pa3 pointer'
                        onClick={() => onRouteChange('home')}
                    >Sign In</p>
                    <p className='f3 link dim black underline pa3 pointer'
                        onClick={() => onRouteChange('home')}
                    >Register</p>
                </nav>
    );
}

export default Navigation;