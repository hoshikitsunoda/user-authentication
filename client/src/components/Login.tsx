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
}

interface IState {
  username?: string
  password?: string
}

const Login: React.FC<IProps> = ({ setToken, token, toggleLogin }) => {
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
  }

  return (
    <form>
      {!token && (
        <>
          <div>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-4"
              type="text"
              name="username"
              value={userInfo.username}
              autoComplete="username"
              placeholder="username"
              onChange={usernameInputHandler}
            />
          </div>
          <div>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-4"
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
      <button
        type="submit"
        onClick={token ? logoutHandler : viewProfileHandler}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
      >
        {token ? 'Log Out' : 'Log In'}
      </button>
      {!token ? (
        <button
          onClick={toggleLogin}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
        >
          Cancel
        </button>
      ) : null}
    </form>
  )
}

export default Login
