<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <div class="flex gap-2 my-2">
      <h2 class="text-lg">Accomplishments</h2>
      <Button size="small" outlined @click="isAccomplishmentPasteVisible = true"
        >Paste-in accomplishments</Button
      >
    </div>

    <div v-if="isAccomplishmentPasteVisible" class="my-4">
      <label :for="`${jobIndex}-paste-field`"
        >Enter accomplishments separated by a new line</label
      >

      <Textarea
        :id="`${jobIndex}-paste-field`"
        v-model="accomplishmentsPaste"
        class="w-full mb-2"
        auto-resize
      />

      <div class="flex gap-2">
        <Button severity="success" @click="addAccomplishments"
          >Add Accomplishments</Button
        >
        <Button severity="danger" @click="isAccomplishmentPasteVisible = false"
          >Cancel</Button
        >
      </div>
    </div>

    <template v-if="accomplishments.length">
      <div v-for="(accomplishment, index) in accomplishments" :key="index">
        <div class="grid gap-2 mb-2">
          <div>
            <label :for="`${jobIndex}-accomplishment-${index}`"
              >Accomplishment {{ index + 1 }}</label
            >

            <Textarea
              :id="`${jobIndex}-accomplishment-${index}`"
              v-model="accomplishments[index]"
              class="w-full mb-2"
              auto-resize
            />

            <div class="flex gap-2">
              <Button
                severity="danger"
                icon="pi pi-trash"
                :aria-label="`Delete Accomplishment ${index + 1}`"
                type="button"
                @click="accomplishments.splice(index, 1)"
              />
              <Button
                icon="pi pi-plus"
                severity="info"
                type="button"
                aria-label="Add Accomplishment"
                @click="accomplishments.push('')"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <Button
        icon="pi pi-plus"
        severity="info"
        type="button"
        aria-label="Add Accomplishment"
        @click="accomplishments.push('')"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const accomplishments = defineModel("accomplishments", {
  required: true,
  type: Array as PropType<string[]>,
});

const isAccomplishmentPasteVisible = ref(false);

const accomplishmentsPaste = ref("");

defineProps<{ jobIndex: number }>();

function addAccomplishments() {
  const lines = accomplishmentsPaste.value.split("\n");
  const newAccomplishments = lines.map(
    function getAccomplishmentFromLine(line) {
      return line.replace("•", "").replace("-", "").trim();
    },
  );

  accomplishments.value = newAccomplishments;

  accomplishmentsPaste.value = "";
  isAccomplishmentPasteVisible.value = false;
}
</script>
