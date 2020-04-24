import React from 'react'
import './css/App.css'
import {Link} from 'react-router-dom'
function Nav() {
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link className="nav-links" to="/Login">
                <li>SignIn</li>
                </Link>
                <Link className="nav-links" to="/SignUp">
                <li>SignUp</li>
                </Link>
                <Link className="nav-links" to="/">
                <li>Home</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav
