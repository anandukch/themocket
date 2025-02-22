import { NextFunction, Request, Response } from "express";
import Controller, { IRoute, Methods } from "./controller";
import ProjectService from "@/services/project.service";

export default class ProjectController extends Controller {
  constructor(private service: ProjectService) {
    super();
  }
  path = "/projects";
  routerMiddleWares = [];

  routes: IRoute[] = [
    {
      path: "/",
      method: Methods.GET,
      handler: this.getAllProjects.bind(this),
      localMiddleWares: [],
    },
  ];

  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await this.service.getProjects();
      res.status(200).json(projects);
    } catch (err) {
      return next(err);
    }
  }

  createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const project = req.body;
      //   const newProject = this.service.createProject(project);
      //   res.status(201).json(newProject);
    } catch (err) {
      return next(err);
    }
  }
}
