import React from 'react'

interface IProp {
  token: string
  message: string
  errorMessage: string
}

const Profile: React.FC<IProp> = ({ message, errorMessage }) => {
  return <div>{errorMessage ? errorMessage : message}</div>
}

export default Profile
