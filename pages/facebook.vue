<template>
    <div class="p-6">
        <button class="btn" @click="handleOAuthPopup">Login with Facebook</button>
    </div>
</template>

<script setup>
const { client_id, redirect_uri, scope } = helper();

const handleOAuthPopup = () => {
    const width = 600;
    const height = 760;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?` +
        `client_id=${client_id}` +
        `&redirect_uri=${redirect_uri}` +
        `&scope=${scope.join(',')}`

    const popup = window.open(
        authUrl,
        'FacebookAuth',
        `width=${width},height=${height},left=${left},top=${top},popup=1`
    );

    const handleMessage = (event) => {
        const allowedOrigin = 'https://developers.facebook.com';

        if (event.origin !== allowedOrigin) {
            return;
        }

        try {
            if (event.data.type === 'oauth_success') {
                const { access_token } = event.data;
                console.log('Received access token:', access_token);
            }
        } catch (error) {
            console.error('Error processing OAuth response:', error);
        }
    };

    window.addEventListener('message', handleMessage);

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('Popup was blocked by the browser. Please enable popups for this site.');
    }

    const cleanup = () => {
        window.removeEventListener('message', handleMessage);
    };

    const popupCheck = setInterval(() => {
        if (!popup || popup.closed) {
            cleanup();
            clearInterval(popupCheck);
        }
    }, 1000);
};

onMounted(() => {
    const handleMessage = (event) => {
        if (event.origin === window.location.origin) {
            try {
                const data = event.data;
                if (data.type === 'oauth_success' && data.pages) {
                    console.log('Successfully logged in with Facebook!', data.pages);
                }
            } catch (error) {
                console.error('Error processing OAuth response:', error);
            }
        }
    };

    window.addEventListener('message', handleMessage);
})
</script>

<style scoped>
.btn {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}
</style>