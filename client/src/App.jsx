import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Routes from './components/routes/Routes'
import {ToastContainer} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loadUser } from './actions/user'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <>
      <Navbar/>

      <div className="container">
        <div className="wrapper">
          <Routes/>
        </div>

        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}

export default App;
