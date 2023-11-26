// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import Home from './components/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InvoicePopup from './components/Invoices.jsx';
// import Invoice from './components/invoice1'
import Template from './components/Template';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
        {/* <Route path='/invoice1' element={<Template/>}/> */}
          <Route path='/' element={<App/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/home/invoices' element={<InvoicePopup/>} />
          <Route path='/invoice1' element={<Template/>}/>
        </Routes>
      </BrowserRouter>
      
  </React.StrictMode>,
)
