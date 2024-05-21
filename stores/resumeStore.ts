/* eslint-disable max-lines-per-function */
import { defineStore } from "pinia";
import type { Resume } from "~/types/resume.types";

export const useResumeStore = defineStore(
  "resumeStore",
  function resumeStore() {
    const defaultResume: Resume = getDefaultResume();

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

    function setResume(updatedResume: Resume) {
      resume.value = updatedResume;
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
      setResume,
    };

    function getDefaultResume(): Resume {
      return {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+5551234",
        skills: [
          "HTML",
          "CSS",
          "ChatGPT",
          "Figma",
          "PHP",
          "Wordpress",
          "React",
          "Vue",
          "Node",
        ],
        jobs: [
          {
            companyName: "Google",
            startDate: new Date("2021-01-01"),
            endDate: new Date("2022-01-01"),
            isCurrentJob: true,
            role: "Software Developer",
            useMainRole: true,
            accomplishments: [
              "Built a chatbot to increase productivity by 100%",

              "Added an automation to save 1000 hours of work per year",

              "Redesigned the website to increase conversion by 50%",
            ],
          },
          {
            companyName: "Facebook",
            startDate: new Date("2020-01-01"),
            endDate: new Date("2021-01-01"),
            isCurrentJob: false,
            role: "Software Engineer",
            useMainRole: false,
            accomplishments: [
              "Built a chatbot to increase productivity by 100%",

              "Added an automation to save 1000 hours of work per year",

              "Redesigned the website to increase conversion by 50%",
            ],
          },
        ],
        summary:
          "I am a software engineer with 5 years of experience in building web applications. I am passionate about building products that help people.",
        role: "Software Engineer",
        links: [
          {
            title: "LinkedIn",
            url: "https://linkedin.com/in/johndoe",
          },
          {
            title: "Github",
            url: "https://github.com/johndoe",
          },
        ],
        location: "Florida, USA",
        projects: [
          {
            title: "My Awesome Blog",
            description: "This is a project I built",
            link: "https://nijan.dev",
          },
        ],
      };
    }
  },
);
