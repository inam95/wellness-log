import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <h1>Wellness Log Dashboard</h1>
      <ul>
        <li>
          <Link to="/" activeProps={{ className: 'text-red-500' }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/sign-up" activeProps={{ className: 'text-red-500' }}>
            Sign Up
          </Link>
        </li>
      </ul>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools position="bottom-left" />
    </React.Fragment>
  );
}
