<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <form class="grid gap-4">
    <div class="grid gap-1">
      <label for="role">Role</label>
      <InputText id="role" v-model="resumePreviewModel.role" type="text" />
    </div>

    <div class="grid gap-1">
      <label for="summary">Summary</label>
      <Textarea
        id="summary"
        v-model="resumePreviewModel.summary"
        auto-resize
        type="text"
      />
    </div>

    <div class="grid gap-1">
      <fieldset>
        <legend>Skills</legend>
      </fieldset>

      <div class="flex gap-4 flex-wrap items-center">
        <label
          v-for="skill in resumePreviewModel.skills"
          :key="skill.name"
          class="flex items-center gap-2"
          ><Checkbox
            v-model="skill.isEnabled"
            binary
            name="skill"
            :value="skill.name"
          />
          {{ skill.name }}</label
        >
      </div>
    </div>

    <div class="grid gap-1">
      <fieldset>
        <legend>Projects</legend>
      </fieldset>

      <div class="flex gap-4 flex-wrap items-center">
        <label
          v-for="project in resumePreviewModel.projects"
          :key="project.title"
          class="flex items-center gap-2"
          ><Checkbox
            v-model="project.isEnabled"
            binary
            name="project"
            :value="project.title"
          />
          {{ project.title }}</label
        >
      </div>
    </div>

    <div
      v-for="(job, index) in resumePreviewModel.jobs"
      :key="index"
      class="grid gap-1"
    >
      <fieldset>
        <legend>Achievements at {{ job.companyName }}</legend>
      </fieldset>

      <div class="flex gap-4 flex-wrap items-center">
        <label
          v-for="accomplishment in job.accomplishments"
          :key="accomplishment.name"
          class="flex items-baseline gap-2"
          ><Checkbox
            v-model="accomplishment.isEnabled"
            binary
            name="accomplishment"
            :value="accomplishment.name"
          />
          {{ accomplishment.name }}</label
        >
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import type { ResumePreview } from "~/types/resume.types";

const resumePreviewModel = defineModel("resumePreviewModel", {
  type: Object as PropType<ResumePreview>,
  required: true,
});
</script>
