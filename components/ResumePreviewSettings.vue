<template>
  <Card class="rounded-md shadow-sm">
    <template #title>
      <h2 class="mb-4 flex justify-between text-xl font-bold">
        Resume Preview Settings
      </h2>

      <div class="mb-4">
        <Button
          :loading="isDownloadingResume"
          label="Download Resume"
          icon="pi pi-download"
          icon-pos="right"
          @click="downloadResume"
        />
      </div>

      <resume-preview-form v-model:resume-preview-model="resumePreviewModel" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Resume, ResumePreview } from "~/types/resume.types";

const resumePreviewModel = defineModel("resumePreviewModel", {
  type: Object as PropType<ResumePreview>,
  required: true,
});

const isDownloadingResume = ref(false);

async function downloadResume() {
  isDownloadingResume.value = true;
  const result: any = await $fetch("/api/download-resume", {
    method: "POST",
    responseType: "arrayBuffer",
    headers: {
      Accept: "application/pdf",
    },
    body: {
      resumeDetails: JSON.stringify(
        resumePreviewToResume(resumePreviewModel.value),
      ),
    },
  });

  const blob = new Blob([result], { type: "application/pdf" });

  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = "resume.pdf";
  a.click();
  a.remove();
  isDownloadingResume.value = false;
}

function resumePreviewToResume(resumePreview: ResumePreview): Resume {
  return {
    ...resumePreview,
    skills: useResumePreviewStore().enabledSkills,
    jobs: resumePreview.jobs.map(function getEnabledAccomplishmentsWithJobs(j) {
      return {
        ...j,
        accomplishments:
          useResumePreviewStore().getEnabledAccomplishmentsFromJob(j),
      };
    }),
  };
}
</script>
