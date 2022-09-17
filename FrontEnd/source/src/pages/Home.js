import React from 'react'
import '../css/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


export default function Home() {
    return(
        <div>
            <div className='bgimg'>
                <div className='bgtext'>
                    <h1 style={{fontSize:"115px"}}>Ready For<br /> <span>Quiz??</span></h1>
                    <Link to="/login"><button className='btn btn-success w-50 mt-4'>Let's Get Started<span><FontAwesomeIcon icon="fa-solid fa-arrow-right" className='ms-3'/></span></button></Link>

                </div>
            </div>
        </div>
    )
}