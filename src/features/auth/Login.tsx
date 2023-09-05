import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSigninCheck } from 'reactfire';

import { loginAndCreate, logout } from './auth';

function LoginElement() {
  const { status, data } = useSigninCheck();

  const navigate = useNavigate();

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  async function handleOnGoogleLoginClick() {
    await loginAndCreate();

    navigate('/');
  }

  async function handleLogOutClick() {
    await logout();
  }

  if (data.signedIn) {
    return (
      <Button variant="contained" onClick={handleLogOutClick}>
        Log out
      </Button>
    );
  }

  return (
    <Button variant="contained" onClick={handleOnGoogleLoginClick}>
      Login with Google
    </Button>
  );
}

export function Component() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Login page
      </Typography>
      <LoginElement />
    </>
  );
}

export default Component;
