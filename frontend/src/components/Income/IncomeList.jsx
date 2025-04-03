import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactioInfoCard from '../cards/TransactioInfoCard'
import moment from 'moment'

const IncomeList = ({
    transactions,
    onDelete,
    onDownload
}) => {
  return (
    <div className='card flex flex-col h-full'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'></h5>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base'/> Download
            </button>
        </div>

        {/* Enable scrolling for income transactions */}
        <div className='grid grid-cols-1 md:grid-cols-2 max-h-[500px] overflow-y-auto'>
            { transactions?.map((income) => (
                <TransactioInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("Do MM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList
