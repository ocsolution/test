<!-- components/FacebookPageManager.vue -->
<template>
    <div class="p-6 space-y-6">
        <!-- Page Selection -->
        <div class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-semibold mb-4">Select Page</h2>
            <div v-if="isLoadingPages" class="text-gray-600">Loading pages...</div>
            <div v-else-if="pages.length" class="space-y-4">
                <div v-for="page in pages" :key="page.id" class="border rounded p-4 hover:bg-gray-50 cursor-pointer"
                    @click="selectPage(page)">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="font-medium">{{ page.name }}</h3>
                            <p class="text-sm text-gray-600">ID: {{ page.id }}</p>
                        </div>
                        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            @click.stop="selectPage(page)">
                            Select
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="text-gray-600">No pages found</div>
        </div>

        <!-- Selected Page Actions -->
        <div v-if="selectedPage" class="bg-white rounded-lg shadow p-4">
            <h2 class="text-lg font-semibold mb-4">Page Actions: {{ selectedPage.name }}</h2>

            <!-- Post Creation -->
            <div class="space-y-4">
                <textarea v-model="postContent" class="w-full p-2 border rounded" rows="3"
                    placeholder="Write your post content..."></textarea>
                <button @click="createPost" :disabled="isPosting"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
                    {{ isPosting ? 'Posting...' : 'Create Post' }}
                </button>
            </div>

            <!-- Recent Posts -->
            <div class="mt-6">
                <h3 class="font-medium mb-2">Recent Posts</h3>
                <div v-if="isLoadingPosts" class="text-gray-600">Loading posts...</div>
                <div v-else-if="posts.length" class="space-y-4">
                    <div v-for="post in posts" :key="post.id" class="border rounded p-3">
                        <p class="text-sm">{{ post.message }}</p>
                        <p class="text-xs text-gray-500 mt-2">Posted: {{ new Date(post.created_time).toLocaleString() }}
                        </p>
                    </div>
                </div>
                <div v-else class="text-gray-600">No posts found</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const userAccessToken = ref('');
const pages = ref([]);
const selectedPage = ref(null);
const posts = ref([]);
const postContent = ref('');
const isLoadingPages = ref(false);
const isLoadingPosts = ref(false);
const isPosting = ref(false);

// Fetch user's Facebook pages
const fetchPages = async () => {
    isLoadingPages.value = true;
    try {
        const response = await $fetch(`https://graph.facebook.com/v18.0/me/accounts`, {
            params: {
                access_token: userAccessToken.value
            }
        });
        pages.value = response.data || [];
    } catch (error) {
        console.error('Error fetching pages:', error);
    } finally {
        isLoadingPages.value = false;
    }
};

// Select a page and fetch its posts
const selectPage = async (page) => {
    selectedPage.value = page;
    await fetchPagePosts();
};

// Fetch posts for selected page
const fetchPagePosts = async () => {
    if (!selectedPage.value) return;

    isLoadingPosts.value = true;
    try {
        const response = await $fetch(`https://graph.facebook.com/v18.0/${selectedPage.value.id}/posts`, {
            params: {
                access_token: selectedPage.value.access_token,
                fields: 'message,created_time'
            }
        });
        posts.value = response.data || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        isLoadingPosts.value = false;
    }
};

// Create a new post
const createPost = async () => {
    if (!selectedPage.value || !postContent.value) return;

    isPosting.value = true;
    try {
        await $fetch(`https://graph.facebook.com/v18.0/${selectedPage.value.id}/feed`, {
            method: 'POST',
            params: {
                access_token: selectedPage.value.access_token,
                message: postContent.value
            }
        });

        postContent.value = ''; // Clear the input
        await fetchPagePosts(); // Refresh posts list
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
    } finally {
        isPosting.value = false;
    }
};

// Initial fetch of pages when component mounts
onMounted(() => {
    if (userAccessToken.value) {
        fetchPages();
    }
});

// Watch for access token changes
watch(userAccessToken, (newToken) => {
    if (newToken) {
        fetchPages();
    }
});
</script>