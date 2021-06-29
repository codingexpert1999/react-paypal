import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../../actions/user'

const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {isAuthenticated} = useSelector(state => state.user)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(register(firstName, lastName, email, password))
    }

    useEffect(() => {
        if(isAuthenticated){
            history.push("/")
        }
    }, [isAuthenticated])

    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <div className="input-group">
                <label>First Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your first name..."
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Last Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your last name..." 
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Email</label>
                <input 
                    type="email" 
                    placeholder="Enter your email..." 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password..." 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    placeholder="Confirm your password..." 
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>

            <button type="submit">Submit</button>

            <Link to="/register">Already have an account? Then login!</Link>
        </form>
    )
}

export default Register
