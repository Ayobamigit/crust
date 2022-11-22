import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const ViewClient = () => {
  return (
    <Layout title="Clients">ViewClient</Layout>
  )
}

export default withTimeout(ViewClient)