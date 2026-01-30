import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebaar() {
  const location = useLocation()

  const sidebarItems = {
    admin: [
      {
        key: 'add-employee',
        path: '/employee/add',
        title: 'Add Employee'
      },
      {
        key: 'employee-management',
        path: '/employee/list',
        title: 'Employee Management'
      }
    ],
    employee: [
      {
        key: 'employee-profile',
        path: '/employee/profile',
        title: 'Employee Profile'
      },
      {
        key: 'employee-management',
        path: '/employee/list',
        title: 'Employee Management'
      }
    ]
  }

  const selectedNav = sidebarItems.admin

  return (
    <div className="h-full bg-neutral-900 text-white flex flex-col">

      <div className="h-[60px] flex items-center px-4 text-xl font-semibold border-b border-neutral-700">
        Logo
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {selectedNav.map(item => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`block px-4 py-2 rounded-md ${
                active
                  ? 'bg-neutral-700'
                  : 'hover:bg-neutral-800'
              }`}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>

    </div>
  )
}

export default Sidebaar
