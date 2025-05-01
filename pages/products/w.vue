<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">View Detail {{ id }}</h1>
  </div>
</template>

<script setup>
const api = 'https://raw.githubusercontent.com/sovannDeveloper/my-cdn/refs/heads/main/products.json?v=3';
const route = useRoute();
const id = computed(() => route.query.id || route.params.id);

definePageMeta({
  static: true,
  generate: {
    params: {
      id: ['1', '2', '3'] // Add all possible IDs you want to pre-generate
    }
  }
});

useHead(async () => {
  const { data, error } = await useFetch(api);

  if (data.value) {
    const products = JSON.parse(data.value);
    const product = products[Number.parseInt(id.value) - 1];

    return {
      title: product?.title,
      description: product?.description,
      meta: [
        { name: 'description', content: product?.description },
        { name: 'keywords', content: 'a,b,c' },
        { property: 'og:image', content: product?.image },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: '' },
      ]
    };
  }
});
</script>