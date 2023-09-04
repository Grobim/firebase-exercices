import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';
import App from '../Home';
import ErrorPage from '../error-page';
import Login from '../features/auth/Login';
import Profile from '../features/auth/Profile';
import BookFinder from '../features/book-finder/BookFinder';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/book-finder" element={<BookFinder />} />
      <Route path="*" element={<ErrorPage message="Page not found" />} />
    </Route>,
  ),
);

export default router;
