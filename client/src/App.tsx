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

  return (
    <div className="App max-w-3xl mx-auto my-0 flex justify-center flex-col">
      <div className="w-full p-4 flex justify-end">
        {!isShown && (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
            onClick={toggleLoginHandler}
          >
            Log In
          </button>
        )}
        {isShown && (
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
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-2"
            onClick={getPublicMessageHandler}
          >
            Show Public Content
          </button>
          {accessToken && (
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-2"
              onClick={getPrivateMessageHandler}
            >
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
