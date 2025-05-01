<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">View Detail {{ id }}</h1>
    </div>
</template>

<script setup>
const api = 'https://raw.githubusercontent.com/sovannDeveloper/my-cdn/refs/heads/main/products.json?v=3';
const route = useRoute();
const id = computed(() => route.params.id);

useOcHead(async () => {
    let resp = await $fetch(api);
    let data = JSON.parse(resp);

    if (data) {
        data = data[Number.parseInt(id.value) - 1];

        return {
            title: `${data?.title}`,
            description: `${data?.description}`,
            image: `${data?.image}`,
            url: `${id.value}`,
        };
    }
});

// Define which routes should be pre-rendered
definePageMeta({
    validate: (route) => {
        return /^\d+$/.test(route.params.id);
    }
});
</script>