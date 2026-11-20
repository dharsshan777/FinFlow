import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import DashboardHeader from '../component/DashboardHeader'
import DashCardcont from '../component/DashCardcont'
import QuickAction from '../component/QuickAction'
import './Dashboard.css'
import MonthlyChart from '../component/MonthlyChart'



export default function Dashboard() {

  const [transactions, setTransactions] = useState([]);

  const handleTransactionsUpdate = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  


  useEffect(() => {

    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    if (loggedUser) {

      const storagekey = `transaction_${loggedUser.email}`;

      const savedTransactions = JSON.parse(
        localStorage.getItem(storagekey)
      ) || [];

      setTransactions(savedTransactions);
    }

  }, []);






const getCurrentMonth= () =>{

  const today= new Date();

  const year=today.getFullYear();

  const month=String(today.getMonth()+1).padStart(2,'0');

  return `${year}-${month}`
}


const[selectedMonth,setSelectedMonth]=useState(getCurrentMonth);


const availableMonths = [
  ...new Set(
    transactions
      .map((item) => item.date?.slice(0, 7))
      .filter(Boolean)
  )
];

const currentMonth = getCurrentMonth();

if (!availableMonths.includes(currentMonth)) {
  availableMonths.push(currentMonth);
}

availableMonths.sort().reverse();


const monthlyTransactions = transactions.filter(
  (item) => item.date?.slice(0, 7) === selectedMonth
);
console.log("Selected Month:", selectedMonth);
console.log("Monthly Transactions:", monthlyTransactions);



 const totalIncome = monthlyTransactions
  .filter((item) => item.type === 'income')
  .reduce((total, item) => total + Number(item.amount || 0), 0);

const totalExpenses = monthlyTransactions
  .filter((item) => item.type === 'expense')
  .reduce((total, item) => total + Number(item.amount || 0), 0);

const totalSavings = monthlyTransactions
  .filter((item) => item.type === 'savings')
  .reduce((total, item) => total + Number(item.amount || 0), 0);

const totalRemaining = totalIncome - totalExpenses - totalSavings;




  return (
    <div>


      <Sidebar> </Sidebar>

      <DashboardHeader></DashboardHeader>


      <div className='dashboard-content'>

        <div className='monthly-filter'>
  <label htmlFor="monthSelect">Select Month:</label>

  <select
    id="monthSelect"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
  >
    {availableMonths.map((month) => (
      <option key={month} value={month}>
        {new Date(`${month}-01T00:00:00`).toLocaleDateString(
          'en-IN',
          { month: 'long', year: 'numeric' }
        )}
      </option>
    ))}
  </select>
</div>



        <DashCardcont
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalRemaining={totalRemaining}
          totalSavings={totalSavings}
        />
        <QuickAction onTransactionsUpdate={handleTransactionsUpdate}></QuickAction>

       <MonthlyChart transactions={transactions} />
      </div>




    </div>
  )
}
