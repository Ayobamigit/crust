import React from 'react'

const TransactionDiv = ({ title, value}) => {
  return (
    <div className='d-flex justify-content-between mt-2'>
        <p>{title}:</p>
        <p>{value}</p>
    </div>
  )
}

export default TransactionDiv