import React, { useState } from 'react'
import Moment from 'react-moment'
import {useDispatch, useSelector} from 'react-redux'
import { unsubscribe } from '../../../actions/transaction';

const Subsctription = ({subscription}) => {
    const dispatch = useDispatch();

    const {token, user} = useSelector(state => state.user)
    const {loading} = useSelector(state => state.transaction);

    const [reason, setReason] = useState("")
    const [showTextArea, setShowTextArea] = useState(false)
   
    const handleUsubscribe = (e) => {
        e.preventDefault();

        dispatch(unsubscribe(user._id, token, subscription._id, reason))
    }

    return (
        <li className="list-item">
            <div className="list-item-group">
                <label>Subsctription ID:</label>
                <span>{subscription._id}</span>
            </div>

            <div className="list-item-group">
                <label>Billing Token:</label>
                <span>{subscription.billingToken}</span>
            </div>

            <div className="list-item-group">
                <label>Order ID:</label>
                <span>{subscription.orderID}$</span>
            </div>

            <div className="list-item-group">
                <label>Created At:</label>
                <span>
                    <Moment format="DD/MM/YYYY hh:mm:ss">{subscription.createdAt}</Moment>
                </span>
            </div>

            {
                showTextArea &&
                <div className="modal-container">
                    <form onSubmit={handleUsubscribe}>
                        <textarea 
                            value={reason} 
                            onChange={e => setReason(e.target.value)} 
                            placeholder="Why do you want to unsubscribe?"
                        ></textarea>

                        <div className="button-group">
                            <button 
                                type="submit" 
                                className={loading || reason.length === 0 ? 'disabled' : ''} 
                                disabled={loading|| reason.length === 0}
                            >
                                Submit
                            </button>

                            <button className="secondary-btn" type="button" onClick={() => setShowTextArea(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            }
            
            <button onClick={() => setShowTextArea(true)}>Unsubscribe</button>
        </li>
    )
}

export default Subsctription
