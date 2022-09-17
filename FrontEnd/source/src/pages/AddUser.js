import React, { useState } from 'react'
import '../css/CreateUser.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
// import { validate } from '../../../../API/Source/Models/questions';



export default function AddUser() {
    const navigate = useNavigate();


    const [fnameerror, setfnameerror] = useState();
    const [lnameerror, setlnameerror] = useState();
    const [standarderror, setstandarderror] = useState();
    const [countryerror, setcountryerror] = useState();
    const [streetaddresserror, setstreetaddresserror] = useState();
    const [towncityerror, settowncityerror] = useState();
    const [stateerror, setstateerror] = useState();
    const [pincodeerror, setpincodeerror] = useState();
    const [phonerror, setphonerror] = useState();
    const [error, setError] = useState();
    const [passerror, setPasserror] = useState();
    // const [inputerror , setinputerror] = useState();

    const notify = () => {
        toast.success("User Added Successfully", {
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
        toast.error("Email Already Exists", {
            position: "top-center",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
    const [user, setUser] = useState({
        FirstName: "", LastName: "", Standard: "", Country: "", StreetAddress: "", Town_City: "", State: "", PinCode: "", Phone: "", Email: "", Password: "", isAdmin: false
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value })
    }


    const PostData = async (e) => {
        e.preventDefault();



        const { FirstName, LastName, Standard, Country, StreetAddress, Town_City, State, PinCode, Phone, Email, Password, isAdmin } = user;

        // if(FirstName == "" && LastName == "" && Standard == "" && Country== "" && StreetAddress== "" && Town_City == "" && State== "" && PinCode == "" &&Phone== "" && Email== "" && Password)
        // {
        //     return setinputerror("Please Enter Fields")

        // }
        // else {
        //     setinputerror();
        // }

        if (FirstName == "") {
            return setfnameerror("Please Enter First Name")
        }
        else {
            setfnameerror();
        }

        if (LastName == "") {
            return setlnameerror("Please Enter Last Name")
        }
        else {
            setlnameerror();
        }

        if (Standard == "") {
            return setstandarderror("Select Standard")
        }
        else {
            setstandarderror();
        }

        if (Country == "") {
            return setcountryerror("Please Enter Country")
        }
        else {
            setcountryerror();
        }

        if (StreetAddress == "") {
            return setstreetaddresserror("Please Enter Address")
        }
        else {
            setstreetaddresserror();
        }

        if (Town_City == "") {
            return settowncityerror("Please Enter City")
        }
        else {
            settowncityerror();
        }


        if (State == "") {
            return setstateerror("Please Enter State")
        }
        else {
            setstateerror();
        }



        if (PinCode == "") {
            return setpincodeerror("Please Enter Pincode")
        }
        else {
            setpincodeerror();
        }


        if (Phone == "") {
            return setphonerror("Please Enter Phone Number")
        }
        else if (Phone.length < 10) {
            return setphonerror("Please Enter Complete Phone Number")

        } else {
            setphonerror();
        }

        // const checkphone = validationn(Phone)
        // if(!checkphone){
        //     return setphonerror("please enter Number")
        // }
        // else {
        //     if (Phone == "") {
        //         return setphonerror("please enter Phone")
        //     }
        //     setError();

        // }



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

        if (Password.length < 6) {
            console.log(Password.length, "plll")

            return setPasserror("password should be more than 6 character")
        }
        else {
            setPasserror();
        }

        //const res = await fetch("http://learning4kids-2451-disha-Api.radixind.in/checkout",{
        const res = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                FirstName, LastName, Standard, Country, StreetAddress, Town_City, State, PinCode, Phone, Email, Password, isAdmin

            })
        });
        const data = await res.json();
        console.log(data)
        if (res.status === 201) {
            notify();

            setTimeout(() => {
                navigate("/questionpaper")
            }, 2500);
        } else if (res.status === 400) {
            notifyuser();
        }
        else {
            navigate("/adduser")
        }

        res.send(data);





    }

    const validation = (Email) => {
        const result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return result.test(String(Email).toLowerCase());
    }

    // const validationn = (Phone) => {
    //     const result = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    //     return result.test(String(Phone).Number());


    // }

    return (
        <div style={{ backgroundColor: "#26abff", height: "100vh" }}>
            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div className='card mt-5'>
                        <div className='card-title fs-3 mt-3 text-center'>Add User</div>
                        <div className='card-body'>
                            <form className='mt-3 register ' onSubmit={(e) => PostData(e)}>
                                <div className='user'>
                                    <div className='user1'>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='fname'>First Name:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='FirstName' id='fname' value={user.FirstName} onChange={handleInputs}></input>
                                            {

                                                fnameerror ? <p style={{ color: "red" }}>
                                                    {fnameerror}

                                                </p> : null
                                            }
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='lname'>Last Name:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='LastName' id='lname' value={user.LastName} onChange={handleInputs}></input>
                                            {

                                                lnameerror ? <p style={{ color: "red" }}>
                                                    {lnameerror}

                                                </p> : null
                                            }
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='std'>Standard:</label><span style={{ color: "red" }}>*</span><br />
                                            <select style={{ width: "250px", height: "30px" }} name='Standard' value={user.Standard} onChange={handleInputs} >
                                                <option value='select'>Select a standard</option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                                <option value='6'>6</option>
                                                <option value='7'>7</option>
                                                <option value='8'>8</option>
                                                <option value='9'>9</option>
                                                <option value='10'>10</option>
                                                <option value='11'>11</option>
                                                <option value='12'>12</option>
                                            </select>
                                            {

                                                standarderror ? <p style={{ color: "red" }}>
                                                    {standarderror}

                                                </p> : null
                                            }
                                        </div>
                                        {/* <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='Gender'>Gender:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='Country' id='phone' value={user.Country} onChange={handleInputs}></input>
                                            {

                                                countryerror ? <p style={{ color: "red" }}>
                                                    {countryerror}

                                                </p> : null
                                            }
                                        </div> */}


                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='Country'>Country:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='Country' id='phone' value={user.Country} onChange={handleInputs}></input>
                                            {

                                                countryerror ? <p style={{ color: "red" }}>
                                                    {countryerror}

                                                </p> : null
                                            }
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='phone'>Address:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='StreetAddress' id='phone' value={user.StreetAddress} onChange={handleInputs}></input>
                                            {

                                                streetaddresserror ? <p style={{ color: "red" }}>
                                                    {streetaddresserror}

                                                </p> : null
                                            }
                                        </div>


                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='phone'>City:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='Town_City' id='phone' value={user.Town_City} onChange={handleInputs}></input>

                                            {

                                                towncityerror ? <p style={{ color: "red" }}>
                                                    {towncityerror}

                                                </p> : null
                                            }
                                        </div>
                                    </div>
                                    <div className='user2'>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='phone'>State:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='State' id='phone' value={user.State} onChange={handleInputs}></input>
                                            {

                                                stateerror ? <p style={{ color: "red" }}>
                                                    {stateerror}

                                                </p> : null
                                            }
                                        </div>

                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='phone'>PinCode:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='PinCode' id='phone' value={user.PinCode} onChange={handleInputs}></input>
                                            {

                                                pincodeerror ? <p style={{ color: "red" }}>
                                                    {pincodeerror}

                                                </p> : null
                                            }
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='phone'>Phone:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='Phone' id='phone' value={user.Phone} onChange={handleInputs}></input>
                                            {

                                                phonerror ? <p style={{ color: "red" }}>
                                                    {phonerror}

                                                </p> : null
                                            }
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='email'>Email:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='text' name='Email' id='email' value={user.Email} onChange={handleInputs} ></input>

                                            {error ? <p style={{ color: "red" }}>
                                                {error}
                                            </p> : null}
                                        </div>
                                        <div className='mt-3 ps-3 pe-3'>
                                            <label htmlFor='password'>Password:</label><span style={{ color: "red" }}>*</span><br />
                                            <input className="userinput" type='password' name='Password' id='password' value={user.Password} onChange={handleInputs} ></input>

                                            {
                                                passerror ? <p style={{ color: "red" }}>
                                                    {passerror}
                                                </p> : null
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className='submitbutton mb-4 mt-4' type='submit'>Submit</button>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}