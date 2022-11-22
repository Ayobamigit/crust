import React from 'react'
import Layout from '../../components/layout/Layout'
import withTimeout from '../../hoc/withTimeout'

const ViewUser = () => {
  return (
    <Layout title="Users">ViewUser</Layout>
  )
}

export default withTimeout(ViewUser)