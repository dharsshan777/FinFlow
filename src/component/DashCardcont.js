import React from 'react';
import './DashCardcont.css';

export default function DashCardcont({ totalIncome, totalExpenses, totalSavings ,totalRemaining }) {
  return (
    <div>


        


            <div className='summary-cards'>


                {/* total income */}

                <div className='summary-card income-card'>

                    <h5>Total Income</h5>
                    <h3>{totalIncome}</h3>
                    <p>Your total income</p>
                </div>


                {/* total Remaining */}
                  <div className='summary-card income-card'>

                    <h5>Total Remaining</h5>
                    <h3>{totalRemaining}</h3>
                    <p>Money available</p>
                </div>



             {/* total Savings */}
                  <div className='summary-card income-card'>

                    <h5>Total Savings</h5>
                    <h3>{totalSavings}</h3>
                    <p>Your saved money</p>
                </div>



                {/* total expenses */}
                  <div className='summary-card income-card'>

                    <h5>Total Expense</h5>
                    <h3>{totalExpenses}</h3>
                    <p>Your total spending</p>
                </div>




            </div>

        </div>






      
    
  )
}
