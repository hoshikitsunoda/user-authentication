import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Profile from './components/Profile'

const API_URL: string = 'http://localhost:5000'

const App: React.FC = () => {
  const [message, setMessage] = useState('Click button to show content')
  const [errorMessage, setErrorMessage] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [isShown, setIsShown] = useState(false)

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

  const toggleLoginHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setIsShown((prevState) => !prevState)
  }

  const logOutHandler = () => {
    setAccessToken('')
    setIsShown((prevState) => !prevState)
    setMessage('Click button to show content')
  }

  return (
    <div className="App max-w-3xl mx-auto my-0 flex justify-center flex-col items-center">
      <div className="w-full p-4 flex justify-end">
        <button
          className="btn mx-2"
          onClick={accessToken ? logOutHandler : toggleLoginHandler}
        >
          {accessToken ? 'Log Out' : 'Log In'}
        </button>
        {isShown && !accessToken && (
          <Login
            setToken={setAccessToken}
            token={accessToken}
            toggleLogin={toggleLoginHandler}
            setMessage={setMessage}
          />
        )}
      </div>
      <div className="w-full px-8 py-4 flex flex-col justify-between items-center mx-4">
        <div>
          <button className="btn mx-2" onClick={getPublicMessageHandler}>
            Show Public Content
          </button>
          {accessToken && (
            <button className="btn mx-2" onClick={getPrivateMessageHandler}>
              Show Private Content
            </button>
          )}
        </div>
        <Profile
          token={accessToken}
          message={message}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  )
}

export default App
