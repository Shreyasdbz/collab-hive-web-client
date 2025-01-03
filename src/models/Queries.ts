import { ICreatorProjectCard, ICollaboratorProjectCard } from "./Project";

export enum FetchState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum QueryKeys {
  DASHBOARD_PAGE_GET_CREATOR_PROJECTS = "DASHBOARD_PAGE_GET_CREATOR_PROJECTS",
  DASHBOARD_PAGE_GET_COLLABORATOR_PROJECTS = "DASHBOARD_PAGE_GET_COLLABORATOR_PROJECTS",
}

export type DashboardPageGetCreatorProjectsQueryVariables = {
  creatorId: string;
};
export type DashboardPageGetCreatorProjectsQueryResponse = {
  projects: ICreatorProjectCard[];
};

export type DashboardPageGetCollaboratorProjectsQueryVariables = {
  collaboratorId: string;
};
export type DashboardPageGetCollaboratorProjectsQueryResponse = {
  projects: ICollaboratorProjectCard[];
};

// Map the keys to corresponding variables and response types
export type QueryMapping = {
  [QueryKeys.DASHBOARD_PAGE_GET_CREATOR_PROJECTS]: {
    variables: DashboardPageGetCreatorProjectsQueryVariables;
    response: DashboardPageGetCreatorProjectsQueryResponse;
  };
  [QueryKeys.DASHBOARD_PAGE_GET_COLLABORATOR_PROJECTS]: {
    variables: DashboardPageGetCollaboratorProjectsQueryVariables;
    response: DashboardPageGetCollaboratorProjectsQueryResponse;
  };
};

// Generic function type
export type QueryFunction = <T extends QueryKeys>(
  queryKey: T,
  variables: QueryMapping[T]["variables"]
) => QueryMapping[T]["response"];
