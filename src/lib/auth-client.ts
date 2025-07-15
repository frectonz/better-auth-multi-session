import { createAuthClient } from 'better-auth/svelte';
import { multiSessionClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:5173',
  plugins: [multiSessionClient()]
});
