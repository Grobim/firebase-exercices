import { Navigate } from 'react-router-dom';
import { useUser } from 'reactfire';

import { Typography } from '@mui/material';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

export function Component() {
  const { status: authStatus, data: user } = useUser();

  if (authStatus === 'success' && !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Todos
      </Typography>
      <NewTodo />
      <TodoList />
    </>
  );
}

export default Component;
