<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <h2 class="text-lg">Jobs</h2>

    <template v-if="jobs.length">
      <div v-for="(job, index) in jobs" :key="index">
        <div class="grid gap-2 mb-2">
          <div>
            <label :for="`company-name-${index}`">Company Name</label>
            <InputText
              :id="`company-name-${index}`"
              v-model="job.companyName"
              class="w-full"
              type="text"
            />
          </div>
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
          <div>
            <label :for="`accomplishments-${index}`">Accomplishments</label>
            <Textarea
              :id="`accomplishments-${index}`"
              v-model="job.accomplishments"
              class="w-full"
              rows="8"
              auto-resize
            />
          </div>
          <div class="flex gap-2">
            <Button
              severity="danger"
              icon="pi pi-trash"
              :aria-label="`Delete Job ${index + 1}`"
              type="button"
              @click="jobs.splice(index, 1)"
            />
            <Button
              type="button"
              icon="pi pi-plus"
              severity="info"
              aria-label="Add Job"
              @click="
                jobs.push({
                  accomplishments: '',
                  companyName: '',
                  endDate: '',
                  role: '',
                  startDate: '',
                  useMainRole: false,
                })
              "
            />
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
        @click="
          jobs.push({
            accomplishments: '',
            companyName: '',
            endDate: '',
            role: '',
            startDate: '',
            useMainRole: false,
          })
        "
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const jobs = defineModel("jobs", {
  required: true,
  type: Array as PropType<
    {
      companyName: string;
      startDate: string;
      endDate: string;
      role: string;
      useMainRole: boolean;
      accomplishments: string;
    }[]
  >,
});
</script>
