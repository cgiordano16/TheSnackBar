import React, { useState, useEffect } from 'react'
import {User_Buttons} from '../buttons/User_Buttons'
import {Sign_In_Button} from '../buttons/signin_button'
import board from '../images/board.jpg'
import '../App.css'

function header(){
    return(
      <>
        <div>
          <h1 className = "header_home">The SnackBar</h1>
          <h2 className = 'header_desc'>A good place to find your snack options.</h2>
        </div>
      </>
    )
  }

export default function Home() {
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:9000/login/session',{
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (Object.entries(result).length !== 0) {
            setSession(true);
            setLoading(false);
          } else {
            setSession(false);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error: ', error)
        });  
  }, []);
  if (loading === true) {
    return <h2>Loading...</h2>
  }
    return (
        <>
          <div>
            <User_Buttons />
            <Sign_In_Button/>
            <>{header()}</>
            <div className = "homepage_images_container">
              <img src = {board} alt = 'some text'/>
            </div>
            <hr></hr>
          </div>
          <div className = "body_text_container">
            <p id = "body_text">
              Welcome to Spring 2021 SSW 215. This is the final project that we put together for this class. We aimed to 
              create a website to catalog various snack options that exist today. <br/> <br/>
              Once you create an account you will be able to see all of our options.
            </p>
          </div>
          <footer>
            I pledge my honor that I have abided by the Stevens Honor Code.  <br></br>
            Christopher Giordano, Dhru Patel
          </footer>
        </>
      );
}

