import React, { useState } from 'react'
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';


export default function Signup() {

  const[form,setForm]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate();


  function fun(e){
    setForm({...form,[e.target.name]:e.target.value})
  }


  // submit the form

  function handlesub(event){
    event.preventDefault();
    
    const getdata1=localStorage.getItem('userdata');

    let pass1= getdata1 ? JSON.parse(getdata1):[];



 
    const existuser= pass1.find((user)=> 
    user.email === form.email)


    // checking condition

    if(existuser){
      alert("This user is already registered in our page");
      setForm({
        email:'',
        password:''
      })
      return;
    }
  
     pass1.push(form);

     localStorage.setItem('userdata' ,JSON.stringify(pass1));
     alert("Successfully registered..!! please login");
     navigate('/signin');


    }









  return (
    <div>

      <Navbar></Navbar>


        <div className='main-content'>


{/* logo and logo name */}
          

    {/* form inputs */}
          
          <form className='card-sign' onSubmit={handlesub}>

                      
            <div className="auth-logo">

      <img
        src="/images/expensewise-logo.png"
        alt="ExpenseWise Logo"
        width="45"
        height="45"
      />

      <div className="d-flex align-items-center">
        <span className="fw-bold fs-4 logo-brand" style={{ color: '#1C325B' }}>
          Fin
        </span>

        <span className="fw-bold fs-4 logo-brand" style={{ color: '#6A669D' }}>
          Flow
        </span>
      </div>

    </div>

          <h6 className='sign-hed'>Sign up with email</h6>


            <input type='email' placeholder='Email' required name='email' value={form.email} onChange={fun}></input>

            <input type='password' placeholder='password' required name='password'value={form.password} onChange={fun}></input>

            <button type='submit' className='auth-btn'>SIGN UP</button>

          <p className='auth-footer'>Already have account?

            <Link to={'/signin'} className='log-txxt'>Login</Link>
</p> 
          



          </form>







        </div>




      
    </div>
  )
}
