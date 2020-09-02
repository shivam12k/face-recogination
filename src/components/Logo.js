import React from 'react';
import Tilt from 'react-tilt';
import person from './Logo-src/person.png'

const Logo = () => {
    return (<div>
        <Tilt className="Tilt br2 shadow-2 logo " options={{ max: 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"> <img src={person} alt='logo' /> </div>
        </Tilt>
    </div>);
}
export default Logo;