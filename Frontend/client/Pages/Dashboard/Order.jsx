import React from 'react'
import Layout from '../../Component/Layout'
import Usermenu from '../../Component/Usermenu'

const Order = () => {
  return (
      <Layout>
          <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 ">
            <Usermenu />
          </div>
          <div className="col-md-9 ">
            <h1>Total Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Order
