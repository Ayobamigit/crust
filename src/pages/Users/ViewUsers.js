import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const ViewUsers = () => {
  return (
    <Layout title="Users">ViewUsers</Layout>
  )
}

export default withTimeout(ViewUsers)