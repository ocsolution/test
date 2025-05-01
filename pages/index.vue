<template>
  <div class="p-6">
    <ol>
      <li>
        <NuxtLink to="/facebook">To facebook auth</NuxtLink><br />

      </li>
      <li>
        <NuxtLink to="/products">Products</NuxtLink><br />

      </li>
      <li>
        <NuxtLink to="/check-meta">Check Metadata</NuxtLink><br />
      </li>
    </ol>
    <br>
    <u>
      <h1>Products:</h1>
    </u>

    <ul>
      <li v-for="item in products">
        <img :src="item.image" alt="Not Found" style="height: 300px;width: 400px;" />
        <h1>{{ item.title }}</h1>
      </li>
    </ul>

  </div>
</template>

<script setup>
const products = ref()

const { data } = await useFetch('/api/list')
products.value = data.value

useHead({
  title: 'Product List',
  meta: [
    {
      name: 'description',
      content: 'Browse our list of amazing products.'
    },
    {
      name: 'keywords',
      content: 'products, shopping, ecommerce'
    },
    {
      property: 'og:image',
      content: 'https://down-ph.img.susercontent.com/file/ph-11134207-7r98v-lrva9es9vb3pc9'
    }
  ],
})

</script>

<style scoped></style>