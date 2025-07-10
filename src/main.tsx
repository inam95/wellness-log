import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { routeTree } from './routeTree.gen.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
