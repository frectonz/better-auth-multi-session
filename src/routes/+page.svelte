<script lang="ts">
  import { authClient } from '$lib/auth-client';

  function linkedinSignIn() {
    authClient.signIn.social({
      provider: 'linkedin'
    });
  }

  function githubSignIn() {
    authClient.signIn.social({
      provider: 'github'
    });
  }
</script>

<h1>Sign In</h1>

<button onclick={linkedinSignIn}> Sign In with LinkedIn </button>
<button onclick={githubSignIn}> Sign In with GitHub </button>

<hr />
