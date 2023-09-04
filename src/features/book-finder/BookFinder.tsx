import { Typography } from '@mui/material';

import BookQuery from './BookQuery';
import BookList from './BookList';

export default function BookFinder() {
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
