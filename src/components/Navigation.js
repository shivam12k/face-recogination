import React from 'react';

const Navigation = ({ onroutechange, IsSignedIn }) => {
  if (IsSignedIn) {
    return (<nav className='sign'>
      <p
        onClick={() => onroutechange('signin')}
        className='f3 link din black underline pa3 pointer grow'
      >Sign Out</p>
    </nav>);
  }
  else {
    return (
      <nav className="sign2">
        <p
          onClick={() => onroutechange('signin')}
          className='f3 link din black underline pa3 pointer grow'
        >Sign In</p>
        <p
          onClick={() => onroutechange('register')}
          className='f3 link din black underline pa3 pointer grow'
        >Register</p>
     </nav>

    
    );
  }
}
export default Navigation;
