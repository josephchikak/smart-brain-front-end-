import React from "react";
import { Input } from '@mui/material';
import './signin.css'
import { Button } from '@mui/material';
import { useState } from "react";

const Register =({onRouteChange, loadUser}) =>{
    const [registerEmail, setRegisterEmail] = (useState(''));
    const [registerPassWord, setRegisterPassword] = (useState(''));
    const [registerName, setRegisterName] = (useState(''));
    
    const onNameChange =(event)=>{
        setRegisterName(event.target.value)
    }
    
     const onEmailChange =(event)=>{
        setRegisterEmail(event.target.value)
    }
    
    const onPasswordChange = (event)=>{
        setRegisterPassword(event.target.value)
    }

    const onSubmitSignUp = () =>{
        fetch('https://shrouded-tundra-93526.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassWord
            })
    
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
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
            <p style={{textAlign:"center"}}>Sign Up</p>
            <Input style={{color:'white'}} type='text' placeholder="Name" id="name" onChange={(event) => onNameChange(event)}/>
            <Input style={{color:'white'}} type='email' placeholder="Email" id="email"  onChange={(event) => onEmailChange(event)}/>
            <Input  style={{color:'white'}}type="password"  placeholder="Password" id="password" onChange={(event)=> onPasswordChange(event)}/>
            <Button style={{marginTop: '10px'}} variant="contained" type="submit" onClick={()=>onSubmitSignUp()}>Sign Up</Button>
            <Button style={{marginTop: '10px', fontWeight:'bold'}} variant="text" type="submit" onClick={()=>onRouteChange('singin')} >Sign In</Button>
        </div>
    </div>

 </div>
   
</>
)

}

export default Register