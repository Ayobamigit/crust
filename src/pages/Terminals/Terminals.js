import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const Terminals = () => {
  return (
    <Layout title="Terminals">ViewTerminals</Layout>
  )
}

export default withTimeout(Terminals)