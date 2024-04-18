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

        <Button type="button" @click="emit('onFormSave')">Save</Button>
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

const emit = defineEmits<{
  onFormSave: [];
}>();
</script>
