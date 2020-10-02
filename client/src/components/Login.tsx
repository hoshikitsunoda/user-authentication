import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react'
import axios from 'axios'

const URL = 'http://localhost:4000'

interface IProps {
  setToken: Dispatch<SetStateAction<string>>
  token: string
  toggleLogin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  setMessage: Dispatch<SetStateAction<string>>
}

interface IState {
  username?: string
  password?: string
}

const Login: React.FC<IProps> = ({
  setToken,
  token,
  toggleLogin,
  setMessage,
}) => {
  const initialState = {
    username: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState<IState>(initialState)
  const [errorMessage, setErrorMessage] = useState('')
  const inputEl = useRef() as MutableRefObject<HTMLInputElement>

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  const viewProfileHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    try {
      const userData = await axios.post(`${URL}/login`, userInfo)
      setToken(userData.data.access_token)
    } catch (error) {
      inputEl.current.value = ''
      setErrorMessage(`${error.response.status}: ${error.response.statusText}`)
    }
  }

  const logoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    setToken('')
    setUserInfo({ ...userInfo, password: '' })
    setErrorMessage('')
    setMessage('Click button to show content')
  }

  return (
    <form>
      {!token && (
        <>
          <div className="mb-4">
            <input
              className="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
              type="text"
              name="username"
              value={userInfo.username}
              autoComplete="username"
              placeholder="username"
              onChange={usernameInputHandler}
            />
          </div>
          <div className="my-4">
            <input
              className="bg-white w-full focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="password"
              onChange={usernameInputHandler}
              ref={inputEl}
            />
          </div>
          <p>{errorMessage}</p>
        </>
      )}
      <div className="flex justify-between">
        <button
          type="submit"
          onClick={token ? logoutHandler : viewProfileHandler}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
        >
          {token ? 'Log Out' : 'Log In'}
        </button>
        {!token ? (
          <button
            onClick={toggleLogin}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default Login
