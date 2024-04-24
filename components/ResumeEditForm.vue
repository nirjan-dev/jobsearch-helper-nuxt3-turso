<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Card>
    <template #title>
      <h1>Edit your resume</h1>
    </template>

    <template #content>
      <form class="grid gap-2 px-4 py-3" @submit.prevent>
        <ResumeBasicInfoFields v-model:resume-form-model="resumeFormModel" />

        <ResumeLinkFields v-model:links="resumeFormModel.links" />

        <div>
          <label for="skills">Skills</label>
          <Chips
            v-model="resumeFormModel.skills"
            input-id="skills"
            class="w-full"
            separator=","
          />
        </div>

        <ResumeJobFields v-model:jobs="resumeFormModel.jobs" />

        <ResumeProjectFields v-model:projects="resumeFormModel.projects" />
        <div class="flex gap-2">
          <Button
            size="large"
            label="Save"
            type="button"
            icon="pi pi-save"
            icon-pos="right"
            :loading="isResumeSaving"
            @click="emit('onFormSave')"
          />

          <Button size="large" outlined type="button">
            <NuxtLink to="/apply">Apply to Jobs</NuxtLink>
          </Button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Resume } from "~/types/resume.types";

const resumeFormModel = defineModel("resumeFormModel", {
  required: true,
  type: Object as PropType<Resume>,
});

defineProps<{ isResumeSaving: boolean }>();

const emit = defineEmits<{
  onFormSave: [];
}>();
</script>
