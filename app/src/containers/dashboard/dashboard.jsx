import React from 'react'
import { Button } from 'microapp-components'

const Dashboard = ({ onClickLink }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={onClickLink}>go to Account</Button>
    </div>
  )
}

export default Dashboard
