<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">View Detail {{ id }}</h1>
    </div>
</template>

<script setup>
const api = 'https://raw.githubusercontent.com/sovannDeveloper/my-cdn/refs/heads/main/products.json?v=3';
const id = useRoute().query.id;

useOcHead(async () => {

    let resp = await $fetch(api);
    let data = JSON.parse(resp);
    console.log('=====>1', id);

    if (data) {
        const productData = data[Number.parseInt(id) - 1];

        if (!productData) {
            throw new Error('Product not found');
        }

        return {
            title: productData.title,
            description: productData.description,
            image: productData.image,
            url: id,
        };
    }
});
</script>
