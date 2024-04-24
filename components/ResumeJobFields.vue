<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <h2 class="text-lg">Jobs</h2>

    <template v-if="jobs.length">
      <div v-for="(job, index) in jobs" :key="index">
        <h3>Job #{{ index + 1 }}</h3>
        <div class="grid gap-2 mb-6">
          <div>
            <label :for="`company-name-${index}`">Company Name</label>
            <InputText
              :id="`company-name-${index}`"
              v-model="job.companyName"
              class="w-full"
              type="text"
            />
          </div>
          <AccomplishmentFields
            v-model:accomplishments="job.accomplishments"
            :job-index="index"
          />
          <div>
            <label :for="`startDate-${index}`">Start Date</label>
            <Calendar
              v-model="job.startDate"
              :input-id="`startDate-${index}`"
              show-icon
              class="w-full"
            />
          </div>
          <div>
            <label class="flex items-center gap-2"
              >Still working here?

              <InputSwitch
                v-model="job.isCurrentJob"
                :input-id="`stillWorkingHere-${index}`"
              />
            </label>
          </div>
          <div v-if="!job.isCurrentJob">
            <label :for="`endDate-${index}`">End Date</label>
            <Calendar
              :id="`endDate-${index}`"
              v-model="job.endDate"
              show-icon
              class="w-full"
            />
          </div>
          <div class="flex items-center gap-2">
            <label :for="`mainRole-${index}`">Use Main Role?</label>
            <InputSwitch
              v-model="job.useMainRole"
              :input-id="`mainRole-${index}`"
            />
          </div>
          <div v-if="!job.useMainRole">
            <label :for="`role-${index}`">Role</label>
            <InputText
              :id="`role-${index}`"
              v-model="job.role"
              class="w-full"
              type="text"
            />
          </div>

          <div class="flex gap-2">
            <Button
              severity="danger"
              :aria-label="`Delete Job ${index + 1}`"
              type="button"
              @click="jobs.splice(index, 1)"
              >Remove Job</Button
            >
            <Button
              type="button"
              severity="info"
              aria-label="Add Job"
              @click="addNewJob"
              >Add Job</Button
            >
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <Button
        type="button"
        icon="pi pi-plus"
        severity="info"
        aria-label="Add Job"
        @click="addNewJob"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Job } from "~/types/resume.types";

const jobs = defineModel("jobs", {
  required: true,
  type: Array as PropType<Job[]>,
});

function addNewJob() {
  jobs.value.push({
    accomplishments: [""],
    companyName: "",
    endDate: new Date(),
    role: "",
    startDate: new Date(),
    useMainRole: false,
    isCurrentJob: false,
  });
}
</script>
