import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const Dashboard = () => {
  return (
    <Layout title="Dashboard">Dashboard</Layout>
  )
}

export default withTimeout(Dashboard)