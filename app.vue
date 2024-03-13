<template>
  <div>
    <div class="card flex justify-center">
      <h1 class="text-5xl">Test</h1>

      <Button label="Submit" icon="pi pi-check" />
      <Button label="Success" severity="success" />
    </div>

    <Card style="width: 25em">
      <template #header>
        <img
          alt="user header"
          src="https://primefaces.org/cdn/primevue/images/usercard.png"
        />
      </template>
      <template #title> Advanced Card </template>
      <template #subtitle> Card subtitle </template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button
          icon="pi pi-times"
          label="Cancel"
          severity="secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </div>
</template>

<script>
import "~/assets/css/variables.css";
</script>
