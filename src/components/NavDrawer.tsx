import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { closeMenu, selectMenuOpened } from '../app/uiSlice';
import { useAppDispatch } from '../app/hooks';

import styles from './NavDrawer.module.css';
import { useSigninCheck } from 'reactfire';

export const navDrawerWidth = 240;

export default function NavDrawer() {
  const dispatch = useAppDispatch();
  const menuOpened = useSelector(selectMenuOpened);

  const { status, data } = useSigninCheck();
  const isLoggedIn = status === 'success' && data.signedIn;

  const drawer = (
    <>
      <Toolbar />
      <List>
        <ListItem>
          <NavLink
            to="/book-finder"
            className={({ isActive }) =>
              classNames(styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Book finder" />
            </ListItemButton>
          </NavLink>
        </ListItem>
        {isLoggedIn && (
          <ListItem>
            <NavLink
              to="/todos"
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.active]: isActive,
                })
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Todos list" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {isLoggedIn ? (
          <ListItem>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.active]: isActive,
                })
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ) : (
          <ListItem>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                classNames(styles.link, {
                  [styles.active]: isActive,
                })
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        )}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: navDrawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={menuOpened}
        onClose={() => dispatch(closeMenu())}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: navDrawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: navDrawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}