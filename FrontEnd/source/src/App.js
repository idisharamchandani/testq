import Home from "./pages/Home"
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./pages/AdminDashboard";
import AddUser from "./pages/AddUser";
import Questions from './pages/Questions';
import QuizStart from "./pages/QuizStart";
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import QuestionPaper from './pages/QuestionPaper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Quiz from "./pages/Quiz";
// import { faInstagram, faFacebookF, faPinterestP, faFontAwesome ,faFacebook , faPinterest, faTwitter} from '@fortawesome/free-brands-svg-icons'

library.add(fas)
function App() {
  return (
    <>

{/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

    <Router>
     
     
        <Routes>
        <Route exact path='/login' element={<Login />} />
     

          <Route exact path='/' element={<Home />} />
         
          <Route exact path='/admindashboard' element={<AdminDashboard />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/registerdone" element={<Register />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/questionpaper" element={<Questions />} />
          <Route exact path="/assignment" element={<QuestionPaper />} />
        </Routes>
        </Router>

     
      {/* <Quiz></Quiz> */}
      {/* <Router> 
    <AdminNavbar />
      <Routes>
        <Route exact path = '/' element = {<AdminDashboard />} />
        <Route exact path="/adduser" element = {<AddUser />} />
        <Route exact path="/questionpaper" element = {<Questions />} />
        <Route exact path="/quizinstructions" element = {<QuizStart />} />
        <Route exact path="/quiz" element = {<Quiz />} />
      </Routes>
    
    </Router> */}
   


    </>
  );
}

export default App;
