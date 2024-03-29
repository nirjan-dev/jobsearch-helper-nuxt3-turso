<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="flex justify-center">
    <Card class="max-w-80 p-3">
      <template #header>
        <h1 class="pb-2">Login to your account</h1>
      </template>
      <template #content>
        <form class="grid gap-4">
          <div class="grid gap-2">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <Button class="w-full" type="submit">Continue with email</Button>
        </form>
        <p class="my-6 text-center">or continue with</p>
        <hr class="my-6" />
        <div class="flex gap-2 justify-center">
          <Button
            icon="pi pi-google"
            aria-label="Continue with Google"
            @click="navigateTo(googleLoginLink, { external: true })"
          />
          <Button
            icon="pi pi-github"
            aria-label="Continue with Github"
            @click="navigateTo(githubLoginLink, { external: true })"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const backendAPIPath = useRuntimeConfig().public.backendUrl;

const githubLoginLink = backendAPIPath + "/auth/redirect/github";
const googleLoginLink = backendAPIPath + "/auth/redirect/google";
</script>
