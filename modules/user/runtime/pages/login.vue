<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="flex justify-center">
    <Card class="max-w-40">
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
        <div class="grid gap-2">
          <Button icon="pi-google" label="Continue with Google"
            >Continue with Google</Button
          >
          <Button icon="pi-github" label="Continue with Github"
            >Continue with Github</Button
          >
          <Button icon="pi-linkedin" label="Continue with LinkedIn"
            >Continue with LinkedIn</Button
          >
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
</script>
