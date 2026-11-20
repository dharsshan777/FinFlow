import React, { useState } from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

export default function DashboardHeader() {

    const navigate=useNavigate();


    const[showMenu,setShowMenu]=useState(false);

    const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || 'null'
);

const userProfile = JSON.parse(
    localStorage.getItem(`userProfile_${loggedUser?.email}`) ||
    localStorage.getItem("userProfile") ||
    'null'
);

const Firstname =
    userProfile?.Firstname ||
    userProfile?.firstname ||
    userProfile?.firstName ||
    "";

        const handleProfile =()=>{
            setShowMenu(false);
            navigate('/profile')
        }

        const handleLogout =()=>{
            localStorage.removeItem('loggedUser');
            navigate("/signin",{replace:true});
        }



const handleProfileClick = () => {
    setShowMenu(!showMenu);
};

    








  return (
    <div>



        <header className='dashboard-header'>

            <div className='dashboard-header-content'>

                        <div className='dashboard-welcome'>
                            <h2>
                                Welcome back{Firstname?`,${Firstname}`:""}!
                            </h2>


                            <p>
                                Manage your money, build better habits.
                            </p>
                        </div>


                        {/* right side profile and logout */}

                        <div className='profile-menu-container'>

                            <button

                            type='button'
                            className='profile-button'
                            aria-expanded={showMenu}
                            onClick={handleProfileClick}
                             >
                              <IoPersonOutline />

                              <span> My Profile</span>

                              <MdKeyboardArrowDown  className={`profile-arrow ${showMenu?"arrow-rotate":""}`}/>
                          </button>


                          {showMenu &&(
                            <div className='profile-dropdown'>

                                <button
                                type='button'
                                className='dropdown-item'
                                onClick={handleProfile}
                                >
                                <IoPersonOutline />

                              <span> My Profile</span>
                                </button>


                                <div className='dropdown-divider'></div>


                                <button
                                type='button'
                                className='logout-item'
                                onClick={handleLogout}>
                                  <TbLogout />
                                  <span>Logout</span>

                                </button>
                                

                                 </div>
                                  )}








                        </div>

                        </div>








          





        </header>
      
    </div>
  )
}
