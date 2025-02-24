import MocketRepository from "@/repositories/mocket.repository";
import UserService from "./user.service";
import ErrorHandler from "@/utils/error";
import ProjectService from "./project.service";
import { IMocket } from "@/models/mocket.model";
import mongoose from "mongoose";
import { generateUniqueMocketString } from "@/utils/token";
import Chance from "chance";
import { Methods } from "@/controller/controller";
import { match } from "path-to-regexp";
import { fakerMappings } from "@/utils/mapping";
import { CreateMocketAiDto, CreateMocketDto, MocketDto } from "@/dtos/mocket.dto";
import OpenAI from "openai";
import { Request } from "express";
import { OPENAI_API_KEY } from "@/utils/variables";
export default class MocketService {
  private openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  private systemPrompt = `You are an API generation assistant. Your task is to create mock API definitions based on user prompts.  

  **Response Format (JSON):**  
  The output should be a JSON object:
  
  Given below is an example of a mock API definition:
  
  {
    "requestType": "GET",
    "endpoint": "/demo",
    "requestHeaders": "{\\n  \\\"Content-Type\\\": \\\"application/json\\\"\\n}",
    "requestBody": "\"{\\n  \\\"name\\\": \\\"John Doe\\\",\\n  \\\"email\\\": \\\"johndoe@example.com\\\",\\n  \\\"age\\\": 30,\\n  \\\"address\\\": {\\n    \\\"street\\\": \\\"123 Main St\\\",\\n    \\\"city\\\": \\\"New York\\\",\\n    \\\"zip\\\": \\\"10001\\\"\\n  },\\n  \\\"hobbies\\\": [\\\"reading\\\", \\\"gaming\\\", \\\"traveling\\\"]\\n}\\n\"",
    "responseBody": "\"{\\n    \\\"status\\\": \\\"success\\\"\\n  }\""
}
  Manage the fields accordingly as per the user prompt.

`;
  constructor(
    private mocketRepo: MocketRepository,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  public async getMocket(id: string) {
    const mocket = await this.mocketRepo.findOneById(id);
    if (!mocket?.projectId) {
      throw new ErrorHandler(404, "Project ID not found");
    }

    const project = await this.projectService.getProject(mocket.projectId.toString());
    return {
      ...mocket.toJSON(),
      subDomain: project?.subDomain,
    };
  }
  public async getMockets(userId: string) {
    const project = await this.projectService.getUserProjects(userId);
    return this.mocketRepo.findBy({ createdBy: userId });
  }
  public async createMocket(createMocket: CreateMocketDto, userId: string) {
    let user = await this.userService.getUserById(userId);
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    const project = await this.projectService.getProject(createMocket.projectId);
    // if (!project) {
    //   throw new ErrorHandler(404, "Project not found");
    // }

    // let processedRequestBody: string;
    // if (typeof createMocket.requestBody === "string") {
    //   processedRequestBody = createMocket.requestBody;
    // } else {
    //   processedRequestBody = JSON.stringify(createMocket.requestBody);
    // }

    const mocket = await this.mocketRepo.create({
      projectId: project?._id || "6788c32cb027d8ab099734fc",
      endpoint: createMocket.endpoint,
      requestType: createMocket.requestType,
      requestHeaders: JSON.parse(createMocket.requestHeaders as string),
      requestBody: createMocket.requestBody,
      responseBody: createMocket.responseBody,
      createdBy: user._id,
      slugName: generateUniqueMocketString(),
    } as IMocket);

    return {
      mocketId: mocket._id,
      requestType: mocket.requestType,
      slugName: mocket.slugName,
      // subDomain: project.subDomain,
    };
  }

  public async createMocketWithAi(dto: CreateMocketAiDto, userId: string) {
    // const project = await this.projectService.getProject(dto.projectId);

    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: this.systemPrompt },
        { role: "user", content: dto.prompt },
      ],
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    console.log("AI Response", content);

    if (!content) {
      throw new ErrorHandler(500, "AI response content is null");
    }

    const aiMocket = JSON.parse(content) as MocketDto | any;
    console.log("AI Mocket", aiMocket);
    if (aiMocket.error) {
      throw new ErrorHandler(500, aiMocket.error);
    }
    const mocket = await this.mocketRepo.create({
      projectId: new mongoose.Types.ObjectId("6788c32cb027d8ab099734fc"),
      endpoint: aiMocket.endpoint,
      requestType: aiMocket.requestType,
      requestHeaders: JSON.parse(aiMocket.requestHeaders as string),
      requestBody: aiMocket.requestBody,
      responseBody: aiMocket.responseBody,
      createdBy: userId,
      slugName: generateUniqueMocketString(),
    } as IMocket);

    return {
      mocketId: mocket._id,
      requestType: mocket.requestType,
      slugName: mocket.slugName,
      // subDomain: project.subDomain,
    };
  }

  private extractFromRequest(req: Request) {
    const method = req.method as Methods;
    const endpoint = req.params[0];
    const projectId = req.params.projectId;
    const requestBody = req.body;
    const query = req.query;
    return { method, endpoint, projectId, requestBody, query };
  }

  public async trigger(req: Request) {
    let { method, endpoint, projectId, requestBody, query } = this.extractFromRequest(req);

    const project = await this.projectService.getProjectBySubDomain(projectId);
    if (!project) {
      throw new ErrorHandler(404, "Project not found");
    }

    if (!endpoint.startsWith("/")) {
      endpoint = `/${endpoint}`;
    }

    // with slug filter
    // const matchedMocket = await this.mocketRepo.findOneBy({
    //   projectId: new mongoose.Types.ObjectId(project._id as string),
    //   slugName: slug,
    //   endpoint,
    //   requestType: method,
    // });
    // if (!matchedMocket) {
    //   throw new ErrorHandler(404, "Mocket not found");
    // }

    let matchedMocket: IMocket | null = null;
    let params: Record<string, string> = {};

    // check if there is a mock exact endpoint
    const exactMatchedMocket = await this.mocketRepo.findOneBy({
      projectId: new mongoose.Types.ObjectId(project._id as string),
      endpoint,
      requestType: method,
    });

    if (exactMatchedMocket) {
      matchedMocket = exactMatchedMocket;
    } else {
      const mocketStream = this.mocketRepo.findByCursor({
        projectId: new mongoose.Types.ObjectId(project._id as string),
        requestType: method,
      });

      for await (const mocket of mocketStream) {
        const { match, extractedParams } = this.matchEndpoint(endpoint, mocket.endpoint);
        if (match) {
          matchedMocket = mocket;
          params = extractedParams;
          break;
        }
      }
      await mocketStream.close();
    }

    if (!matchedMocket) {
      throw new ErrorHandler(404, "Mocket not found");
    }

    if (matchedMocket.requestType == Methods.POST || matchedMocket.requestType == Methods.PUT) {
      this.validateRequest(requestBody, matchedMocket.requestBody);
    }
    const responseBody = JSON.parse(matchedMocket.responseBody as string);

    return this.generateMockResponse(JSON.parse(responseBody as string));
  }

  private validateRequest(requestBody: any, schema: any, path: string = "") {
    if (requestBody === null || (requestBody === undefined && schema !== null)) {
      throw new ErrorHandler(400, `Missing key at ${path}`);
    }
    if (Array.isArray(schema)) {
      if (!Array.isArray(requestBody)) {
        throw new ErrorHandler(400, `Invalid type at ${path}: expected an array.`);
      }
      requestBody.forEach((item, index) =>
        this.validateRequest(item, schema[0], `${path}[${index}]`)
      );
    } else if (typeof schema === "object" && schema !== null) {
      if (typeof requestBody !== "object" || requestBody === null) {
        throw new ErrorHandler(400, `Invalid type at ${path}: expected an object.`);
      }
      for (const key in schema) {
        if (!(key in requestBody)) {
          throw new ErrorHandler(400, `Missing key at ${path ? `${path}.` : ""}${key}`);
        }
        this.validateRequest(requestBody[key], schema[key], path ? `${path}.${key}` : key);
      }
    } else if (typeof schema === "string" && schema.startsWith("<<") && schema.endsWith(">>")) {
      const expectedType = schema.slice(2, -2).toLowerCase();
      const actualType = Array.isArray(requestBody) ? "array" : typeof requestBody;
      if (expectedType !== actualType) {
        throw new ErrorHandler(
          400,
          `Invalid type for key ${path}: expected ${expectedType}, got ${actualType}.`
        );
      }
    } else {
      if (requestBody !== schema) {
        throw new ErrorHandler(400, `Invalid value at ${path}: expected ${schema}.`);
      }
    }
  }

  private generateMockResponse(schema: Object | any): any {
    if (Array.isArray(schema)) {
      // const listLength = this.chance.integer({ min: 3, max: 10 });
      // console.log("listLength", listLength, schema[0]);
      const listLength = schema.length;
      return Array.from({ length: listLength }, (_, i: number) =>
        this.generateMockResponse(schema[i])
      );
    }

    const response: any = schema;

    if (typeof response == "object") {
      for (const key in schema) {
        const value = schema[key];

        if (typeof value === "string" && value.startsWith("<<") && value.endsWith(">>")) {
          const type = value.slice(2, -2).trim().toLowerCase();

          for (const mapperKey in fakerMappings) {
            if (mapperKey === type) {
              response[key] = fakerMappings[type]();
            }
          }
        } else if (typeof value === "object" && value !== null) {
          response[key] = this.generateMockResponse(value);
        } else {
          response[key] = value;
        }
      }
    } else if (typeof response == "string") {
      if (response.startsWith("<<") && response.endsWith(">>")) {
        const type = response.slice(2, -2).trim().toLowerCase();

        for (const mapperKey in fakerMappings) {
          if (mapperKey === type) {
            return fakerMappings[type]();
          }
        }
      }
    }
    return response;
  }

  private extractParamValueFromEndpoint(endpoint: string, param: string): string | null {
    const paramPattern = new RegExp(`/${param.replace(":", "")}/([^/]+)`);
    const match = endpoint.match(paramPattern);
    return match ? match[1] : null;
  }

  private matchEndpoint(endpoint: string, storedEndpoint: string) {
    if (!storedEndpoint) return { match: false, extractedParams: {} };

    const matcher = match(storedEndpoint);
    const paramRes = matcher(endpoint);

    const extractedParams: Record<string, string> = {};

    if (paramRes) {
      for (const key in paramRes.params) {
        extractedParams[key] = Array.isArray(paramRes.params[key])
          ? paramRes.params[key][0]
          : paramRes.params[key] || "";
      }
    } else {
      return { match: false, extractedParams: {} };
    }

    return { match: true, extractedParams };
  }
}
