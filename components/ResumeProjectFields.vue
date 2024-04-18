<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <h2 class="text-lg">Projects</h2>

    <div v-for="(project, index) in projects" :key="index">
      <div class="grid gap-2 mb-2">
        <div>
          <label :for="`title-${index}`">Title</label>
          <InputText
            :id="`title-${index}`"
            v-model="project.title"
            class="w-full"
            type="text"
          />
        </div>

        <div>
          <label :for="`description-${index}`">Description</label>
          <Textarea
            :id="`description-${index}`"
            v-model="project.description"
            class="w-full"
          />
        </div>

        <div>
          <label :for="`link-${index}`">Link</label>
          <InputText
            :id="`link-${index}`"
            v-model="project.link"
            class="w-full"
            type="text"
          />
        </div>

        <div class="flex gap-2">
          <Button
            severity="danger"
            icon="pi pi-trash"
            :aria-label="`Delete Project ${index + 1}`"
            type="button"
            @click="projects.splice(index, 1)"
          />
          <Button
            type="button"
            icon="pi pi-plus"
            severity="info"
            aria-label="Add Link"
            @click="
              projects.push({
                description: '',
                title: '',
                link: '',
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const projects = defineModel("projects", {
  required: true,
  type: Array as PropType<
    { title: string; description: string; link: string }[]
  >,
});
</script>
