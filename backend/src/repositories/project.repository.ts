import BaseRepository from "./base.repository";
import Project, { IProject } from "@/models/project.model";

export default class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(Project);
  }
}
