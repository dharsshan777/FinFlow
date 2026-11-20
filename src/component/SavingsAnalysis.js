import React, { useEffect, useState } from 'react';
import './SavingsAnalysis.css';

import {
    FiTarget,
    FiTrendingUp,
    FiDollarSign,
    FiCheckCircle
} from 'react-icons/fi';

export default function SavingsAnalysis() {

    const loggedUser = JSON.parse(
        localStorage.getItem('loggedUser') || 'null'
    );

    const goalStorageKey = loggedUser?.email
        ? `savingsGoals_${loggedUser.email}`
        : null;

    const transactionStorageKey = loggedUser?.email
        ? `transaction_${loggedUser.email}`
        : null;


    const [goals, setGoals] = useState([]);
    const [transactions, setTransactions] = useState([]);


    // Load Savings Data
    useEffect(() => {

        const loadSavingsData = () => {

            if (!goalStorageKey || !transactionStorageKey) {
                return;
            }

            try {

                const savedGoals = JSON.parse(
                    localStorage.getItem(goalStorageKey) || '[]'
                );

                const savedTransactions = JSON.parse(
                    localStorage.getItem(transactionStorageKey) || '[]'
                );

                setGoals(savedGoals);
                setTransactions(savedTransactions);

            } catch (error) {

                console.error('Error loading savings data:', error);

            }

        };


        loadSavingsData();

        window.addEventListener('focus', loadSavingsData);
        window.addEventListener('storage', loadSavingsData);
        window.addEventListener('transactionUpdated', loadSavingsData);

        return () => {

            window.removeEventListener('focus', loadSavingsData);
            window.removeEventListener('storage', loadSavingsData);
            window.removeEventListener('transactionUpdated', loadSavingsData);

        };

    }, [goalStorageKey, transactionStorageKey]);


    // Calculate Total Savings
    const totalSavings = transactions
        .filter(item => item.type?.toLowerCase() === 'savings')
        .reduce(
            (total, item) => total + Number(item.amount || 0),
            0
        );


    // Calculate Total Target
    const totalTarget = goals.reduce(
        (total, goal) => total + Number(goal.target || 0),
        0
    );


    // Calculate Savings Linked to Goals
    const goalSavings = goals.reduce((total, goal) => {

        const savedAmount = transactions
            .filter(item =>
                item.type?.toLowerCase() === 'savings' &&
                Number(item.goalId) === Number(goal.id)
            )
            .reduce(
                (sum, item) => sum + Number(item.amount || 0),
                0
            );

        return total + savedAmount;

    }, 0);


    // Calculate Remaining Target
    const remainingTarget = Math.max(
        totalTarget - goalSavings,
        0
    );


    // Calculate Overall Progress
    const progress = totalTarget > 0
        ? Math.min((goalSavings / totalTarget) * 100, 100)
        : 0;


    const formatAmount = (amount) => {

        return `₹${amount.toLocaleString('en-IN')}`;

    };


    return (

        <div className="savings-analysis-section">

            {/* Section Header */}
            <div className="savings-analysis-header">

                <div>
                    <h2>Savings Analysis</h2>
                </div>

            </div>


            {/* Savings Summary */}
            <div className="savings-analysis-cards">

                {/* Total Savings */}
                <div className="savings-analysis-card">

                    <span>Total Savings</span>

                    <h3>{formatAmount(totalSavings)}</h3>

                    <p>Amount saved from your transactions</p>

                </div>


                {/* Total Target */}
                <div className="savings-analysis-card">


                    <span>Total Savings Target</span>

                    <h3>{formatAmount(totalTarget)}</h3>

                    <p>Combined target of all your goals</p>

                </div>


                {/* Goal Savings */}
                <div className="savings-analysis-card">

                    <span>Saved Towards Goals</span>

                    <h3>{formatAmount(goalSavings)}</h3>

                    <p>Amount linked to your savings goals</p>

                </div>


                {/* Remaining Target */}
                <div className="savings-analysis-card">

                    <span>Remaining Target</span>

                    <h3>{formatAmount(remainingTarget)}</h3>

                    <p>Amount remaining to reach your goals</p>

                </div>

            </div>


            {/* Overall Progress */}
            <div className="savings-overall-progress">

                <div className="savings-overall-header">

                    <div>
                        <h3>Overall Savings Progress</h3>
                    </div>

                    <h2>{Math.round(progress)}%</h2>

                </div>


                <div className="savings-analysis-progress-bar">

                    <div
                        className="savings-analysis-progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    ></div>

                </div>


                <div className="savings-analysis-progress-details">

                    <span>
                        {formatAmount(goalSavings)} saved
                    </span>

                    <span>
                        {formatAmount(totalTarget)} target
                    </span>

                </div>

            </div>


            {/* Individual Goal Progress */}
            <div className="individual-savings-analysis">

                <h3>Goal-wise Savings Progress</h3>

                {goals.length > 0 ? (

                    <div className="individual-savings-list">

                        {goals.map(goal => {

                            const savedAmount = transactions
                                .filter(item =>
                                    item.type?.toLowerCase() === 'savings' &&
                                    Number(item.goalId) === Number(goal.id)
                                )
                                .reduce(
                                    (total, item) =>
                                        total + Number(item.amount || 0),
                                    0
                                );

                            const target = Number(goal.target) || 0;

                            const goalProgress = target > 0
                                ? Math.min((savedAmount / target) * 100, 100)
                                : 0;

                            return (

                                <div
                                    className="individual-savings-item"
                                    key={goal.id}
                                >

                                    <div className="individual-savings-info">

                                        <div>
                                            <h4>{goal.name}</h4>

                                            <p>
                                                Target: {goal.month}
                                            </p>
                                        </div>

                                        <strong>
                                            {Math.round(goalProgress)}%
                                        </strong>

                                    </div>


                                    <div className="savings-analysis-progress-bar">

                                        <div
                                            className="savings-analysis-progress-fill"
                                            style={{
                                                width: `${goalProgress}%`
                                            }}
                                        ></div>

                                    </div>


                                    <div className="individual-savings-amounts">

                                        <span>
                                            Saved: {formatAmount(savedAmount)}
                                        </span>

                                        <span>
                                            Target: {formatAmount(target)}
                                        </span>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                ) : (

                    <div className="savings-analysis-empty">

                        <FiTarget />

                        <h4>No Savings Goals Found</h4>

                        <p>
                            Add a savings goal in Budget & Goals to track your progress here.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}