class LoadState<T> {
  data = $state<T | null>(null);
  error = $state<unknown | null>(null);
  isLoading = $state(false);
}

export default function useFetcher<T>(fn: () => Promise<T>): LoadState<T> {
  const state = new LoadState<T>();

  async function fetchData() {
    state.isLoading = true;
    try {
      state.data = await fn();
      state.error = null;
    } catch (err) {
      state.error = err;
      state.data = null;
    }
    state.isLoading = false;
  }

  fetchData();

  return state;
}
