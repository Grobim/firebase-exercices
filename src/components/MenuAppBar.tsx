import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from 'reactfire';
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { openMenu } from '~/app/uiSlice';
import { useAppDispatch } from '~/app/hooks';
import { logout } from '~/features/auth/auth';

function UserAvatar() {
  const { status, data: user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  async function handleLogout() {
    await logout();
    handleCloseMenu();
  }

  if (status === 'loading') {
    return;
  }

  if (user) {
    return (
      <>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar src={user.photoURL!} alt={user.displayName ?? 'U'} />
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorEl={anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Button variant="text" color="inherit">
        Login
      </Button>
    </Link>
  );
}

export default function MenuAppBar() {
  const dispatch = useAppDispatch();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(openMenu())}
            sx={{
              mr: 2,
              display: {
                xs: 'flex',
                sm: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Firebase exercices
          </Typography>
          <UserAvatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
