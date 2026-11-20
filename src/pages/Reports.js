import React from 'react'
import Sidebar from '../component/Sidebar'
import DashboardHeader from '../component/DashboardHeader';
import './Reports.css'
import ReportsHeader from '../component/ReportsHeader';
import ReportSummary from '../component/ReportSummary';
import IncomeExpenseChart from '../component/IncomeExpenseChart';
import ExpenseBreakdown from '../component/ExpenseBreakdown';
import NeedsWants from '../component/NeedsWants';
import SavingsAnalysis from '../component/SavingsAnalysis';

export default function Reports() {
  return (
    <div>

        <Sidebar></Sidebar>


        <DashboardHeader></DashboardHeader>

        <div className='reports-page'>

            <ReportsHeader></ReportsHeader>

            <ReportSummary></ReportSummary>

            <IncomeExpenseChart></IncomeExpenseChart>

            <ExpenseBreakdown></ExpenseBreakdown>

            <NeedsWants></NeedsWants>

            <SavingsAnalysis></SavingsAnalysis>
        </div>

    
      
    </div>
  )
}
