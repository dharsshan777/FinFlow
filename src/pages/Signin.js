import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import './signin.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {


    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",
        password: ""
    })




    function fun(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function handlesub(event) {
        event.preventDefault();


        const getdata1 = localStorage.getItem('userdata');

        let pass1 = getdata1 ? JSON.parse(getdata1) : [];


        const olduser = pass1.find((item) =>
            item.email === form.email && item.password === form.password)

        if (!olduser) {
            alert("Invalid email or password");
            setForm({
                email: "",
                password: ""
            })
            return;
        }
        localStorage.setItem("loggedUser", JSON.stringify(olduser));


        const profileKey = `userProfile_${olduser.email}`;

        const savedProfile = localStorage.getItem(profileKey);

        if (savedProfile) {
            // Existing user: Go directly to Dashboard
            alert("Logged In successfully..!!");
            navigate('/dashboard');
        } else {
            // First-time user: Go to Profile Setup
            alert("Logged In successfully..!!");
            navigate('/profileupd');
        }
    }
    return (
        <div>

            <Navbar></Navbar>

            <div className='logmain-cont'>



                <form className='log-card' onSubmit={handlesub}>

                    <div className='logo-auth'>

                        <img
                            src='/images/expensewise-logo.png'
                            alt='FinFlow logo'
                            width='55'
                            height='55'
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


                    <h6 className='login-email'>Login with email</h6>


                    <input type='email' placeholder='email' name='email' value={form.email} onChange={fun}></input>

                    <input type='password' placeholder='password' name='password' value={form.password} onChange={fun}></input>

                    <button type='submit' className='log-btn'>LOG IN</button>



                    <p className='login-footer'>Don't have an account?

                        <Link to={'/signup'} className='signup-link'>Sign up</Link>
                    </p>


                </form>






            </div>





        </div>
    )
}
