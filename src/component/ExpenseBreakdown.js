import React, { useEffect, useState } from 'react';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

import './ExpenseBreakdown.css';

export default function ExpenseBreakdown() {

    const [categoryData, setCategoryData] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const COLORS = [
        '#4274D9',
        '#91C8E4',
        '#28A66A',
        '#F4B942',
        '#E87979',
        '#9875D5',
        '#55B9B0'
    ];

    useEffect(() => {

        const loggedUser = JSON.parse(
            localStorage.getItem('loggedUser')
        );

        if (!loggedUser?.email) return;

        const storageKey = `transaction_${loggedUser.email}`;

        const transactions = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );

        const categoryTotals = {};

        let total = 0;

        transactions.forEach((item) => {

            const type = item.type?.toLowerCase();

            if (type === 'expense') {

                const amount = Number(item.amount) || 0;

                const category = item.category || 'Others';

                categoryTotals[category] =
                    (categoryTotals[category] || 0) + amount;

                total += amount;
            }

        });

        const formattedData = Object.keys(categoryTotals).map(
            (category) => ({
                name: category,
                value: categoryTotals[category]
            })
        );

        setCategoryData(formattedData);
        setTotalExpenses(total);

    }, []);

    return (

        <div className="expense-breakdown">

            <div className="breakdown-heading">
                <h3>Expense Category Breakdown</h3>
                
            </div>

            {categoryData.length > 0 ? (

                <div className="breakdown-content">

                    {/* Doughnut Chart */}

                    <div className="breakdown-chart">

                        <ResponsiveContainer width="100%" height={280}>

                            <PieChart>

                                <Pie
                                    data={categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={105}
                                    paddingAngle={4}
                                >

                                    {categoryData.map((entry, index) => (

                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip
                                    formatter={(value) =>
                                        `₹${value.toLocaleString('en-IN')}`
                                    }
                                />

                            </PieChart>

                        </ResponsiveContainer>

                        <div className="donut-total">
                            <span>Total Expenses</span>
                            <h3>₹{totalExpenses.toLocaleString('en-IN')}</h3>
                        </div>

                    </div>

                    {/* Category Details */}

                    <div className="category-details">

                        {categoryData.map((item, index) => (

                            <div className="category-item" key={item.name}>

                                <div className="category-name">

                                    <span
                                        className="category-dot"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length]
                                        }}
                                    ></span>

                                    <span>{item.name}</span>

                                </div>

                                <strong>
                                    ₹{item.value.toLocaleString('en-IN')}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>

            ) : (

                <div className="no-expenses">
                    <p>No expense transactions available.</p>
                </div>

            )}

        </div>

    );
}