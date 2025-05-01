<template>
  <div>
    <h1>Firebase Clould Messaging</h1>
    <div>
      <input type="text" placeholder="Title" v-model="title">&nbsp;
      <input type="text" placeholder="Message" v-model="message">
    </div><br>
    <div>
      <input type="text" placeholder="Token" v-model="token">&nbsp;<button @click="add">Add</button><br><br>
      Tokens
      <br>
      <table border="1" cellspacing="0" cellpadding="5">
        <tbody>
          <tr v-for="e in result" :key="e">
            <td>{{ e }}</td>
            <td><span class="btn-delete" @click="() => remove(e)">❌</span></td>
          </tr>
        </tbody>
      </table>
      <br>
      <button v-if="result.length" @click="push">📤 Send Test<span v-if="loading">...</span></button>
    </div>
  </div>
</template>

<script setup>
const result = computed(() => (tokens.value ?? '').split(',').filter(Boolean));
const loading = ref(false);
const title = useCookie('messaging-title');
const message = useCookie('messaging-body');
const token = ref();
const tokens = useCookie('messaging-tokens');

async function add() {
  if (token.value && token.value.trim() !== '') {
    const tokens0 = (tokens.value?.split(',') ?? []).filter(Boolean);
    if (!tokens0.includes(token.value)) {
      tokens0.push(token.value.trim());
      tokens.value = tokens0.join(',');
    }
    token.value = '';
  }
}

async function remove(e) {
  const tokens0 = (tokens.value ?? '').split(',').filter(Boolean);
  const index = tokens0.indexOf(e);
  if (index > -1) {
    tokens0.splice(index, 1);
    tokens.value = tokens0.join(',');
  }
}

async function push() {
  loading.value = true;
  const { data, error } = await useFetch('/api/messaging', {
    method: 'post',
    body: {
      tokens: result.value,
      title: title.value,
      body: message.value,
    }
  })
  loading.value = false;

  console.log(data.value, error.value)
}

</script>

<style scoped>
input {
  height: 29px;
  min-width: 300px;
  padding: 0 7px;
  box-sizing: border-box;
}

button {
  height: 29px;
  padding: 0 7px;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}

.btn-delete {
  cursor: pointer;
  user-select: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

td {
  word-break: break-all;
}
</style>
