import React from "react";
import Button from '@mui/material/Button';
import Logo from "../Logo/Logo";
import './nav.css';



function Navigation({onRouteChange, isSignedIn}) {
   if(isSignedIn) {
    return (
    <nav style={{display: "flex", justifyContent: 'space-between', padding:'10px', maxHeight:'3em'}}>
        <Logo />
        <Button onClick={()=>onRouteChange('signin')}>
             <p className="sign-out">Sign Out</p>
        </Button>
    </nav>
    )}
   else {return (
    <nav style={{display: "flex", justifyContent: 'space-between', padding:'10px', maxHeight:'3em'}}>
        <Logo />
        <div>
            <Button onClick={()=>onRouteChange('signin')}>
                <p className="sign-out">Sign In</p>
            </Button>
            <Button onClick={()=>onRouteChange('register')}>
                <p className="sign-out">Register</p>
            </Button>
        </div>
       
    </nav>
   )}
}

export default Navigation;