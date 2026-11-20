import React, { useState } from 'react';
import './QuickAction.css';
import { GiCash } from "react-icons/gi";
import { MdOutlineSavings } from "react-icons/md";
import { FiTrendingDown } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import QuickActionModel from './QuickActionModel';





export default function QuickAction({ onTransactionsUpdate }) {


    const [selectedAction, setSelectedAction] = useState('');



     

    const actions = [
        {
            title: "Add Income",
            description: "Record your earnings",
            icon: <GiCash />,
            className: "income-action"
        },
        {
            title: "Add Expense",
            description: "Track your spending",
            icon: <FiTrendingDown />,
            className: "expense-action"
        },
        {
            title: "Add Savings",
            description: "Save your money",
            icon: <MdOutlineSavings />,
            className: "Savings-action"
        }
    ];




    return (
        <div>


            <section className='quick-actions-section'>


                <div className='quick-actions-heading'>
                    <div>
                        <h2>Quick Actions</h2>
                        <p>What would you like to do today?</p>
                    </div>
                </div>



                <div className='quick-actions-grid'>
                    {actions.map((action, index) => (
                        <button
                            type='button'
                            className={`quick-action-card ${action.className}`}
                            key={index}
                            onClick={() => setSelectedAction(action.title)}>

                            <div className='quick-action-icon'>
                                {action.icon}
                            </div>

                            <div className='quick-action-info'>
                                <h3>{action.title}</h3>
                                <p>{action.description}</p>
                            </div>

                            <div className='quick-action-arrow'>
                                <FiArrowRight />
                            </div>
                        </button>

                    ))}


<QuickActionModel
    selectedAction={selectedAction}
    onClose={() => setSelectedAction('')}
    onSave={onTransactionsUpdate}
/>
                </div>










            </section>















        </div>
    )
}
