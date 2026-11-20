import React, { useState, useEffect } from 'react';
import './AddSavingsModal.css';

import { FiX } from 'react-icons/fi';


export default function AddSavingsModal({
    onClose,
    onSave,
    selectedGoal
}) {

    const [formData, setFormData] = useState({
        name: '',
        target: '',
        month: ''
    });


    // Load existing goal details when editing
    useEffect(() => {

        if (selectedGoal) {

            setFormData({
                name: selectedGoal.name,
                target: selectedGoal.target,
                month: selectedGoal.month
            });

        } else {

            setFormData({
                name: '',
                target: '',
                month: ''
            });

        }

    }, [selectedGoal]);


    // Handle Input Changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // Handle Form Submit
    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.target ||
            !formData.month
        ) {
            alert('Please fill all the fields.');
            return;
        }

        if (Number(formData.target) <= 0) {
            alert('Target amount must be greater than zero.');
            return;
        }


        const goalData = {

            id: selectedGoal
                ? selectedGoal.id
                : Date.now(),

            name: formData.name.trim(),

            target: Number(formData.target),

            // Preserve existing saved amount while editing
            saved: selectedGoal
                ? selectedGoal.saved
                : 0,

            month: formData.month

        };


        onSave(goalData);

        onClose();

    };


    return (

        <div className="savings-modal-overlay">

            <div className="savings-modal">

                {/* Modal Header */}
                <div className="savings-modal-header">

                    <h2>
                        {selectedGoal
                            ? 'Edit Savings Goal'
                            : 'Add New Savings Goal'}
                    </h2>

                    <button
                        type="button"
                        className="savings-modal-close"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>


                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Goal Name */}
                    <div className="savings-form-group">

                        <label>Goal Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter goal name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Target Amount */}
                    <div className="savings-form-group">

                        <label>Target Amount (₹)</label>

                        <input
                            type="number"
                            name="target"
                            placeholder="Enter target amount"
                            value={formData.target}
                            onChange={handleChange}
                            min="1"
                        />

                    </div>


                    {/* Target Month */}
                    <div className="savings-form-group">

                        <label>Target Month</label>

                        <input
                            type="month"
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Modal Buttons */}
                    <div className="savings-modal-actions">

                        <button
                            type="button"
                            className="savings-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="savings-save-btn"
                        >
                            {selectedGoal
                                ? 'Update Goal'
                                : 'Save Goal'}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}