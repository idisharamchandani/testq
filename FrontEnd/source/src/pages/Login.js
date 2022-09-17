import React, { useState } from 'react'
import '../css/Login.css';
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../components/Navbar';




toast.configure()

export default function Login() {

    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState();
    const [passerror, setPasserror] = useState();
    // const [message,setmessage] = useState();
    // const notify = (message) => toast(message);




    const handleSubmit = (e) => {
        console.log("email", Email)
        e.preventDefault();
        const checkemail = validation(Email)
        if (!checkemail) {
            return setError("please enter valid email")
        }
        else {
            if (Email == "") {
                return setError("please enter email")
            }
            setError();
        }
        console.log(checkemail, "checkemail")

        console.log(Password.length, "pl")

        if (Password.length < 6) {
            console.log(Password.length, "plll")

            return setPasserror("password should be more than 6 character")
        }
        else {
            setPasserror();
        }
        loginuser(Email, Password)
    }

    const validation = (Email) => {
        const result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return result.test(String(Email).toLowerCase());
    }


    const notify = () => {
        toast.success("Admin Login Successful!!!", {
            position: "top-center",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const notifyuser = () => {
        toast.success("Login Successful", {
            position: "top-center",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const notifyunauth = () => {
        toast.error("Invalid Email or Password", {
            position: "top-center",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    async function loginuser(Email, Password) {

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                body: JSON.stringify({
                    Email: Email,
                    Password: Password
                }),
                headers: {
                    'Content-Type': 'application/json ;charset=UTF-8'
                }
            });
            let data1 = await response.json();
            console.log(data1);
            if (data1) {
                localStorage.setItem('name', data1.FirstName);
                localStorage.setItem('userid', data1._id)
                localStorage.setItem('admin', data1.isAdmin);

                if (data1.isAdmin == true) {

                    console.log("Hello");
                    notify();
                    setTimeout(() => {
                        navigate("/admindashboard")
                    }, 2500);


                }
                else if (data1.isAdmin === false) {
                    console.log("Queix=z");
                    notifyuser();
                    setTimeout(() => {
                        navigate("/quiz")
                    }, 2500);

                }
                else {
                    console.log("not authorized");
                    notifyunauth();
                    setTimeout(() => {
                        navigate("/login")
                    }, 2500);

                }
            }


        } catch (err) {
            alert("Something Went Wrong");
            console.log(err);

        }
    }
    return (
        
        <div className='loginbg'>
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link> */}
            <div className='container' >
                {/* <h5 className='loginheading'>LOGIN</h5> */}
                <div className='d-flex justify-content-center'>
                    <div className='card login w-25 me-5'>
                        <div className='card-body'>
                            <div className='card-title mt-3 fs-3 ps-3'>Welcome Back!!</div>
                            <div className='card-subtitle mb-2 text-muted ps-3 mb-3' style={{fontSize:"12px"}}>Login to Continue...</div>


                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className='mt-4 ps-3 pe-3 email'>
                                    <label htmlFor='Email'>Email Address:</label><span style={{ color: "red" }}>*</span><br />
                                    <input className="logininput " type='text' name='email' id='email' value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                                    {error ? <p style={{ color: "red" }}>
                                        {error}
                                    </p> : null}
                                </div>
                                <div className='mt-3 ps-3 pe-3'>
                                    <label htmlFor='Password'>Password:</label><span style={{ color: "red" }}>*</span><br />
                                    <input className="logininput" type='password' name='password' id='password' value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                                    {
                                        passerror ? <p style={{ color: "red" }}>
                                            {passerror}
                                        </p> : null
                                    }
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-success mt-4 w-50 butn ' type='submit' >Log in</button>
                                    <FontAwesomeIcon icon="fa-regular fa-right-to-bracket" />
                                </div>
                            </form>
                        </div>



                        {/* <p style={{ marginBottom: "70px" }}><Link to='/lostpassword' className='passwordtext' >Lost your password?</Link></p> */}

                    </div>
                </div>

            </div>

        </div>
     
    )
}