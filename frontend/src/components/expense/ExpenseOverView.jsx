import React, { useState, useEffect } from 'react'
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper"
import CustomLineChart from '../charts/CustomLineChart';

const ExpenseOverView = ({ transactions, onExpenseIncome }) => {
    const [ chartData, setChartData ] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
    }, [transactions])
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <h5 className='text-lg'>Expense OverView</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    track your spendings trends over time and gain into where 
                    your money goes.
                </p>
            </div>
            <button
            className='add-btn'
            onClick={onExpenseIncome}
            >
                <LuPlus className='text-lg' />
                Add Expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default ExpenseOverView