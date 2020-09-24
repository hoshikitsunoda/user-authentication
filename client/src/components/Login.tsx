import React, { useState } from 'react'
import axios from 'axios'

const URL = 'http://localhost:4000'

interface IState {
  username?: string
  password?: string
}

const Login = ({ setToken }: any) => {
  const [userInfo, setUserInfo] = useState<IState>({
    username: '',
    password: '',
  })

  const usernameInputHandler = (event: any) => {
    event.preventDefault()
    setUserInfo({ ...userInfo, username: event.target.value })
  }

  const passwordInputHandler = (event: any) => {
    event.preventDefault()
    setUserInfo({ ...userInfo, password: event.target.value })
  }

  const getPublicMessageHandler = (event: any) => {
    event.preventDefault()
    axios
      .post(`${URL}/login`, userInfo)
      .then(({ data }) => setToken(data.access_token))
  }

  console.log(userInfo)

  return (
    <div>
      <div>
        <label htmlFor="username">username:</label>
        <input type="text" onChange={usernameInputHandler} />
      </div>
      <div>
        <label htmlFor="current-password">password:</label>
        <input type="password" onChange={passwordInputHandler} />
      </div>
      <button type="submit" onClick={getPublicMessageHandler}>
        Submit
      </button>
    </div>
  )
}

export default Login
