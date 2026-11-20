import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import DashboardHeader from '../component/DashboardHeader';
import './Transaction.css';
import QuickActionModel from '../component/QuickActionModel';

import { FiSearch, FiArrowUpRight, FiArrowDownRight, FiRepeat } from 'react-icons/fi';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

export default function Transaction() {

    const [activeFilter, setActiveFilter] = useState('All');


    // transaction retrieving
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    const storageKey = `transaction_${loggedUser.email}`;


    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const savedTransactions = JSON.parse(localStorage.getItem(storageKey)) || [];

        setTransactions(savedTransactions)
        console.log("Saved Transactions:", savedTransactions);
    }, [storageKey]);



    // summary cards
    const totalIncome = transactions
        .filter((item) => item.type === 'income')
        .reduce((total, item) => total + Number(item.amount || 0), 0);

    const totalExpenses = transactions
        .filter((item) => item.type === 'expense')
        .reduce((total, item) => total + Number(item.amount || 0), 0);

    // for need or want 
    const [expenseTypeFilter, setExpenseTypeFilter] = useState('All');


    // searchtext filter
    const [searchtext, setSearchtext] = useState('');

    // category filter

    const [categoryFilter, setCategoryFilter] = useState('All');

    // date filter
    const [dateFilter, setDateFilter] = useState('All');


    const filteredTransactions = transactions.filter((item) => {

        // Search condition
        const matchesSearch =
            (item.description || '').toLowerCase().includes(searchtext.toLowerCase()) ||
            (item.category || '').toLowerCase().includes(searchtext.toLowerCase());

        // Type filter condition
        const matchesType =
            activeFilter === 'All' ||
            item.type.toLowerCase() === activeFilter.toLowerCase().replace('expenses', 'expense');


        const matchesExpenseType =
            expenseTypeFilter === 'All' ||
            (item.type === 'expense' && item.expensetype === expenseTypeFilter);


        const matchesCategory =
            categoryFilter === 'All' ||
            (item.category || '').toLowerCase() === categoryFilter.toLowerCase();


        const transactionDate = new Date(item.Date);

        const currentDate = new Date();

        const matchesDate =
            dateFilter === 'All' ||
            (
                dateFilter === 'this-month' &&
                transactionDate.getMonth() === currentDate.getMonth() &&
                transactionDate.getFullYear() === currentDate.getFullYear()
            ) ||
            (
                dateFilter === 'last-month' &&
                transactionDate.getMonth() === (currentDate.getMonth() - 1 + 12) % 12 &&
                transactionDate.getFullYear() ===
                (currentDate.getMonth() === 0
                    ? currentDate.getFullYear() - 1
                    : currentDate.getFullYear())
            )

        return matchesSearch && matchesType && matchesExpenseType && matchesCategory && matchesDate;

    });


    // Expenses Delete functionality

    // Expenses Delete functionality

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (confirmDelete) {

            const updatedTransaction = transactions.filter(
                (item) => item.id !== id
            );

            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedTransaction)
            );

            setTransactions(updatedTransaction);

            // Notify Savings Goals page
            window.dispatchEvent(new Event('transactionUpdated'));
        }
    };



    // edit click transaction


    const [selectedTransaction, setSelectedTransaction] = useState('null');
    const [selectedAction, setSelectedAction] = useState(null);


    const handleEdit = (item) => {
        setSelectedTransaction(item);

        if (item.type === 'income') {
            setSelectedAction('Add Income');
        }

        else if (item.type === 'expense') {
            setSelectedAction('Add Expense');
        }
        else {
            setSelectedAction('Add Savings');
        }
    };



    return (
        <div className="transaction-page">

            <Sidebar />

            <DashboardHeader />

            <main className="transaction-content">

                {/* Page Header */}

                <div className="transaction-heading">
                    <div>
                        <h2>Transactions</h2>
                       
                    </div>
                </div>


                {/* Summary Cards */}

                <div className="transaction-summary">

                    <div className="transaction-summary-card">


                        <div className='sum-card'>
                            <p>Total Transactions</p>
                            <h3>{transactions.length}</h3>
                        </div>
                    </div>


                    <div className="transaction-summary-card">


                        <div className='sum-card'>
                            <p>Total Income</p>
                            <h3>{totalIncome}</h3>
                        </div>
                    </div>


                    <div className="transaction-summary-card">


                        <div className='sum-card'>
                            <p>Total Expenses</p>
                            <h3>{totalExpenses}</h3>
                        </div>
                    </div>

                </div>


                {/* Search and Filters */}

                <div className="transaction-filter-section">

                    <div className="transaction-search">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchtext}
                            onChange={(e) => setSearchtext(e.target.value)}
                        />
                    </div>


                    <div className="transaction-filter-buttons">

                        {['All', 'Income', 'Expenses', 'Savings'].map((filter) => (

                            <button
                                key={filter}
                                className={activeFilter === filter ? 'active-filter' : ''}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>

                        ))}

                    </div>


                    <div className="transaction-extra-filters">

                        <select value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}>
                            <option value="">All Dates</option>
                            <option value="this-month">This Month</option>
                            <option value="last-month">Last Month</option>
                        </select>



                        <select value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="food">Food</option>
                            <option value="education">Education</option>
                            <option value="salary">Salary</option>
                            <option value="shopping">Shopping</option>
                        </select>


                        <select
                            value={expenseTypeFilter}
                            onChange={(e) => setExpenseTypeFilter(e.target.value)}
                        >
                            <option value="All">All Expense Types</option>
                            <option value="Need">Need</option>
                            <option value="Want">Want</option>
                        </select>


                    </div>

                </div>


                {/* Transaction Table */}

                <div className="transaction-table-container">

                    <div className="transaction-table-heading">
                        <h4>Recent Transactions</h4>
                        <span>{filteredTransactions.length} Transactions</span>
                    </div>


                    <div className="table-responsive">

                        <table className="transaction-table">

                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Expensetype</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>

                                {filteredTransactions.map((item) => (

                                    <tr key={item.id}>

                                        <td>{item.date}</td>

                                        <td className="transaction-description">
                                            {item.description}
                                        </td>

                                        <td>{item.category}</td>

                                        <td>
                                            <span className={`transaction-type ${item.type.toLowerCase()}`}>
                                                {item.type}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`transaction-expensetype ${item.expensetype.toLowerCase()}`}>
                                                {item.expensetype}
                                            </span>
                                        </td>

                                        <td className={`transaction-amount ${item.type.toLowerCase()}`}>
                                            {item.type === 'expense' ? '-' : '+'}
                                            ₹{item.amount.toLocaleString('en-IN')}
                                        </td>

                                        <td>
                                            <div className="transaction-actions">
                                                <button className="edit-btn" title="Edit" onClick={() => handleEdit(item)}>
                                                    <MdEdit />
                                                </button>

                                                <button className="delete-btn" title="Delete" onClick={() => handleDelete(item.id)}>
                                                    <MdDeleteOutline />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                </div>

            </main>



            <QuickActionModel
                selectedAction={selectedAction}
                selectedTransaction={selectedTransaction}
                onClose={() => {
                    setSelectedAction(null);
                    setSelectedTransaction(null);
                }}
                onSave={(updatedTransactions) => {
                    setTransactions(updatedTransactions);
                }}
            />


        </div>
    );
}