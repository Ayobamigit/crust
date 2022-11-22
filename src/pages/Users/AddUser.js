import React from 'react'
import Layout from '../../components/layout/Layout'
import withTimeout from '../../hoc/withTimeout'

const AddUser = () => {
  return (
    <Layout title="Add Users">AddUser</Layout>
  )
}

export default withTimeout(AddUser)