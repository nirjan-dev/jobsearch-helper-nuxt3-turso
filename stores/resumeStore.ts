/* eslint-disable max-lines-per-function */
import { defineStore } from "pinia";
import type { Resume } from "~/types/resume.types";

export const useResumeStore = defineStore(
  "resumeStore",
  function resumeStore() {
    const defaultResume: Resume = {
      name: "",
      role: "",
      summary: "",
      email: "",
      location: "",
      phone: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      skills: [],
      jobs: [
        {
          companyName: "",
          startDate: new Date(),
          endDate: new Date(),
          role: "",
          useMainRole: false,
          accomplishments: [""],
          isCurrentJob: false,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          link: "",
        },
      ],
    };

    const resume = ref<Resume>(defaultResume);

    async function updateResume() {
      const user = useUser();

      if (!user.value) return;

      const { execute, error } = await useLarafetch<Resume>(
        `/api/user/${user.value.id}/resume`,
        {
          method: "post",
          body: {
            data: JSON.stringify(resume.value),
          },
        },
      );

      await execute();

      if (error.value) {
        // console.error(error.value);
        throw createError({
          ...error.value,
          statusMessage: "Failed to update resume",
        });
      }
    }

    async function loadResume() {
      const user = useUser();

      if (!user.value) {
        return;
      }

      const {
        execute,
        status,
        data: resumeResponse,
      } = await useLarafetch<Resume>(`/api/user/${user.value.id}/resume`);

      await execute();

      if (status.value !== "error") {
        resume.value = resumeResponse.value ?? defaultResume;
      }
    }

    return {
      resume,
      updateResume,
      loadResume,
    };
  },
);
