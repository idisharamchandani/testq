import React from 'react'
import '../css/Done.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function LostPassword() {
    return (
        <div>
            <div className='container'>
                <div className='border donepage'>
                    <div><FontAwesomeIcon icon="fa-solid fa-check" className='donemark' /></div>
                    <div>Registration Successfully</div>
                </div>
                <div>
                    <div className='d-flex justify-content-start'>
                        <Link to="/adduser"><button className='backbutton btn btn-primary mb-4 mt-4 d-flex '><FontAwesomeIcon icon="fa-solid fa-arrow-left" /><span className='ms-2'></span>Back</button></Link>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Link to="/questionpaper"><button className='backbutton btn btn-primary mb-4 me-3 '>Next<span className='ms-2'></span><FontAwesomeIcon icon="fa-solid fa-arrow-right" /></button></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}