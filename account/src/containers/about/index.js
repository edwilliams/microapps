import React from 'react'
import { useHistory } from 'react-router-dom'
import Account from './account'

const AccountContainer = () => {
  const history = useHistory()
  return <Account onClickLink={() => history.push('/')} />
}

export default AccountContainer
