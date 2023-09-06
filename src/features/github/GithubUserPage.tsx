import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { selectUserQuery, setUserQuery } from './githubSlice';
import { useAppDispatch } from '../../app/hooks';
import { useGetUserQuery, useGetUserReposQuery } from './githubApi';

export function Component() {
  const dispatch = useAppDispatch();

  const userQuery = useSelector(selectUserQuery);
  const {
    isFetching,
    isError,
    error,
    data: githubUser,
  } = useGetUserQuery(userQuery, {
    skip: !userQuery,
  });

  const { data: githubRepos } = useGetUserReposQuery(userQuery, {
    skip: !userQuery,
  });
  const popularRepos = useMemo(() => {
    if (!githubRepos) {
      return [];
    }

    return [...githubRepos]
      .sort(
        (repo1, repo2) =>
          repo2.forks_count +
          repo2.watchers_count -
          (repo1.forks_count + repo1.watchers_count),
      )
      .slice(0, 4);
  }, [githubRepos]);

  const [input, setInput] = useState<string>(userQuery);

  function handleQuerySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearchClick();
  }

  function handleSearchClick() {
    if (input) {
      dispatch(setUserQuery(input));
    }
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function GithubUserQuery() {
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
                <IconButton
                  onClick={handleSearchClick}
                  disabled={!input || isFetching}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={isFetching}
          sx={{ mb: 2 }}
          autoFocus
        />
        {isFetching && <CircularProgress sx={{ ml: 2 }} />}
      </form>
    );
  }

  function GithubUserDetail() {
    if (isError) {
      if ('data' in error && error.status === 404) {
        return <Typography color="error">User doesn't exists</Typography>;
      }
      if ('data' in error) {
        return <Typography color="error">{error.status}</Typography>;
      }
      if ('message' in error) {
        return <Typography color="error">{error.message}</Typography>;
      }
    }

    if (isFetching) {
      return <Typography fontStyle="italic">Fetching user...</Typography>;
    }

    if (githubUser && githubRepos) {
      return (
        <>
          <Card sx={{ width: '300px', mb: 2 }}>
            <CardContent>
              <Avatar
                alt={githubUser.name}
                src={githubUser.avatar_url}
                sx={{ height: '150px', width: '150px', marginX: 'auto', mb: 2 }}
              />
              <Typography>
                <b>Name: </b>
                {githubUser.name}
              </Typography>
              <Typography>
                <b>Username: </b>
                {githubUser.login}
              </Typography>
              <Typography>
                <b>Followers: </b>
                {githubUser.followers}
              </Typography>
              <Typography>
                <b>Repositories count: </b>
                {githubUser.public_repos}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="h6">Popular repositories:</Typography>
          {popularRepos.length ? (
            <ul>
              {popularRepos.map((repo) => (
                <li key={repo.name}>
                  <Link href={repo.html_url} target="_blank" rel="noopener">
                    {repo.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Typography fontStyle="italic">No repositories yes...</Typography>
          )}
        </>
      );
    }
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Github user infos
      </Typography>
      <GithubUserQuery />
      <GithubUserDetail />
    </>
  );
}

export default Component;
