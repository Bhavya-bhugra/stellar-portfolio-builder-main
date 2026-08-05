import { projectFilters, projects } from "@/data/projects";
import type { Project, ProjectFilter } from "@/types";

// TODO(backend): replace these local reads with real API calls (CMS or /api/projects).
export const projectService = {
  async listProjects(): Promise<Project[]> {
    return projects;
  },
  async getFilters(): Promise<ProjectFilter[]> {
    return projectFilters;
  },
};
