/* eslint-disable max-lines-per-function */
import { defineStore } from "pinia";
import type {
  Job,
  Project,
  ResumePreview,
  ResumePreviewJob,
} from "~/types/resume.types";

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

    const enabledSkills = computed(function computedEnabledSKills() {
      return resumePreview.value.skills
        ?.filter(function getEnabled(s) {
          return s.isEnabled;
        })
        .map(function getSkillTitle(skill) {
          return skill.name;
        });
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

    function getEnabledAccomplishmentsFromJob(job: ResumePreviewJob) {
      return job.accomplishments
        .filter(function getEnabled(accomplishment) {
          return accomplishment.isEnabled;
        })
        .map(function getAccomplishmentName(accomplishment) {
          return accomplishment.name;
        });
    }

    return {
      resumePreview,
      enabledSkills,
      syncResumePreview,
      getEnabledAccomplishmentsFromJob,
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
