<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <Card>
    <template #title>
      <h1>Edit your resume</h1>
    </template>

    <template #content>
      <form class="grid gap-2 px-4 py-3">
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

        <Button type="submit">Save</Button>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
const resumeFormModel = defineModel("resumeFormModel", {
  required: true,
  type: Object as PropType<{
    name: string;
    role: string;
    summary: string;
    email: string;
    location: string;
    phone: string;
    links: {
      title: string;
      url: string;
    }[];
    skills: string[];
    jobs: {
      companyName: string;
      startDate: string;
      endDate: string;
      role: string;
      useMainRole: boolean;
      accomplishments: string;
    }[];
    projects: {
      title: string;
      description: string;
      link: string;
    }[];
  }>,
});
</script>
