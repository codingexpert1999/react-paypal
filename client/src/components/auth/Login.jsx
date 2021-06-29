import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../actions/user'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {isAuthenticated} = useSelector(state => state.user)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated){
            history.push("/")
        }
    }, [isAuthenticated])

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

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

            <button type="submit">Submit</button>

            <Link to="/register">Don't have an account? Create one!</Link>
        </form>
    )
}

export default Login
