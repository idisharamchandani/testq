import React from 'react'
import '../css/QuizStart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function QuizStart() {
    return(
        <div>
            <div className='d-flex justify-content-center'>
                <div className='border mt-5 instructions  w-50'>
                    <div><h2 className='text-center text-decoration-underline'>Quiz Instructions</h2></div>
                    <div>
                        <ul className='fs-5 mt-3'>
                            <li>Test will contain 5 questions</li>
                            <li>Each of 1 marks</li>
                        </ul>
                    </div>
                    <div className='d-grid gap-2 mb-3 ms-3 me-3'>
                    <button className='btn btn-success'>Start the quiz!!!</button>
                    </div>
                </div>

            </div>
        </div>
    )
}