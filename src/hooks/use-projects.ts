import { useCallback, useEffect, useState } from "react";

import { projectService } from "@/services/projectService";
import type { Project, ProjectFilter } from "@/types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<ProjectFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [projectList, filterList] = await Promise.all([
        projectService.listProjects(),
        projectService.getFilters(),
      ]);
      setProjects(projectList);
      setFilters(filterList);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { projects, filters, loading, error, reload: load };
}
