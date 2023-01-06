import React from "react";
import { Input } from '@mui/material';
import './signin.css'
import { Button } from '@mui/material';
import { useState } from "react";

const SignIn =({onRouteChange, loadUser}) =>{
const [signInEmail, setSignInEmail] = (useState(''));
const [signInPassWord, setSignInPassword] = (useState(''));

 const onEmailChange =(event)=>{
    setSignInEmail(event.target.value)

}

const onPasswordChange = (event)=>{
    setSignInPassword(event.target.value)
    
}

const onSubmitSignIn = () =>{
    fetch('https://smart-brain-api-production-6c94.up.railway.app/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            email: signInEmail,
            password: signInPassWord
        })

    })
    .then(response => response.json())
    .then(user =>{
        if (user.id){
            loadUser(user)
            onRouteChange('home');
        }
    })
}


return(
 <>
 <div className='sign-container'>
    <div className="sign-in">
        <div className="fm" >
            <p style={{textAlign:"center"}}>Sign In</p>
            <Input style={{color:'white'}} type='email' placeholder="Email"  onChange={(event)=>onEmailChange(event)}/>
            <Input  style={{color:'white'}}type="password"  placeholder="Password" onChange={(event)=>onPasswordChange(event)}/>
            <Button style={{marginTop: '10px'}} variant="contained" type="submit" onClick={()=>onSubmitSignIn()}>Sign In</Button>
            <Button style={{marginTop: '10px', fontWeight:'bold'}} variant="text" onClick={()=>onRouteChange('register')} >Register</Button>
        </div>
    </div>
 </div>
   
</>
)

}

export default SignIn