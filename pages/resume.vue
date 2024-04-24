<template>
  <div>
    <ResumeEditForm
      v-model:resumeFormModel="resumeStore.resume"
      :is-resume-saving="isResumeSaving"
      @on-form-save="onFormSave"
    />
  </div>
</template>

<script setup lang="ts">
const resumeStore = useResumeStore();
const isResumeSaving = ref(false);
const toast = useToast();
useAsyncData("loadResume", function loadResume() {
  return resumeStore.loadResume();
});

async function onFormSave() {
  isResumeSaving.value = true;
  try {
    await resumeStore.updateResume();

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Resume updated",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Could not update resume",
      life: 3000,
    });
  }
  isResumeSaving.value = false;
}

definePageMeta({
  middleware: ["auth"],
});
</script>
