import React from 'react'
import chef from './chefit.png'
import './Home.css'
function Home() {
    return (
        <div className='tc container'>
            <img style={{width:'84%', height:'auto'}} src={chef}/>
            <div className="centered">
            
                <p>We can not bring your mom at your place to cook, but you can book a cook</p>
                <p>Just   <var className="inside"> Chef It</var></p>
                <p className='book'>Book Now</p>
                
            </div>
        </div>
    )
}

export default Home
