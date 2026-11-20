import React from 'react'
import Sidebar from '../component/Sidebar'
import DashboardHeader from '../component/DashboardHeader';
import './Budgetgoals.css';
import Budgetoverview from '../component/Budgetoverview';
import CategoryBudget from '../component/CategoryBudget';
import SavingsGoals from '../component/SavingsGoals';

export default function Budgetgoals() {
  return (
    <div>

      <Sidebar></Sidebar>

      <DashboardHeader></DashboardHeader>

      <div className='budget-content'>

        <Budgetoverview></Budgetoverview>

        <CategoryBudget></CategoryBudget>

        <SavingsGoals></SavingsGoals>




      </div>
      
    </div>
  )
}
