import React from 'react'
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { GiArcheryTarget } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";


export default function Sidebar() {
  return (
    <div>

        <aside className='sidebar'>


          <div className='sidebar-header d-flex align-items-center gap-2'>

       <img  className='img-side-logo'
        src="/images/expensewise-logo.png"
        alt="ExpenseWise Logo"
        width="45"
        height="45"
      />

         <div className="d-flex align-items-center sidebar-brand">
        <span className="fw-bold fs-4 sidebar-brand" style={{ color: '#1C325B' }}>
          Fin
        </span>

        <span className="fw-bold fs-4 sidebar-brand" style={{ color: '#6A669D' }}>
          Flow
        </span>
      </div>
</div>


     {/* main menu */}


     <div className='sidebar-menu'>

      <ul>

      <li>
        <NavLink to={'/dashboard'} className='sidebar-link'>
        <LuLayoutDashboard />
        <span>Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink to={'/transactions'} className='sidebar-link'>
        <GrTransaction />
        <span>Transactions</span>
        </NavLink>
      </li>

         <li>
        <NavLink to={'/budgetgoals'} className='sidebar-link'>
        <GiArcheryTarget />
        <span>Budget & Goals</span>
        </NavLink>
      </li>

         <li>
        <NavLink to={'/reports'} className='sidebar-link'>
       <TbReportSearch />
        <span>Reports</span>
        </NavLink>
      </li>

      </ul>




      {/* settings at bottom */}

      <div className='sidebar-bottom'>

        <NavLink to={'/settings'} className='sidebar-link'>
        <MdOutlineSettings />
        <span>settings</span>
        </NavLink>



      </div>







     </div>










        </aside>
      
    </div>
  )
}

