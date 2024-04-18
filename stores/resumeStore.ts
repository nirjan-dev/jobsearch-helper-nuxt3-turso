import { defineStore } from "pinia";
import type { Resume } from "~/types/resume.types";

export const useResumeStore = defineStore(
  "resumeStore",
  function resumeStore() {
    const resume = ref<Resume>({
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
          startDate: "",
          endDate: "",
          role: "",
          useMainRole: false,
          accomplishments: [""],
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          link: "",
        },
      ],
    });

    function updateResume() {
      alert("saved");
      console.table(resume.value);
    }

    return {
      resume,
      updateResume,
    };
  },
);
