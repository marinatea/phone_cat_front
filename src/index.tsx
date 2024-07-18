import { App } from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </Provider>,
);
