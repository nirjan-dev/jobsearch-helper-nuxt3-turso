<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-gray-100"
  >
    <Toast />
    <MainNavbar />
    <div class="container mx-auto py-6 px-4">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import "~/assets/css/variables.css";
import "primeicons/primeicons.css";

const toast = useToast();
const route = useRoute();

onMounted(function appMounted() {
  if (route.query.message && route.query.type) {
    toast.add({
      severity: route.query.type as "success" | "error",
      detail: route.query.message,
      life: 3000,
    });
  }
});
</script>
