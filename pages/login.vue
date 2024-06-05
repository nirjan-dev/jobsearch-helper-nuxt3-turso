<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="flex justify-center">
    <Card class="max-w-80 p-3">
      <template #header>
        <h1 class="pb-2">Login to your account</h1>
      </template>
      <template #content>
        <div class="flex flex-col gap-4 justify-center">
          <Button label="Continue with Google"
            ><a class="flex items-center gap-2" href="/api/auth/google"
              ><i class="pi pi-google"></i> Continue with Google</a
            >
          </Button>
          <Button label="Continue with Github"
            ><a
              class="flex items-center gap-2"
              :href="useNkAuth().getNkAuthLoginLink('github')"
              ><i class="pi pi-github"></i> Continue with Github</a
            >
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts"></script>
