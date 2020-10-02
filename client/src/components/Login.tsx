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

  const logInHandler = async (
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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-25 flex items-center justify-center">
      <form className="p-10 rounded bg-white">
        {!token && (
          <>
            <div className="mb-4">
              <input
                className="input"
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
                className="input"
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="password"
                onChange={usernameInputHandler}
                ref={inputEl}
              />
            </div>
            <p className="mb-4 text-red-500">{errorMessage}</p>
          </>
        )}
        <div className="flex justify-between">
          <button type="submit" onClick={logInHandler} className="btn">
            Log In
          </button>
          <button onClick={toggleLogin} className="btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
