import React from 'react'
import withTimeout from '../../hoc/withTimeout'
import Layout from '../../components/layout/Layout'

const AddClient = () => {
  return (
    <Layout title="Add Client">AddClient</Layout>
  )
}

export default withTimeout(AddClient)