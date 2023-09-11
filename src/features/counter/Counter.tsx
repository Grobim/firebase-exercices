import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { useAppDispatch } from '~/app/hooks';
import { increment, selectCount } from './counterSlice';

export default function Counter() {
  const dispatch = useAppDispatch();
  const count = useSelector(selectCount);

  return (
    <Button variant="contained" onClick={() => dispatch(increment())}>
      count is {count}
    </Button>
  );
}
