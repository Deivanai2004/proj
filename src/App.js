
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Rough from './components/Rough';
// import Home from './components/Home.jsx'
// // import Items from './components/Home';
// import { BrowserRouter as Routes, Route, Router} from 'react-router-dom';
// // import Navbarr from './components/Navbar';
// // import Courses from './components/Courses'

// function App() {
//   return (
//     <div className="App">
      
    
      
  
//       <Router>
//       <Rough/>
//       <Routes>
     

        
     
//     </Routes>
//     </Router>
   
//     </div>
//   );
// }

// export default App;
import React from 'react'
import {FloatingLabel,Form,Button} from 'react-bootstrap'
import './App.css'
import { Link } from 'react-router-dom'
import logo from './assets/img/image1.png';

function App() {

  return (
    <div className="App">
    <div className='logo'>
    <img src={logo} height='50' width='150'  alt="Logo" />
    <h2 id='title'>Please sign in</h2>
  </div>
     <div className='Alignment'>
        <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <label className='checkbox' ><input type='checkbox'/><p id='para'>Remember Me</p></label>
      </div>
        <Link to='/home'><Button style={{backgroundColor:'#9975f3', width:'300px', marginTop:'10px'}} variant="primary">Sign in</Button></Link>
          <footer className='footer'>&copy; VPS CodeBuilders Private Limited <br></br>2017-2023</footer>
         
          </div>
  )
}

export default App

