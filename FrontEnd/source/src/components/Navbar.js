import React from 'react'
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




export default function Navbar() {
    return (

        <div>
            <div>
                <header>
                    <div className="navbar bar bg-dark navbar-expand-lg">
                        <div className="container-fluid d-flex justify-content-end">
                            <div>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 unstyled">
                                    <li className="nav-item">
                                        <Link  className="nav-link" to="/login" ><FontAwesomeIcon icon="fa-solid fa-user" className='fa' /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </header>

            </div>
        </div>


    )
}