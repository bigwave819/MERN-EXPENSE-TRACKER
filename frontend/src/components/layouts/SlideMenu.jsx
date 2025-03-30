import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { userContext } from "../../context/UserContext"
import { SIDE_MENU_DATA } from "../../utils/data"

const SlideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return; // Important to return here to prevent navigation
    }
    navigate(route);
  } 

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  }

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img 
            src={user.profileImageUrl}
            alt="profile" 
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          />
        ) : (
          <div className='w-20 h-20 bg-slate-400 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
            {user?.fullname?.charAt(0) || 'U'}
          </div>
        )}
        <h5 className='text-gray-950 font-medium leading-6 mt-2'>
          {user?.fullname || 'User'}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-4 text-[15px] 
            ${activeMenu === item.label ? "text-white bg-primary" : "text-gray-700 hover:bg-gray-100"} 
            py-3 px-6 rounded-lg mb-3 transition-colors`}  
          onClick={() => handleClick(item.path)}      
        >
          <item.icon className='text-xl' />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default SlideMenu