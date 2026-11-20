import React, { useState } from 'react';
import './ReportsHeader.css';

export default function ReportsHeader() {

    const [selectedMonth, setSelectedMonth] = useState('November');
    const [selectedYear, setSelectedYear] = useState('2026');

    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    const years = ['2024', '2025', '2026'];

    return (
        <div className="reports-header">

            <div className="reports-heading">
                <h2>Financial Reports</h2>
            
            </div>

            <div className="reports-filters">

                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

            </div>

        </div>
    );
}