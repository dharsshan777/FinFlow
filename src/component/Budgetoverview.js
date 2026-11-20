import React, { useState, useEffect } from 'react';
import './Budgetoverview.css';


export default function Budgetoverview() {

    const [totalBudget, setTotalBudget] = useState(0);

    const [totalSpent, setTotalSpent] = useState(0);

    const [budgetStatus, setBudgetStatus] = useState('No Budget');

    // Format amount into Indian currency
    const formatAmount = (amount) => {

        return `₹${amount.toLocaleString('en-IN')}`;

    };

    // Load budget and transaction data
    useEffect(() => {

        const loadSummary = () => {

            const loggedUser = JSON.parse(
                localStorage.getItem('loggedUser')
            );

            if (!loggedUser) {
                return;
            }

            const budgetKey = `budget_${loggedUser.email}`;

            const transactionKey = `transaction_${loggedUser.email}`;

            const savedBudgets = JSON.parse(
                localStorage.getItem(budgetKey)
            ) || [];

            const savedTransactions = JSON.parse(
                localStorage.getItem(transactionKey)
            ) || [];

            // Get current month in YYYY-MM format
            const currentDate = new Date();

            const currentMonth =
                `${currentDate.getFullYear()}-${String(
                    currentDate.getMonth() + 1
                ).padStart(2, '0')}`;

            // Get budgets for current month
            const monthlyBudgets = savedBudgets.filter(
                (item) => item.month === currentMonth
            );

            // Calculate total budget
            const budgetAmount = monthlyBudgets.reduce(
                (total, item) => total + Number(item.budget || 0),
                0
            );

            // Calculate current month's total expenses
            const spentAmount = savedTransactions

                .filter((item) => {

                    const transactionMonth = item.date
                        ? item.date.substring(0, 7)
                        : '';

                    return (
                        item.type === 'expense' &&
                        transactionMonth === currentMonth
                    );

                })

                .reduce((total, item) => {

                    return total + Number(item.amount || 0);

                }, 0);

            // Update summary values
            setTotalBudget(budgetAmount);

            setTotalSpent(spentAmount);

            // Calculate budget status
            if (budgetAmount === 0) {

                setBudgetStatus('No Budget');

            } else if (spentAmount > budgetAmount) {

                setBudgetStatus('Over Budget');

            } else {

                setBudgetStatus('On Track');

            }

        };

        loadSummary();

        // Reload when page becomes active
        window.addEventListener('focus', loadSummary);

        // Listen for changes from other browser tabs
        window.addEventListener('storage', loadSummary);

        // Listen for budget changes within the same tab
        window.addEventListener('budgetUpdated', loadSummary);

        return () => {

            window.removeEventListener('focus', loadSummary);

            window.removeEventListener('storage', loadSummary);

            window.removeEventListener('budgetUpdated', loadSummary);

        };

    }, []);

    // Calculate remaining budget
    const remainingBudget = totalBudget - totalSpent;

    // Summary cards
    const budgetCards = [

        {
            title: 'Total Budget',
            amount: formatAmount(totalBudget),
            description: 'Your monthly budget',
           
            className: 'budget-icon'
        },

        {
            title: 'Total Spent',
            amount: formatAmount(totalSpent),
            description: 'Your total spending',
            
            className: 'spent-icon'
        },

        {
            title: 'Remaining Budget',
            amount: formatAmount(remainingBudget),
            description: 'Budget available',
          
            className: 'remaining-icon'
        },

        {
            title: 'Budget Status',
            amount: budgetStatus,
            description:
                budgetStatus === 'On Track'
                    ? 'Your spending is under control'
                    : budgetStatus === 'Over Budget'
                        ? 'You have exceeded your budget'
                        : 'Create a monthly budget to get started',
          
            className: 'status-icon'
        }

    ];

    return (

        <div>

            <div className="budget-summary-container">

                {/* Budget Heading */}

                <div className="budget-heading">

                    <h2>Budget & Goals</h2>


                </div>

                {/* Budget Summary Cards */}

                <div className="budget-overview">

                    {budgetCards.map((card, index) => (

                        <div
                            className="budget-summary-card"
                            key={index}
                        >

                            <div className="budget-card-top">

                                <div className="budget-card-info">

                                    <h4>{card.title}</h4>

                                    <h2>{card.amount}</h2>

                                </div>

                                

                            </div>

                            <p>{card.description}</p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}