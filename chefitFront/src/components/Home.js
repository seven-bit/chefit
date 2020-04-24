import React from 'react'
import './css/FrontEnd.css'
import food from './images/Food.png'
import logo from './images/Logo.png'
function Home(props) {
    return (<div>
        <div class='Header'>
        <img class='CentreLogo' alt='ChefIt-Logo' src={logo} />
        </div>
        <div class='MiddleBody'>
            <img class='Food'alt='background' src={food}/>
        </div>
    </div>
    )
}

export default Home
