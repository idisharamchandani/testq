import React, { useState, useEffect } from 'react'
import '../css/Quiz.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const getquiz = () => {
        // console.log("question reached")
        const question = {
            method: "GET",
            url: "http://localhost:8000/ass/quiz",
            params: { userid: localStorage.getItem("userid") }
        }

        axios.request(question).then((response) => {
            // console.log("res : ",response.data)
            setQuestions(response.data)

        }).catch((error) => {
            console.error(error)
        })
    }


    useEffect(() => {
        getquiz();
    }, []);

    useEffect(() => {
        localStorage.setItem('quiz', JSON.stringify(questions));
        console.log(questions)
    }, [questions]);


    const postanswer = (answers) => {
        console.log(answers,"ans")
        const answersss = {
            method:"POST",
            url:"http://localhost:8000/post/answer"
        }
        axios.request(answersss).then((response) => {
            // console.log("res : ",response.data)
            setAnswers(response.data)

        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        localStorage.setItem('ans', JSON.stringify(answers));
        console.log(answers)
    }, [answers]);

    // async function postanswer(answers) {
    //     console.log("userans", localStorage.getItem("userid"))
    //     try {


    //         const response = await fetch("http://localhost:8000/post/answer", {

    //             method: "POST",
    //             body: JSON.stringify({
    //              UserId:localStorage.getItem("userid")
    //                 // UserID:localStorage.getItem("userid"),

    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json ;charset=UTF-8'
    //             }
    //         });
    //         console.log(response, "rs");
    //         let data1 = await response.json();
    //         console.log(data1, "ressssss");
    //         getquiz();
    //     } catch (err) {
    //         alert("Something Went Wrong");
    //         console.log(err);

    //     }
    // }

    return (
        <div>
            <div className='bgcolour'>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='card-title fs-3 text-center fw-bold text-decoration-underline'>
                                Time for Quiz
                            </div>
                            <div className='card'>
                                <div className='card-body'>
                                    {console.log("qqqq", questions)}
                                    {questions.map((qu) =>


                                    (

                                        <>
                                            {qu.Questions.map((qui) => {

                                                return (
                                                    <>
                                                        <div key={qui._id}>
                                                            <p className='card-text'>{qui.Questions}</p>
                                                            {qui.Options.map((op) => {
                                                                return (
                                                                    <>
                                                                        <ul class="list-group list-group-flush" >
                                                                            <li class="list-group-item">
                                                                                {console.log("qui", qui)}
                                                                                <input type="radio" id="option1" name={qui._id} value={op} onChange={(e) => setAnswers(e.target.name,questions)} />
                                                                                <label htmlFor='option1' className='ms-2'>
                                                                                    {op}
                                                                                </label>
                                                                            </li>
                                                                            {/* <li class="list-group-item">
                                                                        <input type="radio" id="option2" name={qui.QuestionID} value={qui.Options[1]} class="r" />
                                                                        <label htmlFor='option2' className='ms-2'>
                                                                            {op.Options}
                                                                        </label>
                                                                    </li>
                                                                    <li class="list-group-item">
                                                                        <input type="radio" id="option3" name={qui.QuestionID} value={qui.Options[2]} class="r" />
                                                                        <label htmlFor='option2' className='ms-2'>
                                                                            {op.Options}
                                                                        </label>
                                                                    </li> */}
                                                                        </ul>
                                                                        

                                                                    </>
                                                                )
                                                            })}


                                                        </div>
                                                      
                                                        
                                                    
                                                       
                                                    </>
                                                )
                                            })}
                                            
                                          
                                           
                                        </>
                                          
                                    ))}
                                     <button className='btn btn-success mb-3 ' onClick={(e) => postanswer(answers)}>Submit</button>
                                    {/* <div className='d-flex justify-content-center'>
                                        <button className='btn btn-success mb-3 ' onClick={(e) =>  postanswer()}>Submit</button>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
