import React from 'react'

// import Navbar from "../"
import Navbar from "../features/navbar/Navbar"
import AdminOrders from '../features/admin/component/AdminOrders'

function AdminOrderPage() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </div>
  )
}

export default AdminOrderPage