import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
      <>
          <div className="text-center">
      <h4>User Panel</h4>
      <div className="list-group">
        
        <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
        <NavLink to="/dashboard/user/order" className="list-group-item list-group-item-action">orders</NavLink>
       

      </div>
      </div>
      </>
  )
}

export default Usermenu