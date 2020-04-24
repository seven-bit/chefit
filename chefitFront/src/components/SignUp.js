import React,{useState} from 'react'
import {Link} from 'react-router-dom'
function SignUp(props) {
    let [Name,nameUpdated] = useState('')
    let [Email,emailUpdated] = useState('')
    let [Password,passwordUpdated] = useState('')
    let [Number,numberUpdated] = useState(null)
    return (<>
        <div className="login-page">
        <div className="form">
          <form className="login-form">
            <h1 className='SignIn'><b>Register</b></h1>
            <input type="text"  value={Name} onChange={(event)=>nameUpdated(Name=event.target.value)} placeholder="Name" />
            <input type="email" value={Email} onChange={(event)=>emailUpdated(Email=event.target.value)} placeholder="Email" />
            <input type="tel" value={Number} onChange={(event)=>numberUpdated(Name=event.target.value)} placeholder="Phone Number"/>
            <input type="password" value={Password} onChange={(event)=>passwordUpdated(Name=event.target.value)} placeholder="Password"/>
            <button type="submit">Register</button>
            <Link to="/Login">
            <p className="message">Got a account Sign In!</p>
            </Link>
          </form>
        </div>
        
      </div>
      </>
    );
}

export default SignUp
