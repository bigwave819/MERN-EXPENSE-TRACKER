import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'

const COLORS = ['#875CF5', '#FA2C37', '#FF6900']

const FinanceOverView = ({
    totalBalance,
    totalIncome,
    totalExpense
}) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance},
        { name: "Total Expense", amount: totalExpense},
        { name: "Total Income", amount: totalIncome}
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial OverView</h5>
        </div>
        <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`${totalBalance}`}
        colors={COLORS}
        showTextAncor
        />
    </div>
  )
}

export default FinanceOverView