<!-- pages/callback.vue -->
<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded shadow">
      <p class="font-medium">Error</p>
      <p>{{ error }}</p>
      <div v-if="debugInfo" class="mt-2 p-2 bg-white rounded text-sm font-mono break-all">
        {{ debugInfo }}
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center space-y-4">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      <p class="text-gray-600">Processing authentication...</p>
    </div>

    <div v-else-if="accessToken" class="space-y-4">
      <div class="p-4 bg-green-100 text-green-700 rounded shadow">
        <p class="font-medium">Authentication successful!</p>
      </div>

      <div class="p-4 bg-gray-100 rounded shadow">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold">Access Token:</h2>
          <button class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            @click="copyToken">
            Copy Token
          </button>
        </div>
        <div class="break-all font-mono text-sm bg-white p-3 rounded border">
          {{ accessToken }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const accessToken = ref(null);
const error = ref(null);
const isLoading = ref(true);
const debugInfo = ref(null);
const { client_id, client_secret, redirect_uri } = helper();

onMounted(async () => {
  try {
    const code = route.query.code;

    if (!code) return;

    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token`;
    const response = await $fetch(tokenUrl, {
      params: {
        client_id: client_id,
        client_secret: client_secret,
        code,
        redirect_uri: redirect_uri,
      },
      onResponse({ response }) {
        console.log('Response status:', response.status);
      },
      onRequestError({ error }) {
        console.error('Request error:', error);
        debugInfo.value = JSON.stringify(error, null, 2);
      }
    });

    if (response.access_token) {
      const response2 = await $fetch('https://graph.facebook.com/v21.0/me/accounts', {
        params: {
          access_token: response.access_token
        }
      });

      if (response2.data) {
        const pages = response2.data.map(page => ({
          id: page.id,
          name: page.name,
          accessToken: page.access_token
        }));

        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'oauth_success',
              pages: pages,
            },
            '*'
          );

          window.close();
        }
      }

    } else {
      error.value = 'Failed to obtain access token';
      debugInfo.value = JSON.stringify(response, null, 2);
    }
  } catch (err) {
    error.value = err.data?.error?.message || 'Authentication failed';
    debugInfo.value = JSON.stringify({
      message: err.message,
      data: err.data,
      status: err.status,
      statusText: err.statusText
    }, null, 2);
    console.error('Full error:', err);
  } finally {
    isLoading.value = false;
  }
});

const copyToken = async () => {
  try {
    await navigator.clipboard.writeText(accessToken.value);
    alert('Token copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy token:', err);
    alert('Failed to copy token. Please copy it manually.');
  }
};
</script>