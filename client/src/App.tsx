import React, { useState } from 'react'
import axios from 'axios'
import Login from './components/Login'

const API_URL: string = 'http://localhost:5000'

const App: React.FC = () => {
  const [message, setMessage] = useState('')
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
    <div className="App max-w-5xl mx-auto my-0 flex justify-center">
      <div className="w-1/4">
        {!isShown && (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
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
          />
        )}
      </div>
      <div className="w-1/4">
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
          onClick={getPublicMessageHandler}
        >
          Public Profile
        </button>
        {accessToken && (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
            onClick={getPrivateMessageHandler}
          >
            Private Profile
          </button>
        )}
        <div>{errorMessage ? errorMessage : message}</div>
      </div>
    </div>
  )
}

export default App
