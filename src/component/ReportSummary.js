import React, { useEffect, useState } from 'react';
import './ReportSummary.css';



export default function ReportSummary() {

    const [summaryData, setSummaryData] = useState({
        income: 0,
        expenses: 0,
        savings: 0,
        remaining: 0
    });

    useEffect(() => {

        const loggedUser = JSON.parse(
            localStorage.getItem('loggedUser')
        );

        if (!loggedUser || !loggedUser.email) {
            console.log('Logged user not found');
            return;
        }

        const storageKey = `transaction_${loggedUser.email}`;

        const savedTransactions = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );

        console.log('Storage Key:', storageKey);
        console.log('Saved Transactions:', savedTransactions);

        let totalIncome = 0;
        let totalExpenses = 0;
        let totalSavings = 0;

        savedTransactions.forEach((item) => {

            const amount = Number(item.amount) || 0;
            const type = item.type?.toLowerCase();

            if (type === 'income') {
                totalIncome += amount;
            }
            else if (type === 'expense') {
                totalExpenses += amount;
            }
            else if (type === 'savings') {
                totalSavings += amount;
            }

        });

        setSummaryData({
            income: totalIncome,
            expenses: totalExpenses,
            savings: totalSavings,
            remaining: totalIncome - totalExpenses - totalSavings
        });

    }, []);

    const cards = [
        {
            title: 'Total Income',
            amount: summaryData.income,
            
           
            className: 'income'
        },
        {
            title: 'Total Expenses',
            amount: summaryData.expenses,
     
          
            className: 'expenses'
        },
        {
            title: 'Total Savings',
            amount: summaryData.savings,
          
           
            className: 'savings'
        },
        {
            title: 'Remaining Balance',
            amount: summaryData.remaining,
        
           
            className: 'remaining'
        }
    ];

    return (
        <div className="report-summary">

            {cards.map((item, index) => (

                <div className="report-summary-card" key={index}>

                    <div className="summary-card-top">
                        <h5>{item.title}</h5>

                        
                    </div>

                    <h3>
                        ₹{item.amount.toLocaleString('en-IN')}
                    </h3>

                    

                </div>

            ))}

        </div>
    );
}