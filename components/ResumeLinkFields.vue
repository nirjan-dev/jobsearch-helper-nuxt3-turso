<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="my-3">
    <h2 class="text-lg">Links</h2>

    <template v-if="links.length">
      <div v-for="(link, index) in links" :key="index" class="grid gap-2 mb-2">
        <div>
          <label :for="`link-title-${index}`">Title</label>
          <InputText
            :id="`link-title-${index}`"
            v-model="link.title"
            type="text"
            class="w-full"
          />
        </div>
        <div>
          <label :for="`link-url-${index}`">URL</label>
          <InputText
            :id="`link-url-${index}`"
            v-model="link.url"
            class="w-full"
            type="text"
          />
        </div>
        <div class="flex gap-2">
          <Button
            severity="danger"
            icon="pi pi-trash"
            :aria-label="`Delete Link ${index + 1}`"
            type="button"
            @click="links.splice(index, 1)"
          />
          <Button
            icon="pi pi-plus"
            severity="info"
            type="button"
            aria-label="Add Link"
            @click="links.push({ title: '', url: '' })"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <Button
        icon="pi pi-plus"
        severity="info"
        type="button"
        aria-label="Add Link"
        @click="links.push({ title: '', url: '' })"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const links = defineModel("links", {
  required: true,
  type: Array as PropType<{ title: string; url: string }[]>,
});
</script>
