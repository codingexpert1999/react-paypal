import React from 'react'

const TransactionItem = ({item, index}) => {
    return (
        <React.Fragment>
            <h4>Item {index + 1}</h4>
    
            <ul>
                <li>
                    <label>Name:</label>
                    <span>{item.name}</span>
                </li>

                <li>
                    <label>Quantity:</label>
                    <span>{item.quantity}</span>
                </li>

                <li>
                    <label>Unit Amount:</label>
                    <span>{item.unit_amount}$</span>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default TransactionItem
