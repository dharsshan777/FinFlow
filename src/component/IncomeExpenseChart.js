import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

import './IncomeExpenseChart.css';

export default function IncomeExpenseChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const loggedUser = JSON.parse(
            localStorage.getItem('loggedUser')
        );

        if (!loggedUser?.email) return;

        const storageKey = `transaction_${loggedUser.email}`;

        const transactions = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const monthlyData = months.map((month) => ({
            month,
            income: 0,
            expenses: 0
        }));

        transactions.forEach((item) => {

            const amount = Number(item.amount) || 0;
            const type = item.type?.toLowerCase();

            if (!item.date) return;

            const transactionDate = new Date(item.date);

            if (isNaN(transactionDate.getTime())) return;

            // Only include transactions from 2026
            if (transactionDate.getFullYear() !== 2026) return;

            const monthIndex = transactionDate.getMonth();

            if (type === 'income') {
                monthlyData[monthIndex].income += amount;
            }
            else if (type === 'expense') {
                monthlyData[monthIndex].expenses += amount;
            }

        });

        setChartData(monthlyData);

    }, []);

    return (

        <div className="income-expense-chart">

            <div className="chart-heading">
                <h3>Income vs Expenses</h3>
                
            </div>

            <div className="chart-container">

                <ResponsiveContainer width="100%" height={320}>

                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 10,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `₹${value}`}
                        />

                        <Tooltip
                            formatter={(value) =>
                                `₹${value.toLocaleString('en-IN')}`
                            }
                        />

                        <Legend />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#4274D9"
                            radius={[5, 5, 0, 0]}
                        />

                        <Bar
                            dataKey="expenses"
                            name="Expenses"
                            fill="#91C8E4"
                            radius={[5, 5, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}