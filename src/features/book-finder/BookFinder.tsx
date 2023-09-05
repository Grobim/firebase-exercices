import { Typography } from '@mui/material';

import BookQuery from './BookQuery';
import BookList from './BookList';

export function Component() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Book Finder
      </Typography>
      <BookQuery />
      <BookList />
    </>
  );
}

export default Component;
