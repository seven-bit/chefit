import React,{useState} from 'react';
import './css/login.css';
import {Link} from 'react-router-dom';
function Login(props){
  let [username,usernameInputed]=useState("")
  let [password,passwordInputed]=useState("")
  let [loginstatus,loginInitiated]=useState(false)

  return( 
                <div className="login-page">
                <div className="form">
                  <form className="login-form">
                    <h1 className='SignIn'>Sign In</h1>
                    <input type="text"  value={username} onChange={(event)=>usernameInputed(username=event.target.value)} placeholder="username" />
                    <input type="password" value={password} onChange={(event)=>passwordInputed(username=event.target.value)}placeholder="password" />
                    <button type='submit'>login</button>
                    <Link to='/Dashboard'>
                    <p className="message">Not registered? Create an account</p>
                    </Link>
                  
                  </form>
                </div>
              </div>

  );
}


export default Login;