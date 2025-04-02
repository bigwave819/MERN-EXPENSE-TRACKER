import React, { useState,useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomChartBar from "../charts/CustomChartBar"
import { prepareIncomeBarChartData } from '../../utils/helper'


const IncomeOverView = ({ transactions, onAddIncome }) => {
    const [ chartData, setChartData ] = useState([]);
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result)
        return () => {};
    }, [transactions]);
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income OverView</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings over Time and analyse your income trends
                </p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' /> 
                Add Income
            </button>
        </div>
        <div className='mt-10'>
            <CustomChartBar data={chartData} />
        </div>
    </div>
  )
}

export default IncomeOverView