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
}

interface IState {
  username?: string
  password?: string
}

const Login: React.FC<IProps> = ({ setToken }) => {
  const [userInfo, setUserInfo] = useState<IState>({
    username: '',
    password: '',
  })
  const inputEl = useRef() as MutableRefObject<HTMLInputElement>

  const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
  }

  const getMessageHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    axios.post(`${URL}/login`, userInfo).then(({ data }) => {
      setToken(data.access_token)
      inputEl.current.value = ''
    })
  }

  return (
    <form>
      <div>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-4"
          type="text"
          name="username"
          autoComplete="username"
          placeholder="username"
          onChange={usernameInputHandler}
          ref={inputEl}
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
      <button
        type="submit"
        onClick={getMessageHandler}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-4 mt-0"
      >
        Log In
      </button>
    </form>
  )
}

export default Login
