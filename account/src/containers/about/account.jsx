import React from 'react'
import { Button } from 'microapp-components'

const Account = ({ onClickLink }) => {
  return (
    <div>
      <h1>Account</h1>
      <Button onClick={onClickLink}>go to parent App</Button>
    </div>
  )
}

export default Account
