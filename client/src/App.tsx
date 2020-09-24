import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'

const API_URL = 'http://localhost:5000'

function App() {
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const getPublicMessageHandler = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user`)
      setMessage(data)
    } catch (error) {
      setErrorMessage(`${error.response.status}: ${error.response.statusText}`)
    }
  }

  const getPrivateMessageHandler = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/user/loggedin`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setMessage(data)
    } catch (error) {
      setErrorMessage(`${error.response.status}: ${error.response.statusText}`)
    }
  }

  return (
    <div className="App">
      <Login setToken={setAccessToken} />
      <button onClick={getPublicMessageHandler}>Public Profile</button>
      <button onClick={getPrivateMessageHandler}>Private Profile</button>
      <div>{errorMessage ? errorMessage : message}</div>
    </div>
  )
}

export default App
