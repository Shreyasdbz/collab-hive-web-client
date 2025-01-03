"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GetProjectSearchResultsResponseDto } from "@/models/project-dtos";
import { ProjectSearchSortByMapping } from "@/models/project-mappings";
import useGetProjectSearchResults from "@/hooks/queries/use-get-project-search-results";

interface IProjectsSearchProvider {
  searchingPending: boolean;
  sortBySelected: string;
  updateSortBySelection?: (id: string) => void;
  rolesSelected: string[];
  updateRolesSelection?: (id: string) => void;
  complexitiesSelected: string[];
  updateComplexitiesSelection?: (id: string) => void;
  technologiesSelected: string[];
  updateTechnologiesSelection?: (id: string) => void;
  resetFilters?: () => void;
  results: GetProjectSearchResultsResponseDto[];
  errorMessage: string | null;
}

const ProjectsSearchContext = createContext<IProjectsSearchProvider>({
  searchingPending: false,
  sortBySelected: [...ProjectSearchSortByMapping.entries()][0][0],
  rolesSelected: [],
  complexitiesSelected: [],
  technologiesSelected: [],
  results: [],
  errorMessage: null,
});

export const ProjectsSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sortBySelected, setSortBySelected] = useState<string>(
    [...ProjectSearchSortByMapping.entries()][0][0]
  );
  const [rolesSelected, setRolesSelected] = useState<string[]>([]);
  const [complexitiesSelected, setComplexitiesSelected] = useState<string[]>(
    []
  );
  const [technologiesSelected, setTechnologiesSelected] = useState<string[]>(
    []
  );
  const [results, setResults] = useState<GetProjectSearchResultsResponseDto[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Memoize arrays to prevent unnecessary re-renders and stale query keys
  const memoizedRoles = useMemo(() => rolesSelected, [rolesSelected]);
  const memoizedComplexities = useMemo(
    () => complexitiesSelected,
    [complexitiesSelected]
  );
  const memoizedTechnologies = useMemo(
    () => technologiesSelected,
    [technologiesSelected]
  );

  const { data, error, isLoading } = useGetProjectSearchResults({
    sortBy: sortBySelected,
    complexities: complexitiesSelected,
    technologies: technologiesSelected,
    roles: rolesSelected,
    page: 1,
    limit: 10000,
  });

  // Handlers for updating filters
  function updateSortBySelection(id: string) {
    setSortBySelected(id);
  }
  function updateRolesSelection(id: string) {
    if (rolesSelected.includes(id)) {
      setRolesSelected(rolesSelected.filter((role) => role !== id));
    } else {
      setRolesSelected([...rolesSelected, id]);
    }
  }
  function updateComplexitiesSelection(id: string) {
    if (complexitiesSelected.includes(id)) {
      setComplexitiesSelected(
        complexitiesSelected.filter((complexity) => complexity !== id)
      );
    } else {
      setComplexitiesSelected([...complexitiesSelected, id]);
    }
  }
  function updateTechnologiesSelection(id: string) {
    if (technologiesSelected.includes(id)) {
      setTechnologiesSelected(
        technologiesSelected.filter((technology) => technology !== id)
      );
    } else {
      setTechnologiesSelected([...technologiesSelected, id]);
    }
  }

  function resetFilters() {
    setSortBySelected([...ProjectSearchSortByMapping.entries()][0][0]);
    setRolesSelected([]);
    setComplexitiesSelected([]);
    setTechnologiesSelected([]);
  }

  // Update results when query data changes
  useEffect(() => {
    if (data) {
      setResults(data);
    } else if (error) {
      setErrorMessage(error.message);
    }
  }, [data, error]);

  const value: IProjectsSearchProvider = {
    searchingPending: isLoading,
    sortBySelected,
    updateSortBySelection,
    rolesSelected: memoizedRoles,
    updateRolesSelection,
    complexitiesSelected: memoizedComplexities,
    updateComplexitiesSelection,
    technologiesSelected: memoizedTechnologies,
    updateTechnologiesSelection,
    resetFilters,
    results,
    errorMessage,
  };

  return (
    <ProjectsSearchContext.Provider value={value}>
      {children}
    </ProjectsSearchContext.Provider>
  );
};

export default function useProjectsSearch() {
  const context = useContext(ProjectsSearchContext);
  if (!context) {
    throw new Error(
      "useProjectsSearch must be used within a ProjectsSearchProvider"
    );
  }
  return context;
}
