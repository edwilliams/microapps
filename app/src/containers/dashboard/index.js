import React from 'react'
import { useHistory } from 'react-router-dom'
import Dashboard from './dashboard'

const DashboardContainer = () => {
  const history = useHistory()
  return <Dashboard onClickLink={() => history.push('/account')} />
}

export default DashboardContainer
