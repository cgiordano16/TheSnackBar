import React from 'react'
import '../App.css'
import profile_dhru from '../images/dhru.png'
import profile_chris from '../images/Chris.png'

export default function about() {
    return (
        <>
        <div>
            <h1 className = 'page-header'>About Us</h1>
        </div>

        <div className = 'image-container'>
            <img src = {profile_chris} alt = 'chris' className = 'profile_picture'/>
        </div>

        <div className = 'name-container'>
            <h2 className = 'nametag'>Christopher Giordano</h2>
        </div>

        <div className = 'bio-container'>
            <p className = "bio"> Chris is a senior studying Computer Engineering at Stevens. He participated in 
                the cooperative education program. In addition he has been involved with the Poker Club 
                on campus.
            </p>
        </div>

        <div className = 'image-container'>
            <img src = {profile_dhru} alt = 'dhru' className = 'profile_picture'/>
        </div>

        <div className = 'name-container'>
            <h2 className = 'nametag'>Dhru A. Patel</h2>
        </div>

        <div className = 'bio-container'>
            <p className = "bio"> Dhru is a senior studying Computer Engineering at Stevens. He participated in 
                the cooperative education program. In addition he has been involved with the Indian
                Undergraduate Association on campus. He is a big philly sports guy and a one time viral tiktok star.
            </p>
        </div>
        <footer>
            I pledge my honor that I have abided by the Stevens Honor Code.  <br></br>
            Christopher Giordano, Dhru Patel
        </footer>
        </>
      );
}

