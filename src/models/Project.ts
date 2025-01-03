export enum SortProjectsBy {
  Newest = "Newest",
  Oldest = "Oldest",
  MostFavorites = "Most favorites",
}

export enum ProjectRole {
  BackEndDeveloper = "Back-end developer",
  FrontEndDeveloper = "Front-end developer",
  MachineLearningEngineer = "Machine learning engineer",
  MobileDeveloper = "Mobile developer",
  Designer = "Designer",
  DevOps = "DevOps",
  ProductManager = "Product manager",
  DataScientist = "Data scientist",
  GameDeveloper = "Game developer",
}

export enum ProjectComplexity {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  Huge = "Huge",
}

export enum ProjectTechnology {
  // Web
  React = "React",
  Angular = "Angular",
  Vue = "Vue",
  NodeJs = "Node.js",
  Express = "Express",
  NestJs = "Nest.js",
  Django = "Django",
  Flask = "Flask",
  RubyOnRails = "Ruby on Rails",
  Laravel = "Laravel",
  Spring = "Spring",
  ASPDotNet = "ASP.NET",
  // Data science
  TensorFlow = "TensorFlow",
  PyTorch = "PyTorch",
  ScikitLearn = "Scikit-learn",
  Pandas = "Pandas",
  NumPy = "NumPy",
  // Game
  Unity = "Unity",
  UnrealEngine = "Unreal Engine",
  Godot = "Godot",
  Phaser = "Phaser",
  // Mobile
  Android = "Android",
  IOS = "iOS",
  ReactNative = "React Native",
  Flutter = "Flutter",
  // Database
  MySQL = "MySQL",
  PostgreSQL = "PostgreSQL",
  MongoDB = "MongoDB",
  Redis = "Redis",
  Firebase = "Firebase",
  // Cloud
  Azure = "Azure",
  AWS = "AWS",
  GoogleCloud = "Google Cloud",
  // DevOps
  Docker = "Docker",
  Kubernetes = "Kubernetes",
  Jenkins = "Jenkins",
  Terraform = "Terraform",
  Ansible = "Ansible",
  // Other
  Blockchain = "Blockchain",
  ARVR = "AR/VR",
  IoT = "IoT",
}

export interface ICreatorProjectCard {
  id: string;
  name: string;
  technologyStackText: string;
  collaboratorsText: string;
  isOpen: boolean;
}

export interface ICollaboratorProjectCard {
  id: string;
  name: string;
  technologyStackText: string;
  creatorName: string;
  collaboratorsText: string;
}

export interface GetProjectSearchResultsResponseDtoCollaborator {
  id: string;
  avatarUrl: string | null;
}
export interface GetProjectSearchResultsResponseDto {
  id: string;
  name: string;
  technologies: string[];
  creatorName: string;
  collaborators: GetProjectSearchResultsResponseDtoCollaborator[];
  openToRoles: string[];
}
