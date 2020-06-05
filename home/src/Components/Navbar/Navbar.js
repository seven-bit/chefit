import React from 'react'
import logo from './Logo.png'
import './Navbar.css'
function Navbar() {
    return (
        <nav className='cont' >
            
            <img style={{ height: 60, width: 'auto' }} src={logo}/>

            <p className="master">Master of Kitchen</p>
            <div style={{width:160,display:'flex', justifyContent:'space-between'}}>
            <p className='link dim black pointer'>Login</p>
            <p className='button'>Sign Up</p>
            </div>
            
        
        </nav>
    )
}

export default Navbar
