import React from 'react'
import './Insight.css';
import { PiLineVerticalThin } from "react-icons/pi";
import { GiWallet } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { GoGraph } from "react-icons/go";
import { FaMobileScreen } from "react-icons/fa6";


export default function Insight() {


  const card=[
    {
    id:1,
    icon:<GiWallet />,
    title:'Track Expense',
    description:'Log your daily expenses and see where your money goes'
  },

  {
    id:2,
    icon:<GoGraph />,
    title:"Set Budgets",
    description:'Create budgets and stay on track with your financial goals'

  },

  {
    id:3,
    icon:<GiReceiveMoney />,
    title:"Need vs Want Assistant",
    description:"Understand what you need and what you want.Spend wisely, not blindly."
  },

  {
    id:4,
    icon:<FaMobileScreen />,
    title:"Access Anywhere",
    description:'Use it on any device anytime and anywhere.'
  }

]






  return (
    <div>

        <div className='d-flex  gap-2 justify-content-center col-12 mt-5'>
            <h3 style={{color:'#66A3BF;'}}>Why Choose </h3>
           <h3 style={{color:'#4274D9'}}>FinFlow</h3>
            <h3 style={{color:'#66A3BF;'}}>?</h3>
        </div>

        <div className='d-flex justify-content-center mt-3'>
            <h5 style={{color:'#4274D9'}}>Simple <PiLineVerticalThin />Smart<PiLineVerticalThin /> Secure</h5>
        </div>


        {/* cards */}

        <div className='container mt-4'>

        <div className='row g-4'>
          {card.map((data) =>(

            <div className='col-12 col-sm-6 col-lg-3 ' key={data.id}>


              <div className='home-card '>

                    <div className='card-icon '>{data.icon}</div>


                    <h5 className='card-title mt-4'>{data.title}</h5>

                    <p className='card-para mt-4'>{data.description}</p>


                </div>






              </div>




          ))}
        </div>
        </div>






      
    </div>
  )
}
