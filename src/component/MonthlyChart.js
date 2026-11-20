import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './MonthlyChart.css'

export default function MonthlyChart({ transactions = [] }) {

    console.log("Chart Transactions:", transactions);

    const monthlyData = {};

  

    transactions.forEach((item) => {

        // Check whether transaction has a valid date
        if (!item.date) return;

        const month = item.date.slice(0, 7);

        // Create a new month if it doesn't exist
        if (!monthlyData[month]) {
            monthlyData[month] = {
                income: 0,
                expense: 0
            };
        }

        // Calculate monthly income
        if (item.type === 'income') {
            monthlyData[month].income += Number(item.amount || 0);
        }

        // Calculate monthly expenses
        if (item.type === 'expense') {
            monthlyData[month].expense += Number(item.amount || 0);
        }

    });

    // Get all available months
    const months = Object.keys(monthlyData).sort();

    // Chart data
    const data = {
        labels: months.map((month) =>
            new Date(`${month}-01T00:00:00`).toLocaleDateString(
                'en-IN',
                { month: 'short', year: 'numeric' }
            )
        ),

        datasets: [
            {
                label: 'Income',
                data: months.map((month) => monthlyData[month].income),
                backgroundColor: '#90CAF9'
            },
            {
                label: 'Expenses',
                data: months.map((month) => monthlyData[month].expense),
                backgroundColor: '#E3F2FD'
            }
        ]
    };


    return (
        <div className="monthly-chart">
            <h3>Monthly Income vs Expenses</h3>

            {months.length > 0 ? (
                <Bar data={data} />
            ) : (
                <p>No transaction data available.</p>
            )}
        </div>
    );
}