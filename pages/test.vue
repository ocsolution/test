<template>
  <div>
    <button @click="test">Test</button>
  </div>
</template>

<script setup>
import axios from 'axios';

async function test() {

  let data = '';

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://demo1api.kottrasala.com/api/google_drive/refresh_token',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlZTc5MWVhNi1mODEzLTRjY2UtYmE4MS1iMDUxYmEwOGE1ZjYiLCJ1c24iOiJtZW5naGVuZyIsImxnbiI6Im1lbmdoZW5nIiwiZGlkIjoicG9zdG1hbi10ZXN0IiwiY2lkIjoiNTQxZmM5NjUtYmM1Ny00ODkyLWJkYTktZTJjN2M3YTNlZmFlIiwibzpuIjoiMCIsIm86ZiI6Ik1lbmdoZW5nIiwibzpsIjoiQnVuIiwibzpnIjoiTWFsZSIsIm86dCI6IlRlYWNoZXIiLCJvOnIiOiJCMDFFMDAwMDEiLCJvOmQiOiIxIiwibzppIjoiaHR0cHM6Ly9kZW1vMXdlYi5rb3R0cmFzYWxhLmNvbS9VcGxvYWRzL0ltYWdlcy9Vc2VyL21lbmdoZW5nMjAyNDEwMzEwODI3MTkucG5nIiwibzpwIjoiKzg1NTEzMzQ1NjcyIiwiYTp0IjoiW10iLCJuYmYiOjE3MzM4MTgyNzMsImV4cCI6MTczMzgyMTg3MywiaXNzIjoiaHR0cHM6Ly93d3cub2Nzb2x1dGlvbi5uZXQiLCJhdWQiOiJBbGwgcmVnaXN0ZXJlZCBjdXN0b21lcnMifQ.3OvfStbSyIumedixrJ8iMF_cXC20ErJfCbEuGgnG26o',
      'Content-Type': 'application/json',
      'oc_device_id': 'postman-test',
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

}
</script>

<style></style>