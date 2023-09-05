import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route lazy={() => import('../components/Layout')}>
      <Route path="/" lazy={() => import('../Home')} />
      <Route path="/login" lazy={() => import('../features/auth/Login')} />
      <Route path="/profile" lazy={() => import('../features/auth/Profile')} />
      <Route
        path="/book-finder"
        lazy={() => import('../features/book-finder/BookFinder')}
      />
      <Route path="/todos" lazy={() => import('../features/todo/TodoPage')} />
      <Route
        path="*"
        lazy={async () => {
          const { Component } = await import('../error-page');
          return { Component: () => <Component message="Page not found" /> };
        }}
      />
    </Route>,
  ),
);

export default router;
