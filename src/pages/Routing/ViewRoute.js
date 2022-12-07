import React from 'react'
import Layout from '../../components/layout/Layout'
import withTimeout from '../../hoc/withTimeout'

const ViewRoute = () => {
  return (
    <Layout title="Routes">ViewRoute</Layout>
  )
}

export default withTimeout(ViewRoute)