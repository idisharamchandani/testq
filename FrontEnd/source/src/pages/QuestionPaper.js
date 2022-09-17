import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Questions(props) {
    const [userdata, setUserdata] = useState([]);
    const [details, setDetails] = useState([]);
    const [standard, setStandard] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [success, setsuccess] = useState(false);

    // console.log("Question s : ", standard[0].Standard)

    // console.log("Question s : ", standard[0].Standard)


    const user = async () => {
        const response = await fetch("http://localhost:8000/ass/getallusers")
            .then((response) => response.json());
        setUserdata(response);
    };

    useEffect(() => {
        user();
    }, []);

    const getdetails = async (_id) => {



        let result = await fetch(`http://localhost:8000/ass/getanuser/${_id}`, {
            method: "GET"
        });
        result = await result.json()
        setDetails(result);
        console.log(result);
    }


    const std = async () => {
        const response = await fetch("http://localhost:8000/ass/getquestions")
            .then((response) => response.json());
        // console.log("Response ; ", response)
        // setStandard(response);
        console.log("sss", standard)
    };

    useEffect(() => {
        std();
    }, []);

    // const getquestions = async(Standard) => {

    //     let result = await fetch("http://localhost:8000/ass/getanquestion?"  + new URLSearchParams({Standard: Standard}),{
    //     method:"GET"
    // });
    // result = await result.json()
    // setQuestions(result);
    // console.log(result);
    // }

    const getquestions = (standard) => {
        // console.log("question reached")
        const question = {
            method: "GET",
            url: "http://localhost:8000/ass/getanquestion",
            params: { Standard: standard }
        }

        axios.request(question).then((response) => {
            // console.log("res : ",response.data)
            setQuestions(response.data)
            setsuccess(!success)

        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        if (standard) getquestions()
    }, [standard])

    const items = [6, 7, 8, 9, 10, 11, 12]

    // async function getquestions(Standard)
    // {
    //     try{
    //         const response  = await fetch("http://localhost:8000/ass/getanquestion",{
    //             method:"GET",
    //             body: JSON.stringify({
    //                 Standard:Standard
    //             }),
    //             headers:{
    //                 'Content-Type':'application/json ;charset=UTF-8'
    //             }
    //         });
    //         let data1 = await response.json();
    //         console.log(data1);
    //       } catch (err) {
    //         alert("Something Went Wrong");
    //         console.log(err);
    //       }
    //     }


    async function submit(Questionsss) {
        console.log(Questionsss, "qqqq")
        console.log(details[0]._id, "dddata")
        const userid = localStorage.getItem("userid")
        try {
            const response = await fetch("http://localhost:8000/ass/submit", {
                method: "POST",
                body: JSON.stringify({
                    User: details[0]._id,
                    Questions: Questionsss
                }),
                headers: { 'Content-Type': 'application/json' },

            });
            let data1 = await response.json();
            console.log(data1);
            notifysubmit();
        } catch (err) {
            alert("Something Went Wrong");
            console.log(err);

        }
    }

    const notifysubmit = () => {
        toast.success("Submitted Successful", {
            position: "top-center",
            autoClose: 1999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    return (
        <div className='container'>
            <div className='text-center fs-3 mt-3 '>Set Question Paper</div>
            <div className='fs-5 mt-3 ms-5'>Users:</div>
            <table className='table table-hover table-bordered mt-3 w-75 ms-5 align-self-center'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th scope="col">FirstName</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.map((ud) => {
                        return (
                            <tr>
                                <td>{ud.FirstName}</td>
                                <td><button className='btn btn-primary' onClick={(e) => getdetails(ud._id)}>Details</button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>

            <div className='fs-5 mt-5 ms-5'>Details of Particular User:</div>

            <table className='table table-hover table-bordered mt-3 w-75 ms-5 align-self-center'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Standard</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail) => {
                        return (
                            <tr>
                                <td>{detail.FirstName}</td>
                                <td>{detail.LastName}</td>
                                <td>{detail.Standard}</td>
                            </tr>

                        )
                    })}
                </tbody>

            </table>

            <div>
                <div className='fs-5 mt-5 ms-5'>Select the Standard:</div>

                <table className='table table-hover table-bordered mt-3 w-75 ms-5 align-self-center'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Standard</th>
                            <th>Questions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {items.map((item) => {
                            return (
                                <tr>
                                    {/* {console.log(sttd,"standard")} */}
                                    <td>{item}</td>
                                    <td><button className='btn btn-primary' onClick={(e) => getquestions(item)}>Select</button></td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
                <div className='fs-5 mt-5 ms-5'>Question Papers:</div>
                <table className='table table-hover table-bordered mt-3 w-75 ms-5 align-self-center'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>Questions</th>
                            <th>Option1</th>
                            <th>Option2</th>
                            <th>Option3</th>
                            <th>Standard</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => {
                            return (
                                <tr>
                                    <td>{q.Questions}</td>
                                    <td>{q.Options[0]}</td>
                                    <td>{q.Options[1]}</td>
                                    <td>{q.Options[2]}</td>
                                    <td>{q.Standard}</td>

                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* {console.log(questions)} */}
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success mb-3 ' onClick={(e) => submit(questions)}>Submit</button>
            </div>

            

        </div>

    )
}