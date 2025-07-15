<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import useFetcher from '$lib/use-fetcher.svelte';

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

  const currentSession = authClient.useSession();
  const sessions = useFetcher(() => authClient.multiSession.listDeviceSessions());

  async function setActiveSession(sessionToken: string) {
    try {
      await authClient.multiSession.setActive({
        sessionToken
      });
      alert('Active session updated.');
    } catch (err) {
      console.log('Failed to set active session', err);
    }
  }
</script>

<svelte:head>
  <title>Multi Session</title>
</svelte:head>

<h1>Sign In</h1>

<button onclick={linkedinSignIn}> Sign In with LinkedIn </button>
<button onclick={githubSignIn}> Sign In with GitHub </button>

<hr />

<form method="POST" action="?/activeSession">
  <label>
    Session Token
    <input name="token" type="text" />
  </label>
  <button>Set Session</button>
</form>

<hr />

<h1>Current Session</h1>

<div>
  {#if $currentSession.data}
    <div class="session-container">
      <div class="session-flex">
        <div class="session-column">
          <h3>Session</h3>
          <pre class="json-block">{JSON.stringify($currentSession.data.session, null, 2)}</pre>
        </div>
        <div class="session-column">
          <h3>User</h3>
          <pre class="json-block">{JSON.stringify($currentSession.data.user, null, 2)}</pre>
        </div>
      </div>
    </div>
  {:else}
    <p>No current session</p>
  {/if}
</div>

<hr />

<h1>Sessions</h1>

{#if sessions.isLoading}
  <p>Fetching sessions...</p>
{:else if sessions.error}
  <p>An error occurred while fetching sessions</p>
  <pre class="json-block">{JSON.stringify(sessions.error, null, 2)}</pre>
{:else if sessions.data}
  <div>
    {#each sessions.data.data ?? [] as session}
      <div class="session-container">
        <div class="session-flex">
          <div class="session-column">
            <h3>Session</h3>
            <pre class="json-block">{JSON.stringify(session.session, null, 2)}</pre>
          </div>
          <div class="session-column">
            <h3>User</h3>
            <pre class="json-block">{JSON.stringify(session.user, null, 2)}</pre>
          </div>
        </div>
        <button onclick={() => setActiveSession(session.session.token)}>Set as Active</button>
      </div>
    {/each}
  </div>
{/if}

<style>
  .json-block {
    background: #f6f8fa;
    padding: 1em;
    border-radius: 8px;
    overflow: auto;
  }

  .session-container {
    background: #f6f8fa;
    padding: 1em;
    border-radius: 8px;
    margin-bottom: 1em;
  }

  .session-flex {
    display: flex;
    gap: 1em;
    align-items: flex-start;
  }

  .session-column {
    flex: 1;
  }

  button {
    margin-right: 0.5em;
    padding: 0.5em 1em;
    border: none;
    border-radius: 4px;
    background-color: #0073b1; /* LinkedIn blue by default */
    color: white;
    cursor: pointer;
  }

  button:nth-of-type(2) {
    background-color: #333; /* GitHub black */
  }

  button:hover {
    opacity: 0.9;
  }

  h3 {
    margin-top: 0;
  }
</style>
