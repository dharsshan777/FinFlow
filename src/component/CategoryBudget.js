import React, { useState, useEffect, useCallback } from 'react';
import './CategoryBudget.css';
import './BudgetAlerts.css';

import AddBudgetModal from './AddBudgetModal';

import {
    FiPlus,
    FiEdit2,
    FiX,
    FiAlertTriangle,
    FiCheckCircle
} from 'react-icons/fi';

import { MdDeleteOutline } from 'react-icons/md';

export default function CategoryBudget() {

    const [showModal, setShowModal] = useState(false);

    const [categoryBudgets, setCategoryBudgets] = useState([]);

    const [transactions, setTransactions] = useState([]);

    const [budgetStorageKey, setBudgetStorageKey] = useState('');

    const [selectedBudget, setSelectedBudget] = useState(null);

    const [alerts, setAlerts] = useState([]);

    const [userEmail, setUserEmail] = useState('');

    // Load budgets and transactions
    useEffect(() => {

        const loadData = () => {

            const loggedUser = JSON.parse(
                localStorage.getItem('loggedUser')
            );

            if (!loggedUser) {
                return;
            }

            const email = loggedUser.email;

            setUserEmail(email);

            const budgetKey = `budget_${email}`;

            const transactionKey = `transaction_${email}`;

            setBudgetStorageKey(budgetKey);

            const savedBudgets = JSON.parse(
                localStorage.getItem(budgetKey)
            ) || [];

            const savedTransactions = JSON.parse(
                localStorage.getItem(transactionKey)
            ) || [];

            setCategoryBudgets(savedBudgets);

            setTransactions(savedTransactions);

        };

        loadData();

        window.addEventListener('focus', loadData);

        window.addEventListener('storage', loadData);

        window.addEventListener('budgetUpdated', loadData);

        window.addEventListener('transactionUpdated', loadData);

        return () => {

            window.removeEventListener('focus', loadData);

            window.removeEventListener('storage', loadData);

            window.removeEventListener('budgetUpdated', loadData);

            window.removeEventListener('transactionUpdated', loadData);

        };

    }, []);

    // Calculate category-wise spending
    const getCategorySpent = useCallback((budgetItem) => {
    return transactions
        .filter((item) => {
            const transactionMonth = item.date
                ? item.date.substring(0, 7)
                : '';

            return (
                item.type === 'expense' &&
                item.category?.toLowerCase() ===
                    budgetItem.category.toLowerCase() &&
                transactionMonth === budgetItem.month
            );
        })
        .reduce((total, item) => {
            return total + Number(item.amount || 0);
        }, 0);
}, [transactions]);

    // Budget Alert Logic
    useEffect(() => {

        if (!userEmail || categoryBudgets.length === 0) {
            return;
        }

        const notificationKey =
            `notificationPreferences_${userEmail}`;

        const preferences = JSON.parse(
            localStorage.getItem(notificationKey) || '{}'
        );

        if (!preferences.budgetAlerts) {
            return;
        }

        categoryBudgets.forEach((item) => {

            const spent = getCategorySpent(item);

            const percentage = item.budget > 0
                ? (spent / item.budget) * 100
                : 0;

            let alertLevel = '';

            let message = '';

            // Budget exceeded
            if (percentage >= 100) {

                alertLevel = 'exceeded';

                message = `You have exceeded your ${item.category} budget by ₹${(spent - item.budget).toLocaleString('en-IN')}.`;

            }

            // 80% budget warning
            else if (percentage >= 80) {

                alertLevel = 'warning';

                message = `You have used ${Math.round(percentage)}% of your ${item.category} budget.`;

            }

            if (!alertLevel) {
                return;
            }

            // Avoid repeated notifications
            const alertKey =
                `budgetAlert_${userEmail}_${item.id}_${item.month}_${item.budget}_${alertLevel}`;

            if (localStorage.getItem(alertKey)) {
                return;
            }

            const newAlert = {

                id: Date.now() + Math.random(),

                title: alertLevel === 'exceeded'
                    ? 'Budget Exceeded!'
                    : 'Budget Warning!',

                message,

                type: alertLevel

            };

            setAlerts((previousAlerts) => [
                ...previousAlerts,
                newAlert
            ]);

            localStorage.setItem(alertKey, 'shown');

        });

   }, [categoryBudgets, transactions, userEmail, getCategorySpent]);

    // Automatically remove notifications
    useEffect(() => {

        if (alerts.length === 0) {
            return;
        }

        const timers = alerts.map((alert) => {

            return setTimeout(() => {

                setAlerts((previousAlerts) =>
                    previousAlerts.filter(
                        (item) => item.id !== alert.id
                    )
                );

            }, 5000);

        });

        return () => {
            timers.forEach(clearTimeout);
        };

    }, [alerts]);

    // Close notification manually
    const handleCloseAlert = (id) => {

        setAlerts((previousAlerts) =>
            previousAlerts.filter((item) => item.id !== id)
        );

    };

    // Open modal for adding a new budget
    const handleAddBudget = () => {

        setSelectedBudget(null);

        setShowModal(true);

    };

    // Open modal for editing an existing budget
    const handleEditBudget = (item) => {

        setSelectedBudget(item);

        setShowModal(true);

    };

    // Close modal
    const handleCloseModal = () => {

        setShowModal(false);

        setSelectedBudget(null);

    };

    // Save new budget or update existing budget
    const handleSaveBudget = (formData) => {

        if (!budgetStorageKey) {

            alert('User information not found');

            return;

        }

        const alreadyExists = categoryBudgets.some(

            (item) =>

                item.id !== selectedBudget?.id &&

                item.category.toLowerCase() ===
                formData.category.toLowerCase() &&

                item.month === formData.month

        );

        if (alreadyExists) {

            alert('Budget already exists for this category and month');

            return;

        }

        let updatedBudgets;

        if (selectedBudget) {

            updatedBudgets = categoryBudgets.map((item) =>

                item.id === selectedBudget.id

                    ? {

                        ...item,

                        category: formData.category,

                        budget: Number(formData.amount),

                        month: formData.month

                    }

                    : item

            );

        } else {

            const newBudget = {

                id: Date.now(),

                category: formData.category,

                budget: Number(formData.amount),

                month: formData.month

            };

            updatedBudgets = [
                ...categoryBudgets,
                newBudget
            ];

        }

        setCategoryBudgets(updatedBudgets);

        localStorage.setItem(
            budgetStorageKey,
            JSON.stringify(updatedBudgets)
        );

        window.dispatchEvent(new Event('budgetUpdated'));

        handleCloseModal();

    };

    // Delete budget
    const handleDeleteBudget = (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this budget?'
        );

        if (!confirmDelete) {
            return;
        }

        const updatedBudgets = categoryBudgets.filter(
            (item) => item.id !== id
        );

        setCategoryBudgets(updatedBudgets);

        localStorage.setItem(
            budgetStorageKey,
            JSON.stringify(updatedBudgets)
        );

        window.dispatchEvent(new Event('budgetUpdated'));

        alert('Budget deleted successfully!');

    };

    return (

        <div className="category-budget-container">

            {/* Budget Notifications */}

            <div className="budget-alert-container">

                {alerts.map((alert) => (

                    <div
                        key={alert.id}
                        className={`budget-alert-toast ${alert.type}`}
                    >

                        <div className="budget-alert-icon">

                            {alert.type === 'exceeded'
                                ? <FiAlertTriangle />
                                : <FiCheckCircle />
                            }

                        </div>

                        <div className="budget-alert-content">

                            <h4>{alert.title}</h4>

                            <p>{alert.message}</p>

                        </div>

                        <button
                            onClick={() => handleCloseAlert(alert.id)}
                        >
                            <FiX />
                        </button>

                    </div>

                ))}

            </div>

            {/* Heading */}

            <div className="category-budget-heading">

                <div>

                    <h3>Monthly Category Budgets</h3>

                  

                </div>

                <button
                    className="add-budget-btn"
                    onClick={handleAddBudget}
                >

                    <FiPlus />

                    Add Budget

                </button>

            </div>

            {/* Category Budget Cards */}

            <div className="category-budget-grid">

                {categoryBudgets.map((item) => {

                    const spent = getCategorySpent(item);

                    const remaining = item.budget - spent;

                    const percentage = item.budget > 0
                        ? (spent / item.budget) * 100
                        : 0;

                    return (

                        <div
                            className="category-budget-card"
                            key={item.id}
                        >

                            {/* Card Header */}

                            <div className="category-card-header">

                                <h4 className="category-name">
                                    {item.category}
                                </h4>

                                <div className="category-card-actions">

                                    <button
                                        className="edit-budget-btn"
                                        onClick={() => handleEditBudget(item)}
                                        title="Edit Budget"
                                    >
                                        <FiEdit2 />
                                    </button>

                                    <button
                                        className="delete-budget-btn"
                                        onClick={() => handleDeleteBudget(item.id)}
                                        title="Delete Budget"
                                    >
                                        <MdDeleteOutline />
                                    </button>

                                </div>

                            </div>

                            {/* Budget Details */}

                            <div className="category-budget-details">

                                <div>

                                    <p>Budget Limit</p>

                                    <h4>
                                        ₹{item.budget.toLocaleString('en-IN')}
                                    </h4>

                                </div>

                                <div>

                                    <p>Amount Spent</p>

                                    <h4>
                                        ₹{spent.toLocaleString('en-IN')}
                                    </h4>

                                </div>

                            </div>

                            {/* Remaining Amount */}

                            <div className="category-budget-remaining">

                                <span>Remaining</span>

                                <strong>
                                    ₹{remaining.toLocaleString('en-IN')}
                                </strong>

                            </div>

                            {/* Progress Bar */}

                            <div className="category-progress-section">

                                <div className="category-progress-bar">

                                    <div
                                        className="category-progress-fill"
                                        style={{
                                            width: `${Math.min(percentage, 100)}%`
                                        }}
                                    ></div>

                                </div>

                                <span>
                                    {Math.round(percentage)}% Used
                                </span>

                            </div>

                           

                        </div>

                    );

                })}

            </div>

            {/* Add / Edit Budget Modal */}

            {showModal && (

                <AddBudgetModal

                    onClose={handleCloseModal}

                    onSave={handleSaveBudget}

                    selectedBudget={selectedBudget}

                />

            )}

        </div>

    );

}