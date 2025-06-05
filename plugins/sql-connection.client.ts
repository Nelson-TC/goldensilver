export default defineNuxtPlugin(async (nuxtApp) => {
  const res = await $fetch('/api/test-connection');
  nuxtApp.provide('sqlConnectionStatus', res);
});
