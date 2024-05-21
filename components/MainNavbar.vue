<template>
  <div>
    <Menubar :model="items">
      <template #item="{ item }">
        <NuxtLink class="mx-4 inline-block" :to="item.url">
          <span class="flex items-center justify-center gap-2 py-2">
            <span :class="item.icon"></span>
            <span>{{ item.label }}</span>
          </span>
        </NuxtLink>
      </template>

      <template #end>
        <Button v-if="!loggedIn">
          <NuxtLink class="mx-3 inline-block" to="/login">
            <span class="flex items-center justify-center gap-2">
              <span :class="PrimeIcons.USER"></span>
              <span>Login</span>
            </span>
          </NuxtLink>
        </Button>

        <Button v-else outlined style="padding: 0" label="logout" @click="clear"
          ><span class="px-3 py-2">Logout</span></Button
        >
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { PrimeIcons } from "primevue/api";

const { loggedIn, clear } = useUserSession();

const items = ref<MenuItem[]>([
  {
    label: "Home",
    icon: PrimeIcons.HOME,
    url: "/",
  },
  {
    label: "Apply",
    icon: PrimeIcons.ENVELOPE,
    url: "/apply",
  },
  {
    label: "Resume",
    icon: PrimeIcons.FILE_EDIT,
    url: "/resume",
  },
  {
    label: "Applications",
    icon: PrimeIcons.LIST,
    url: "/applications",
  },
  {
    label: "Learning List",
    icon: PrimeIcons.INFO_CIRCLE,
    url: "/learning-list",
  },
]);
</script>
