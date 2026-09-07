import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { SIDEBAR_WIDTH } from '../constants/ui';

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
