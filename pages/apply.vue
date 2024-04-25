<template>
  <div class="mx-auto grid max-w-[1600px] grid-cols-12 gap-4">
    <resume-preview-settings
      v-model:resumePreviewModel="resumePreviewStore.resumePreview"
      class="print:hidden col-span-12 md:col-span-4"
    ></resume-preview-settings>

    <resume-preview
      :resume="resumePreviewStore.resumePreview"
      class="bg-white text-gray-950 col-span-12 print:col-span-12 md:col-span-8 print:md:col-span-12"
    >
    </resume-preview>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
const resumeStore = useResumeStore();
const resumePreviewStore = useResumePreviewStore();

useAsyncData("loadResume", async function loadResume() {
  await resumeStore.loadResume();

  resumePreviewStore.syncResumePreview();
});
</script>
