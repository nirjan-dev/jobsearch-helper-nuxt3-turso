export interface Link {
  title: string;
  url: string;
}

export interface Job {
  companyName: string;
  startDate: Date;
  endDate: Date;
  isCurrentJob: boolean;
  role: string;
  useMainRole: boolean;
  accomplishments: string[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface Resume {
  name: string;
  role: string;
  summary: string;
  email: string;
  location: string;
  phone: string;
  links: Link[];
  skills: string[];
  jobs: Job[];
  projects: Project[];
}
