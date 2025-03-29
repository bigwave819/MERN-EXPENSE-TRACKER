import React, { useContext, useEffect } from 'react';
import { userContext } from "../../context/UserContext";
import Navbar from './Navbar';
import SlideMenu from './SlideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(userContext);
  
  // Add debug logging
  console.log('Current user in DashboardLayout:', user);

  useEffect(() => {
    console.log('User context value:', { user });
  }, [user]);

  return (
    <div className=''>
      <Navbar activeMenu={activeMenu} />
      {user ? (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SlideMenu activeMenu={activeMenu} />
          </div>
          <div className='grow mx-5'>{children}</div>
        </div>
      ) : (
        <div className="p-4 text-red-500">
          Please log in to access the dashboard
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;