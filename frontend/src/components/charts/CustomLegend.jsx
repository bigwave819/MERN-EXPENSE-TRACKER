import React from 'react'

const CustomLegend = ({ payload }) => {
  return (
    <div className=''>
        {payload.map((entry, index) => (
            <div key={`legend-${index}`} className='flex flex-wrap justify-center  space-x-2'>
                <div
                className='w-2.5 h-2.5 rounded-full'
                style={{ background: entry.color }}
                ></div>
                <span className='text-xs text-gray-700 font-medium'>
                    {entry.value}
                </span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend