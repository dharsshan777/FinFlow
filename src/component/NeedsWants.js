import React, { useEffect, useState } from 'react';
import './NeedsWants.css';

import {
    FiHome,
    FiShoppingBag
} from 'react-icons/fi';

export default function NeedsWants() {

    const [needs, setNeeds] = useState(0);
    const [wants, setWants] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {

        const loggedUser = JSON.parse(
            localStorage.getItem('loggedUser')
        );

        if (!loggedUser?.email) return;

        const storageKey = `transaction_${loggedUser.email}`;

        const transactions = JSON.parse(
            localStorage.getItem(storageKey) || '[]'
        );

        let totalNeeds = 0;
        let totalWants = 0;

        transactions.forEach((item) => {

            const type = item.type?.toLowerCase();
            const expenseType = item.expensetype?.toLowerCase();
            const amount = Number(item.amount) || 0;

            if (type === 'expense') {

                if (expenseType === 'need') {
                    totalNeeds += amount;
                }

                else if (expenseType === 'want') {
                    totalWants += amount;
                }

            }

        });

        setNeeds(totalNeeds);
        setWants(totalWants);
        setTotalExpenses(totalNeeds + totalWants);

    }, []);

    const needsPercentage = totalExpenses > 0
        ? (needs / totalExpenses) * 100
        : 0;

    const wantsPercentage = totalExpenses > 0
        ? (wants / totalExpenses) * 100
        : 0;

    return (

        <div className="needs-wants-section">

            <div className="needs-wants-heading">
                <h3>Needs vs Wants</h3>
            </div>

            <div className="needs-wants-cards">

                {/* Needs Card */}

                <div className="needs-wants-card">

                    <div className="needs-wants-card-header">

                        <div className="needs-wants-icon needs-icon">
                            <FiHome />
                        </div>

                        <span>Essential Spending</span>

                    </div>

                    <h2>
                        ₹{needs.toLocaleString('en-IN')}
                    </h2>

                    <p>Needs</p>

                    <div className="progress-info">
                        <span>Percentage</span>
                        <strong>{needsPercentage.toFixed(1)}%</strong>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill needs-fill"
                            style={{ width: `${needsPercentage}%` }}
                        ></div>
                    </div>

                </div>

                {/* Wants Card */}

                <div className="needs-wants-card">

                    <div className="needs-wants-card-header">

                        <div className="needs-wants-icon wants-icon">
                            <FiShoppingBag />
                        </div>

                        <span>Non-Essential Spending</span>

                    </div>

                    <h2>
                        ₹{wants.toLocaleString('en-IN')}
                    </h2>

                    <p>Wants</p>

                    <div className="progress-info">
                        <span>Percentage</span>
                        <strong>{wantsPercentage.toFixed(1)}%</strong>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill wants-fill"
                            style={{ width: `${wantsPercentage}%` }}
                        ></div>
                    </div>

                </div>

            </div>

        </div>

    );

}