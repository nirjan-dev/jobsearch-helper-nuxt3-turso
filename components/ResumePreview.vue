<template>
  <div id="resume-preview" class="mx-auto px-6 py-4">
    <div class="grid mb-4">
      <h2 class="text-center text-4xl font-bold">{{ resume.name }}</h2>
      <h3 class="text-center text-xl font-medium">{{ resume.role }}</h3>
      <ul class="my-1 flex flex-wrap justify-center gap-4">
        <li>
          <a :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
        </li>
        <li>{{ resume.location }}</li>
      </ul>
      <ul class="my-0 flex flex-wrap justify-center gap-4">
        <li>
          <a :href="`mailto:${resume.email}`">{{ resume.email }}</a>
        </li>
        <li v-for="link in resume.links" :key="link.url">
          <a :href="link.url">{{ link.title }}</a>
        </li>
      </ul>
    </div>

    <div class="grid gap-2">
      <section class="grid gap-1">
        <h3>Summary</h3>
        <p>
          {{ resume.summary }}
        </p>
      </section>
      <section class="grid gap-1">
        <h3>Skills</h3>
        <ul v-if="resume?.skills?.length > 0" class="flex flex-wrap gap-5">
          <template v-for="skill in resume.skills" :key="skill">
            <li :v-if="skill">
              {{ skill }}
            </li>
          </template>
        </ul>
      </section>
      <section class="grid gap-1">
        <h3>Work Experience</h3>

        <article v-for="job in resume.jobs" :key="job.companyName">
          <h4 class="text-xl font-medium">
            {{ job.useMainRole ? resume.role : job.role }}
            <span class="float-right text-base"
              >{{ formatDate(job.startDate) }} -
              {{ job.isCurrentJob ? "Present" : formatDate(job.endDate) }}</span
            >
          </h4>
          <h5 class="text-lg font-semibold">{{ job.companyName }}</h5>

          <ul
            v-if="job.accomplishments?.length > 0"
            class="list-inside list-disc my-4"
          >
            <li
              v-for="accomplishment in job.accomplishments"
              :key="accomplishment"
            >
              {{ accomplishment }}
            </li>
          </ul>
        </article>
      </section>
      <section
        v-if="resume.projects && resume.projects.length > 0"
        class="grid gap-1"
      >
        <h3>Projects</h3>
        <article
          v-for="project in resume.projects"
          :key="project.link"
          class="grid"
        >
          <h4 class="text-xl">
            <a :href="project.link">{{ project.title }}</a>
          </h4>
          <h5 class="font-normal">{{ project.description }}</h5>
        </article>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Resume } from "~/types/resume.types";

defineProps<{
  resume: Resume;
}>();

function formatDate(date: Date | string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}
</script>

<style scoped>
a {
  @apply text-blue-600;
}

h3 {
  @apply mb-2 text-2xl font-bold;
}

section h3 {
  border-bottom: 2px solid;
  @apply border-gray-300 pb-2;
}

section li {
  @apply mb-1;
}
</style>
