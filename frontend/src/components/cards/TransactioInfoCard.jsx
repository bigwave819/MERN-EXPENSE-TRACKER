import React from 'react'
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from "react-icons/lu"

const TransactioInfoCard = ({
    title,
    icon,
    amount,
    type,
    date,
    hiddenDeleteBtn
}) => {
  return (
    <div className='relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full'>
            { icon ? (
                <img 
                src={icon} 
                alt={title} 
                className='w-6 h-6'
                />
            ) : (
                <LuUtensils/>
            )}
        </div>
        <div>
            <p className=''>{title}</p>
            <p className=''></p>
        </div>
        <div>
            {!hiddenDeleteBtn && (
                <button
                className=''
                onClick={onDelete}
                >
                    <LuTrash2 size={32}/>
                </button>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md`}>
                <h6>
                    { type == "income" ? "+" : "-"} FRW {amount}
                </h6>
                { type ="income" ? <LuTrendingUp/> : <LuTrendingDown/>}
            </div>
        </div>
    </div>
  )
}

export default TransactioInfoCard