import { IProject } from "@/models/project.model";
import ProjectRepository from "@/repositories/project.repository";
import { ClientSession } from "mongoose";

export default class ProjectService {
  constructor(private projectRepo: ProjectRepository) {}

  async getProjects() {
    return this.projectRepo.findAll();
  }

  async createProject(project: IProject, session?: ClientSession) {
    if (!project.apiKey || !project.subDomain) {
      throw new Error("API Key and Subdomain are required");
    }

    return this.projectRepo.create(project, session);
  }

  async getUserProjects(userId: string) {
    return this.projectRepo.findBy({ createdBy: userId });
  }

  async getProject(projectId: string) {
    return this.projectRepo.findOneById(projectId);
  }

  async getProjectBySubDomain(subDomain: string) {
    return this.projectRepo.findOneBy({ subDomain });
  }
}
