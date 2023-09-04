import { useRouteError } from 'react-router-dom';

type ErrorPageProps = {
  message?: string;
};

export default function ErrorPage({ message }: ErrorPageProps) {
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message || error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
