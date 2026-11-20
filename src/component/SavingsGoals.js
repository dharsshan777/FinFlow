import React, { useEffect, useState } from 'react';
import './SavingsGoals.css';

import {
    FiPlus,
    FiEdit2,
    FiTrendingUp,
    FiTarget
} from 'react-icons/fi';

import { MdDeleteOutline } from 'react-icons/md';

import AddSavingsModal from './AddSavingsModal';

export default function SavingsGoals() {

    // Logged-in User
    const loggedUser = JSON.parse(
        localStorage.getItem('loggedUser') || 'null'
    );

    // Storage Keys
    const goalStorageKey = loggedUser?.email
        ? `savingsGoals_${loggedUser.email}`
        : null;

    const transactionStorageKey = loggedUser?.email
        ? `transaction_${loggedUser.email}`
        : null;

    const notificationStorageKey = loggedUser?.email
        ? `notificationPreferences_${loggedUser.email}`
        : null;


    // Load Goals
    const [goals, setGoals] = useState(() => {

        try {
            return goalStorageKey
                ? JSON.parse(localStorage.getItem(goalStorageKey) || '[]')
                : [];
        } catch {
            return [];
        }
    });


    // Load Transactions
    const [transactions, setTransactions] = useState(() => {

        try {
            return transactionStorageKey
                ? JSON.parse(localStorage.getItem(transactionStorageKey) || '[]')
                : [];
        } catch {
            return [];
        }
    });


    const [showModal, setShowModal] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState(null);


    // Reload Goals and Transactions
    useEffect(() => {

        const loadData = () => {

            try {

                if (goalStorageKey) {
                    setGoals(
                        JSON.parse(
                            localStorage.getItem(goalStorageKey) || '[]'
                        )
                    );
                }

                if (transactionStorageKey) {
                    setTransactions(
                        JSON.parse(
                            localStorage.getItem(transactionStorageKey) || '[]'
                        )
                    );
                }

            } catch (error) {
                console.error('Unable to load savings data:', error);
            }
        };

        window.addEventListener('focus', loadData);
        window.addEventListener('storage', loadData);
        window.addEventListener('transactionUpdated', loadData);

        return () => {
            window.removeEventListener('focus', loadData);
            window.removeEventListener('storage', loadData);
            window.removeEventListener('transactionUpdated', loadData);
        };

    }, [goalStorageKey, transactionStorageKey]);


    // Actual Savings Reminder
    useEffect(() => {

        if (!loggedUser?.email || !notificationStorageKey) {
            return;
        }

        const preferences = JSON.parse(
            localStorage.getItem(notificationStorageKey) || '{}'
        );

        if (!preferences.savingsReminders) {
            return;
        }

        if (
            !('Notification' in window) ||
            Notification.permission !== 'granted'
        ) {
            return;
        }

        const currentMonth = new Date().toISOString().slice(0, 7);

        goals.forEach((goal) => {

            if (!goal.month || goal.month > currentMonth) {
                return;
            }

            const savedAmount = transactions
                .filter((item) =>
                    item.type === 'savings' &&
                    Number(item.goalId) === Number(goal.id)
                )
                .reduce(
                    (total, item) =>
                        total + Number(item.amount || 0),
                    0
                );

            const targetAmount = Number(goal.target);

            if (savedAmount >= targetAmount) {
                return;
            }

            const reminderKey =
                `savingsReminder_${loggedUser.email}_${goal.id}_${goal.month}`;

            if (localStorage.getItem(reminderKey)) {
                return;
            }

            const remainingAmount = targetAmount - savedAmount;

            const notification = new Notification(
                'Savings Reminder 💰',
                {
                    body:
                        `Your ${goal.name} goal is incomplete. ` +
                        `You still need ₹${remainingAmount.toLocaleString('en-IN')} to reach your target.`,
                    icon: '/images/expensewise-logo.png'
                }
            );

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            localStorage.setItem(reminderKey, 'sent');

        });

    }, [
        goals,
        transactions,
        loggedUser?.email,
        notificationStorageKey
    ]);


    // Add Goal
    const handleAddGoal = () => {
        setSelectedGoal(null);
        setShowModal(true);
    };


    // Edit Goal
    const handleEditGoal = (goal) => {
        setSelectedGoal(goal);
        setShowModal(true);
    };


    // Save Goal
    const handleSaveGoal = (goalData) => {

        let updatedGoals;

        if (selectedGoal) {

            updatedGoals = goals.map((goal) =>
                goal.id === selectedGoal.id
                    ? goalData
                    : goal
            );

        } else {

            updatedGoals = [...goals, goalData];

        }

        setGoals(updatedGoals);

        if (goalStorageKey) {
            localStorage.setItem(
                goalStorageKey,
                JSON.stringify(updatedGoals)
            );
        }

        setSelectedGoal(null);
    };


    // Delete Goal
    const handleDeleteGoal = (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this savings goal?'
        );

        if (!confirmDelete) {
            return;
        }

        const updatedGoals = goals.filter(
            (goal) => goal.id !== id
        );

        setGoals(updatedGoals);

        if (goalStorageKey) {
            localStorage.setItem(
                goalStorageKey,
                JSON.stringify(updatedGoals)
            );
        }
    };


    return (

        <div className="savings-goals-section">

            {/* Header */}
            <div className="savings-goals-header">

                <div>
                    <h2>Savings Goals</h2>
                </div>

                <button
                    className="add-savings-goal-btn"
                    onClick={handleAddGoal}
                >
                    <FiPlus />
                    Add Goal
                </button>

            </div>


            {/* Savings Goal Cards */}
            <div className="savings-goals-grid">

                {goals.length > 0 ? (

                    goals.map((goal) => {

                        const savedAmount = transactions
                            .filter((item) =>
                                item.type === 'savings' &&
                                Number(item.goalId) === Number(goal.id)
                            )
                            .reduce(
                                (total, item) =>
                                    total + Number(item.amount || 0),
                                0
                            );

                        const progress = goal.target > 0
                            ? Math.min(
                                (savedAmount / goal.target) * 100,
                                100
                            )
                            : 0;

                        const remaining = Math.max(
                            goal.target - savedAmount,
                            0
                        );

                        return (

                            <div
                                className="savings-goal-card"
                                key={goal.id}
                            >

                                {/* Card Header */}
                                <div className="savings-goal-card-header">

                                    <h3>{goal.name}</h3>

                                    <div className="savings-goal-actions">

                                        <button
                                            type="button"
                                            title="Edit Goal"
                                            onClick={() => handleEditGoal(goal)}
                                        >
                                            <FiEdit2 />
                                        </button>

                                        <button
                                            type="button"
                                            title="Delete Goal"
                                            onClick={() => handleDeleteGoal(goal.id)}
                                        >
                                            <MdDeleteOutline />
                                        </button>

                                    </div>

                                </div>


                               


                                {/* Amount Details */}
                                <div className="savings-goal-amounts">

                                    <div>
                                        <span>Saved Amount</span>

                                        <h4>
                                            ₹{savedAmount.toLocaleString('en-IN')}
                                        </h4>
                                    </div>

                                    <div>
                                        <span>Target Amount</span>

                                        <h4>
                                            ₹{Number(goal.target).toLocaleString('en-IN')}
                                        </h4>
                                    </div>

                                </div>


                                {/* Progress Information */}
                                <div className="savings-progress-info">

                                    

                                    <span>{Math.round(progress)}%</span>

                                </div>


                                {/* Progress Bar */}
                                <div className="savings-progress-bar">

                                    <div
                                        className="savings-progress-fill"
                                        style={{
                                            width: `${progress}%`
                                        }}
                                    ></div>

                                </div>


                                {/* Remaining Amount */}
                                <p className="savings-goal-remaining">

                                    

                                    ₹{remaining.toLocaleString('en-IN')} remaining

                                </p>

                            </div>

                        );

                    })

                ) : (

                    <div className="no-savings-goals">

                        <FiTarget />

                        <h3>No Savings Goals Yet</h3>

                        <p>
                            Start building your savings by adding your first goal.
                        </p>

                    </div>

                )}

            </div>


            {/* Add / Edit Modal */}
            {showModal && (

                <AddSavingsModal
                    onClose={() => {
                        setShowModal(false);
                        setSelectedGoal(null);
                    }}
                    onSave={handleSaveGoal}
                    selectedGoal={selectedGoal}
                />

            )}

        </div>

    );

}