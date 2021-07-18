import React from 'react'
import Moment from 'react-moment'

const Refund = ({refund}) => {
    return (
        <li className="list-item">
            <div className="list-item-group">
                <label>Refund ID:</label>
                <span>{refund._id}</span>
            </div>

            <div className="list-item-group">
                <label>Capture ID:</label>
                <span>{refund.capture_id}</span>
            </div>

            <div className="list-item-group">
                <label>Received Amount:</label>
                <span>{refund.refund_from_received_amount}$</span>
            </div>

            <div className="list-item-group">
                <label>Transaction Fee:</label>
                <span>{refund.refund_from_transaction_fee}$</span>
            </div>

            <div className="list-item-group">
                <label>Total Refunded Amount:</label>
                <span>{refund.total_refunded_amount}$</span>
            </div>

            <div className="list-item-group">
                <label>Created At:</label>
                <span>
                    <Moment format="DD/MM/YYYY hh:mm:ss">{refund.createdAt}</Moment>
                </span>
            </div>
        </li>
    )
}

export default Refund
