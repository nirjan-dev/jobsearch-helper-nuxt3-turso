import { defineStore } from "pinia";
import type { Job, Project, ResumePreview } from "~/types/resume.types";

export const useResumePreviewStore = defineStore(
  "resumePreviewStore",
  function resumePreviewStore() {
    const resume = useResumeStore().resume;
    const resumePreview: Ref<ResumePreview> = ref({
      ...resume,
      skills: resume.skills.map(getResumePreviewSkill),
      jobs: resume.jobs.map(getResumePreviewJob),
      projects: resume.projects.map(getResumePreviewProject),
    });

    function syncResumePreview() {
      const resume = useResumeStore().resume;
      resumePreview.value = {
        ...resume,
        skills: resume.skills.map(getResumePreviewSkill),
        jobs: resume.jobs.map(getResumePreviewJob),
        projects: resume.projects.map(getResumePreviewProject),
      };
    }

    return {
      resumePreview,
      syncResumePreview,
    };

    function getResumePreviewJob(job: Job) {
      return {
        ...job,
        accomplishments: job.accomplishments.map(
          function getAccomplishments(accomplishment) {
            return {
              name: accomplishment,
              isEnabled: true,
            };
          },
        ),
      };
    }

    function getResumePreviewSkill(skill: string) {
      return {
        name: skill,
        isEnabled: true,
      };
    }

    function getResumePreviewProject(project: Project) {
      return {
        ...project,
        isEnabled: true,
      };
    }
  },
);
