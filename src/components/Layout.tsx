import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useMenuCloseOnLocationChange } from '../app/hooks';

import MenuAppBar from './MenuAppBar';
import NavDrawer, { navDrawerWidth } from './NavDrawer';

import { Component as ErrorPage } from '../error-page';

export function Component() {
  useMenuCloseOnLocationChange();

  return (
    <Box display="flex">
      <MenuAppBar />
      <NavDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${navDrawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export const ErrorBoundary = ErrorPage;

export default Component;
