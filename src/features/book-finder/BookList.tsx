import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { selectQuery, selectStartIndex, setStartIndex } from './bookSlice';
import { Book, useGetBooksQuery } from './book-api';
import { useAppDispatch } from '~/app/hooks';

export default function BookList() {
  const dispatch = useAppDispatch();

  const query = useSelector(selectQuery);
  const startIndex = useSelector(selectStartIndex);
  const { isFetching, data, isUninitialized } = useGetBooksQuery(
    { query, startIndex },
    { skip: !query },
  );

  const [page, setPage] = useState<number>(0);

  if (isUninitialized || !data) {
    return <Typography fontStyle="italic">Perform a book search...</Typography>;
  }

  const { items: books } = data;

  function handlePageChange(newPage: number) {
    return function () {
      setPage(newPage);
      dispatch(setStartIndex(newPage * 10));
    };
  }

  function handleBookClick(book: Book) {
    return function () {
      if (isFetching) {
        return;
      }
      window.open(
        book.volumeInfo.canonicalVolumeLink,
        '_blank',
        'noopener,noreferrer',
      );
    };
  }

  return (
    <>
      <IconButton
        onClick={handlePageChange(page - 1)}
        disabled={page === 0 || isFetching}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton onClick={handlePageChange(page + 1)} disabled={isFetching}>
        <NavigateNextIcon />
      </IconButton>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid xs={12} md={6} key={book.id}>
            <Card>
              <CardActionArea
                disabled={isFetching}
                onClick={handleBookClick(book)}
              >
                <CardMedia
                  image={
                    book.volumeInfo.imageLinks?.smallThumbnail ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/200px-Placeholder_book.svg.png'
                  }
                  sx={{ height: '120px', backgroundSize: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography>
                    <b>Authors: </b>
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.join(', ')}
                  </Typography>
                  <Typography>
                    <b>Published: </b>
                    {book.volumeInfo.publishedDate}
                  </Typography>
                  <Typography>
                    <b>Publisher: </b>
                    {book.volumeInfo.publisher}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
