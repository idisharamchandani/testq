import React, { useState, useEffect} from 'react'
import '../css/Questions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Questions() {

    const [status, setstaus] = useState();
    const [questions, setQuestions] = useState([]);

    // const UPLOAD_URL = "http://localhost:8000/post/question";

const fileuploadhandler = async(e) => {
    let formData = new FormData();
    formData.append('Questions', e.target.files[0]);
    const res = await fetch("http://localhost:8000/post/question",{
        method:"POST",
        body: formData
    })
    const data = await res.json();
    console.log(data)
  
   
}
    // const fileuploadhandler = (e) => {
    //     let formData = new FormData();
    //     //formData.append('myfield',"uuidv4()");
    //     formData.append('Questions', e.target.files[0]);
    //     axios.post(UPLOAD_URL, formData, {
    //     }).then(res => {
    //         console.log('Res::::::::>', res.data.resp)
    //         setstaus(res.data.message)
    //     })



    // }
    // console.log('status::::>', status)

    // const getquestion = async () => {
    //     console.log("question fetching...")
    //     const response = await axios.get("http://localhost:8000/questions")
    //         .then((response) => response.json());
    //     setQuestions(response);
    //     console.log(response, "questions");
    // };

 
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
 const getquestion = () => {
    // console.log("question reached")
    const question = {
        method: "GET",
        url: "http://localhost:8000/questions",
    }

    axios.request(question).then((response) => {
        // console.log("res : ",response.data)
        setQuestions(response.data)

    }).catch((error) => {
        console.error(error)
    })
}
    

    // useEffect(() => {
    //     getquestion();
    // }, []);


    return (
        <div className='container d-flex justify-content-center'>
            <div>
                <form className='border w-75 mt-3 p-2'>
                    <div class="form-group">
                        <label for="questions">Questions:</label>
                        <br />
                        <input type="file" name='Questions' class="form-control-file" id="questions" onChange={(e) => fileuploadhandler(e)} />
                    </div>
                    
                </form>
                <button className='btn btn-success mt-3' onClick={getquestion} >Get Questions</button>
                <div>
                    <table className='table table-hover table-bordered mt-4'>
                        <thead  className='bg-dark text-white'>
                            <tr>
                                <th>Questions</th>
                                <th>Option1</th>
                                <th>Option2</th>
                                <th>Option3</th>
                                <th>CorrectAnswers</th>
                                <th>Subject</th>
                                <th>Standard</th>
                            </tr>
                        </thead>
                                               
                        <tbody>
                        {questions.map((question) => (
                            <tr>
                                <td>{question.Questions}</td>
                                <td>{question.Options[0]}</td>
                                <td>{question.Options[1]}</td>
                                <td>{question.Options[2]}</td>
                                <td>{question.Correct_Answers}</td>
                                <td>{question.Subject}</td>
                                <td>{question.Standard}</td>
                            
                            </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <Link to="/assignment"><button className='btn btn-success mt-3' type='Submit'>Make Quiz</button></Link>
            </div>
        </div>
    )
}
