import { auth } from '$lib/auth';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  activeSession: async ({ request, setHeaders }) => {
    const data = await request.formData();
    const token = data.get('token');

    if (!token) {
      return fail(400, { message: 'no token provided' });
    }

    console.log({ token });

    try {
      const resp = await auth.api.setActiveSession({
        body: {
          sessionToken: token.toString()
        },
        headers: request.headers,
        asResponse: true
      });

      const cookieUpdate = resp.headers.get('set-cookie');

      if (resp.status === 200 && cookieUpdate) {
        setHeaders({
          'set-cookie': cookieUpdate
        });
      } else {
        console.log('no set cookie header found', resp);
      }

      return {};
    } catch (err) {
      console.log('Failed to set active session', err);
    }
  }
} satisfies Actions;
