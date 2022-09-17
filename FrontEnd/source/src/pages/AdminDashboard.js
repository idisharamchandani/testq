import React from 'react'
import '../css/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
    return(
        <div><Navbar></Navbar>
        <div className='container'>
            <div className='main'>
            <div className='card w-25 p-5 h-25 text-center mt-3 bg-primary'>
                <Link to="/adduser" className='pe-auto'><div className='card-title mt-2 fs-5 '><span><FontAwesomeIcon icon="fa-solid fa-plus" /></span>&nbsp;&nbsp;Add User</div></Link>
            </div>
            <div className='card w-25 p-5 h-25 text-center mt-3 bg-success'>
            <Link to="/questionpaper" className='pe-auto'><div className='card-title mt-2 fs-5'><span><FontAwesomeIcon icon="fa-solid fa-file-circle-question" /></span>&nbsp;&nbsp;Questions</div></Link>
            </div>
            <div className='card w-25 p-5 h-25 text-center mt-3 bg-danger'>
            <Link to="/marks" className='pe-auto'><div className='card-title mt-2 fs-5'><span><FontAwesomeIcon icon="fa-solid fa-marker" /></span>&nbsp;&nbsp;Evaluation</div></Link>
            </div>
            </div>

        </div>
        </div>
    )
}

