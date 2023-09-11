import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useGetBooksQuery } from './book-api';
import { selectQuery, selectStartIndex, setQuery } from './bookSlice';
import { useAppDispatch } from '~/app/hooks';

export default function BookQuery() {
  const dispatch = useAppDispatch();

  const query = useSelector(selectQuery);
  const startIndex = useSelector(selectStartIndex);
  const { isFetching } = useGetBooksQuery(
    { query, startIndex },
    { skip: !query },
  );

  const [input, setInput] = useState<string>(query);

  function handleQuerySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearchClick();
  }

  function handleSearchClick() {
    if (input) {
      dispatch(setQuery(input));
    }
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  return (
    <form onSubmit={handleQuerySubmit}>
      <TextField
        value={input}
        label="Query"
        onChange={handleQueryChange}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearchClick} disabled={isFetching}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: <img src="/google_watermark.gif" />,
        }}
        disabled={isFetching}
        sx={{ mb: 2 }}
        autoFocus
      />
      {isFetching && <CircularProgress sx={{ ml: 2 }} />}
    </form>
  );
}
