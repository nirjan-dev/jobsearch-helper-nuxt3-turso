<template>
  <Card class="rounded-md shadow-sm">
    <template #title>
      <h2 class="mb-4 flex justify-between text-xl font-bold">
        Resume Preview Settings
      </h2>

      <resume-preview-form v-model:resume-preview-model="resumePreviewModel" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { ResumePreview } from "~/types/resume.types";

const resumePreviewModel = defineModel("resumePreviewModel", {
  type: Object as PropType<ResumePreview>,
  required: true,
});
</script>
