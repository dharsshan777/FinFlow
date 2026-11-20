import React, { useState, useEffect } from 'react';
import './AddBudgetModal.css';

import { MdClose } from 'react-icons/md';

export default function AddBudgetModal({
    onClose,
    onSave,
    selectedBudget
}) {

    const [formData, setFormData] = useState({

        category: '',
        amount: '',
        month: ''

    });

    // Load existing budget details when editing
    useEffect(() => {

        if (selectedBudget) {

            setFormData({

                category: selectedBudget.category,

                amount: selectedBudget.budget,

                month: selectedBudget.month

            });

        } else {

            setFormData({

                category: '',
                amount: '',
                month: ''

            });

        }

    }, [selectedBudget]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.category || !formData.amount || !formData.month) {

            alert('Please fill all the fields');

            return;

        }

        if (Number(formData.amount) <= 0) {

            alert('Please enter a valid budget amount');

            return;

        }

        onSave(formData);

    };

    return (

        <div
            className="budget-modal-overlay"
            onClick={onClose}
        >

            <div
                className="budget-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="budget-modal-header">

                    <div>

                        <h3>
                            {selectedBudget ? 'Edit Budget' : 'Add New Budget'}
                        </h3>

                        <p>
                            Set a monthly spending limit for a category.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="budget-modal-close"
                        onClick={onClose}
                    >
                        <MdClose />
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="budget-form-group">

                        <label>Category</label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >

                            <option value="">Select Category</option>

                            <option value="Food">Food</option>

                            <option value="Travel">Travel</option>

                            <option value="Shopping">Shopping</option>

                            <option value="Education">Education</option>

                            <option value="Entertainment">Entertainment</option>

                            <option value="Healthcare">Healthcare</option>

                            <option value="Others">Others</option>

                        </select>

                    </div>

                    <div className="budget-form-group">

                        <label>Monthly Budget Amount (₹)</label>

                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter budget amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="1"
                        />

                    </div>

                    <div className="budget-form-group">

                        <label>Month</label>

                        <input
                            type="month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="budget-modal-actions">

                        <button
                            type="button"
                            className="budget-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="budget-save-btn"
                        >

                            {selectedBudget ? 'Update Budget' : 'Save Budget'}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}