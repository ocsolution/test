<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>

    <div v-if="loading">Loading...</div>

    <div v-if="!loading" class="grid grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id" class="border rounded p-4">
        <img :src="product.image" :alt="product.title" style="height: 100px; width: 100px; object-fit: cover"
          class="w-full h-[48px] object-cover mb-2" />
        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
        <p class="text-gray-600 mb-2">{{ product.description }}</p>
        <NuxtLink :to="`/products/${product.id}`" class="text-blue-500 hover:underline"> View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const api = 'https://raw.githubusercontent.com/sovannDeveloper/my-cdn/refs/heads/main/products.json?v=3';
const products = ref([])
const loading = ref(true)

useOcHead(async () => {
  let { data, error } = await useFetch(api);

  if (data.value) {
    let d = JSON.parse(data.value)[4];

    return {
      title: `${d?.title}`,
      description: `${d?.description}`,
      image: `${d?.image}`,
      keyword: 'a,b,c',
      icon: '/favicon.ico',
      lang: 'en',
      type: 'Website',
      url: '',
    };
  }
});

async function fetched() {
  try {
    loading.value = true;
    const { data, error } = await useFetch(api)

    products.value = JSON.parse(data.value)
  } catch (e) {
    console.log('Error', e)
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  setTimeout(async () => {
    await fetched();
  }, 100);
});
</script>
