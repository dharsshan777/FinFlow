import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

import './Profileupd.css'
import Navbar from '../component/Navbar';
import { useNavigate } from 'react-router-dom';


export default function Profileupd() {

  const navigate=useNavigate();


  const[form,setForm]=useState({
    Firstname:"",
    Lastname:""

  });


  const handlechange=(e) =>{

    setForm({
      ...form,[e.target.name]:e.target.value
    });

  };

  const loggedUser = JSON.parse(
    localStorage.getItem('loggedUser')
);

const handlesubmit=(event)=>{
  event.preventDefault();


  if(!form.Firstname || ! form.Lastname){
    alert("please enter your first name and last name")
    return;
  }
  localStorage.getItem('userProfile',JSON.stringify('loggedUser'));

 if (!loggedUser || !loggedUser.email) { 
  alert("Please login again"); 
  navigate('/signin'); 
  return;
 }


 const profileKey = `userProfile_${loggedUser.email}`;

 localStorage.setItem( profileKey, JSON.stringify(form) );

 navigate('/dashboard'); 
};
  return (
    <div>

      <Navbar></Navbar>

      


      <div className='profile-setup-page'>

        <form className='profile-setup-card' onSubmit={handlesubmit}>

          {/* profile logo */}
          <div className='profile-logo'>
            <span style={{color:'#030164'}}>Expense</span>Wise
          </div>


          {/* profile avatar */}

          <div className='profile-avatar'>
            <IoPerson />
          </div>


          <h2>Profile Setup</h2>

          <div className='profile-description'>
            Let's personalize your experience.
          </div>



          <input type='text' placeholder='First Name' name='Firstname' onChange={handlechange} value={form.Firstname} ></input>

          <input type='text' placeholder='Last Name' name='Lastname' onChange={handlechange} value={form.Lastname}></input>


          <div className='profile-note'>
            Your name will be displayed on your dashboard.
          </div>


          <button type='submit' className='profile-card-btn d-flex gap-1 align-items-center justify-content-center'>Continue
           <MdArrowRightAlt />
          </button>








        </form>











      </div>










    </div>
  )
}
