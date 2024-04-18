<template>
  <div>
    <ResumeEditForm
      v-model:resumeFormModel="resumeFormModel"
      @on-form-save="resumeStore.updateResume"
    />
  </div>
</template>

<script setup lang="ts">
const resumeStore = useResumeStore();
const resumeFormModel = resumeStore.resume;
</script>
