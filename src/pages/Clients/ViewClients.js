import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const ViewClients = () => {
  return (
    <Layout title="Clients">ViewClients</Layout>
  )
}

export default withTimeout(ViewClients)