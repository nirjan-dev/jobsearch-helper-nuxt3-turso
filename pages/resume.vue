<template>
  <div>
    <ResumeEditForm v-model:resumeFormModel="resumeFormModel" />
  </div>
</template>

<script setup lang="ts">
const resumeFormModel = ref<any>({
  name: "",
  role: "",
  summary: "",
  email: "",
  location: "",
  phone: "",
  links: [
    {
      title: "",
      url: "",
    },
  ],
  skills: [],
  jobs: [
    {
      companyName: "",
      startDate: "",
      endDate: "",
      role: "",
      useMainRole: false,
      accomplishments: "",
    },
  ],
  projects: [
    {
      title: "",
      description: "",
      link: "",
    },
  ],
});
</script>
