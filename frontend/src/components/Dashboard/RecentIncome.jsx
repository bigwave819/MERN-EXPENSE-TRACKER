import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactioInfoCard from '../cards/TransactioInfoCard'
import moment from 'moment'

const RecentIncome = ({ transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight  className='text-base'/>
            </button>
        </div>
        <div>
            { transactions?.slice(0, 5)?.map((item) => (
                <TransactioInfoCard 
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MM YYYY")}
                amount={item.amount}
                type="income"
                hiddenDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome