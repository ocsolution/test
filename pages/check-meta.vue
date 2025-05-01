<template>
  <div class="mx-auto p-4" style="width: 760px;">
    <div class="shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Social Media Metadata Checker</h2>

      <input v-model="url" type="text" placeholder="Enter URL to check metadata"
        class="flex-grow w-full mr-2 p-2 border rounded" /><br><br>
      <button @click="fetchMetadata" :disabled="isLoading" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ isLoading ? 'Checking...' : 'Check Metadata' }}
      </button><br><br>

      <div v-if="error" class="text-red-500 mb-4">
        Error: {{ error }}
      </div>

      <div v-if="metadata" class="grid md:grid-cols-2 gap-4">
        <div>
          <h3 class="font-semibold mb-2">Facebook Post Preview</h3>
          <div class="border rounded-lg overflow-hidden shadow-lg">
            <img v-if="metadata.image" :src="metadata.image" :alt="metadata.title || 'Post Preview'"
              class="w-full h-48 object-cover" />
            <div class="p-3 bg-white">

              <a :href="url" target="_blank">
                <b class="font-bold text-lg text-gray-600 text-sm line-clamp-1">
                  {{ metadata.title || 'N/A' }}
                </b>
                <div class="text-xs text-gray-500 mt-1">
                  {{ url }}
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Detailed Metadata -->
        <div>
          <h2 class="font-semibold mb-2">Metadata Details</h2><br>
          <div class="rounded-lg">
            <div class="mb-2">
              <strong>Title:</strong> {{ metadata.title || 'N/A' }}
            </div>
            <div class="mb-2">
              <strong>Description:</strong> {{ metadata.description || 'N/A' }}
            </div>
            <div class="mb-2">
              <strong>Image URL: </strong>
              <a v-if="metadata.image" :href="metadata.image" target="_blank" rel="noopener noreferrer"
                class="text-blue-500 ml-2">
                {{ metadata.image }}
              </a>
              <span v-else>No Image Found</span>
            </div>
            <div>
              <strong>Original URL:</strong> <a class="text-blue-500 ml-2" :href="url" target="_blank">
                {{ url }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const url = ref('https://www.youtube.com/watch?v=xyUYIpgVaBs')
const metadata = ref(null)
const error = ref(null)
const isLoading = ref(false)

const fetchMetadata = async () => {
  if (!url.value.trim()) {
    error.value = 'Please enter a valid URL'
    return
  }

  isLoading.value = true
  error.value = null
  metadata.value = null

  try {
    const { data } = await useFetch('/api/metadata', {
      method: 'GET',
      params: { url: url.value }
    })

    metadata.value = data.value
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>