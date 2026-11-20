import React, { useEffect, useState } from 'react';
import './QuickActionModel.css';
import { FiX } from "react-icons/fi";

export default function QuickActionModel({
  selectedAction,
  selectedTransaction,
  onClose,
  onSave
}) {

  // Get logged-in user
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser") || "null"
  );

  // Savings goals storage key
  const savingsStorageKey = loggedUser?.email
    ? `savingsGoals_${loggedUser.email}`
    : null;

  // Load user's savings goals
  const [savingsGoals] = useState(() => {

    if (!savingsStorageKey) {
      return [];
    }

    try {
      return JSON.parse(
        localStorage.getItem(savingsStorageKey)
      ) || [];
    } catch {
      return [];
    }

  });


  // Form State
  const [formdata, setFormdata] = useState({
    amount: "",
    source: "",
    category: "",
    purpose: "",
    expensetype: "",
    date: "",
    description: "",
    goalId: ""
  });


  // Load Existing Transaction When Editing
  useEffect(() => {

    if (selectedTransaction) {

      setFormdata({
        amount: selectedTransaction.amount || "",
        source: selectedTransaction.source || "",
        category: selectedTransaction.category || "",
        purpose: selectedTransaction.purpose || "",
        expensetype: selectedTransaction.expensetype || "",
        date: selectedTransaction.date || "",
        description: selectedTransaction.description || "",
        goalId: selectedTransaction.goalId || ""
      });

    } else {

      setFormdata({
        amount: "",
        source: "",
        category: "",
        purpose: "",
        expensetype: "",
        date: "",
        description: "",
        goalId: ""
      });

    }

  }, [selectedAction, selectedTransaction]);


  // Handle Input Changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormdata({
      ...formdata,
      [name]: value
    });

  };


  // Handle Form Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser") || "null"
    );

    if (!loggedUser) {
      alert("Please login first");
      return;
    }

    // Validate savings goal selection
    if (
      selectedAction === "Add Savings" &&
      !formdata.goalId
    ) {
      alert("Please select a savings goal.");
      return;
    }

    const storagekey = `transaction_${loggedUser.email}`;

    const oldTransactions =
      JSON.parse(localStorage.getItem(storagekey)) || [];


    // Transaction Data
    const transactionData = {

      id: selectedTransaction
        ? selectedTransaction.id
        : Date.now(),

      type: selectedAction === "Add Income"
        ? "income"
        : selectedAction === "Add Expense"
          ? "expense"
          : "savings",

      amount: Number(formdata.amount),

      source: formdata.source,

      category: formdata.category,

      purpose: formdata.purpose,

      expensetype: formdata.expensetype,

      date: formdata.date,

      description: formdata.description,

      // Associate savings transaction with selected goal
      goalId: selectedAction === "Add Savings"
        ? Number(formdata.goalId)
        : null

    };


    let updatedTransactions;

    if (selectedTransaction) {

      // Update Existing Transaction
      updatedTransactions = oldTransactions.map((item) =>
        item.id === selectedTransaction.id
          ? transactionData
          : item
      );

    } else {

      // Add New Transaction
      updatedTransactions = [
        ...oldTransactions,
        transactionData
      ];

    }


    // Save Transactions
    localStorage.setItem(
      storagekey,
      JSON.stringify(updatedTransactions)
    );
    // Notify Savings Goals page
    window.dispatchEvent(new Event('transactionUpdated'));

    onSave(updatedTransactions);

    onClose();

  };


  if (!selectedAction) {
    return null;
  }


  return (

    <div>

      <div className='model-overlay'>

        <div className='quick-model'>

          {/* Modal Header */}
          <div className='model-header'>

            <h3>
              {selectedTransaction
                ? `Edit ${selectedAction.replace("Add ", "")}`
                : selectedAction}
            </h3>

            <button
              type='button'
              onClick={onClose}
            >
              <FiX />
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Amount */}
            <label>Amount</label>

            <input
              type='number'
              name='amount'
              value={formdata.amount}
              onChange={handleChange}
              placeholder='Enter an amount'
              min='1'
              required
            />


            {/* Income Field */}
            {selectedAction === 'Add Income' && (
              <>

                <label>Income Sources</label>

                <input
                  type='text'
                  name='source'
                  value={formdata.source}
                  onChange={handleChange}
                  placeholder='Enter income source'
                  required
                />

              </>
            )}


            {/* Expense Field */}
            {selectedAction === 'Add Expense' && (
              <>

                <label>Expense Purpose</label>

                <input
                  type='text'
                  name='purpose'
                  value={formdata.purpose}
                  onChange={handleChange}
                  placeholder='Enter expense purpose'
                  required
                />


                <label>Category</label>

                <select
                  name='category'
                  value={formdata.category}
                  onChange={handleChange}
                  required
                >

                  <option value=''>
                    Select a category
                  </option>

                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Others">Others</option>

                </select>


                {/* Need or Want */}
                <label>Expense Type</label>

                <div className='expense-type-option'>

                  <label>

                    <input
                      type='radio'
                      name='expensetype'
                      value="Need"
                      checked={formdata.expensetype === 'Need'}
                      onChange={handleChange}
                      required
                    />

                    Need

                  </label>


                  <label>

                    <input
                      type='radio'
                      name='expensetype'
                      value="Want"
                      checked={formdata.expensetype === 'Want'}
                      onChange={handleChange}
                      required
                    />

                    Want

                  </label>

                </div>

              </>
            )}


            {/* Savings Field */}
            {selectedAction === 'Add Savings' && (
              <>

                <label>Savings Purpose</label>

                <input
                  type='text'
                  name="purpose"
                  value={formdata.purpose}
                  onChange={handleChange}
                  placeholder="Enter savings purpose"
                  required
                />


                {/* Select Savings Goal */}
                <label>Select Savings Goal</label>

                <select
                  name="goalId"
                  value={formdata.goalId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a savings goal
                  </option>

                  {savingsGoals.map((goal) => (

                    <option
                      key={goal.id}
                      value={goal.id}
                    >
                      {goal.name}
                    </option>

                  ))}

                </select>


                {savingsGoals.length === 0 && (

                  <p className="no-savings-goal-message">
                    No savings goals available.
                    Please create a goal in Budget & Goals first.
                  </p>

                )}

              </>
            )}


            {/* Date */}
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formdata.date}
              onChange={handleChange}
              required
            />


            {/* Description */}
            <label>Description</label>

            <textarea
              name="description"
              value={formdata.description}
              onChange={handleChange}
              placeholder="Enter description"
            />


            {/* Modal Buttons */}
            <div className='modal-buttons'>

              <button
                type='button'
                onClick={onClose}
              >
                Close
              </button>

              <button type="submit">
                Save
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}