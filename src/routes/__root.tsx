import { Header } from '@/components/navigation/header';
import type { RootState } from '@/store/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <React.Fragment>
      <div className="bg-background text-primary-foreground flex min-h-screen flex-col">
        {isAuthenticated && <Header />}
        <main className="container mx-auto grow p-4">
          <div className="flex flex-col">
            <Outlet />
          </div>
        </main>
        <footer className="container mx-auto p-4 text-center">
          <p>© 2025 Wellness Log</p>
        </footer>
      </div>
      <Toaster />
      <ReactQueryDevtools />
      <TanStackRouterDevtools position="bottom-left" />
    </React.Fragment>
  );
}
