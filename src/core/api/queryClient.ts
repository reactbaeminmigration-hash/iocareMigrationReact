import { QueryClient } from '@tanstack/react-query';

const qureyClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default qureyClient;
