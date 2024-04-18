<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <label for="name">Name</label>

    <InputText
      id="name"
      v-model="resumeFormModel.name"
      class="w-full"
      type="text"
    />
  </div>

  <div>
    <label for="email">Email</label>

    <InputText
      id="email"
      v-model="resumeFormModel.email"
      class="w-full"
      type="email"
    />
  </div>

  <div>
    <label for="phone">Phone</label>

    <InputText
      id="phone"
      v-model="resumeFormModel.phone"
      class="w-full"
      type="text"
    />
  </div>

  <div>
    <label for="summary">Summary</label>

    <Textarea
      id="summary"
      v-model="resumeFormModel.summary"
      class="w-full"
      auto-resize
    />
  </div>

  <div>
    <label for="location">Location</label>

    <InputText
      id="location"
      v-model="resumeFormModel.location"
      class="w-full"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
const resumeFormModel = defineModel("resumeFormModel", {
  required: true,
  type: Object as PropType<{
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  }>,
});
</script>
