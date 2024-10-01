<script setup lang="ts">
const { status, getSession, data } = useAuth()
</script>

<template>
  You are currently {{ status }}.
  {{ data }}
  <UButton @click="() => getSession({ required: true })">Login</UButton>
</template>
