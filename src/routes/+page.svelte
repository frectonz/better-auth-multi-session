<script lang="ts">
  import { authClient } from '$lib/auth-client';

  function signIn() {
    authClient.signIn.social({
      provider: 'linkedin'
    });
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={signIn}> Sign In with LinkedIn </button>
