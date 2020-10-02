import React from 'react'

interface IProp {
  token: string
  message: string
  errorMessage: string
}

const Profile: React.FC<IProp> = ({ message, errorMessage }) => {
  return (
    <div className="p-6 m-4 shadow rounded text-center">
      <p>{errorMessage ? errorMessage : message}</p>
    </div>
  )
}

export default Profile
