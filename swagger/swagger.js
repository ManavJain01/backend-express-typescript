const options = {
  openapi: "OpenAPI 3",
  language: "en-US",
  disableLogs: false,
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
};
const generateSwagger = require("swagger-autogen")();

const swaggerDocument = {
  info: {
    version: "1.0.0",
    title: "Express Project",
    description: "Basic Structure For Express Project",
    contact: {
      name: "API Support",
      email: "nit474011gwl@gmail.com",
    },
  },
  host: "localhost:5000",
  basePath: "/api/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Express Project",
      description: "BackEnd APIs",
    },
    {
      name: "Users",
      description: "User Management APIs",
    },
  ],
  securityDefinitions: {},
  definitions: {
    User: {
      id: "string",
      name: "string",
      email: "string",
      age: "number",
    },
    UserCreation: {
      name: "string",
      email: "string",
      password: "string",
    },
    UserUpdate: {
      name: "string",
      email: "string",
    },
    todoResponse: {
      code: 200,
      message: "Success",
    },
    "errorResponse.400": {
      code: 400,
      message:
        "The request was malformed or invalid. Please check the request parameters.",
    },
    "errorResponse.401": {
      code: 401,
      message: "Authentication failed or user lacks proper authorization.",
    },
    "errorResponse.403": {
      code: 403,
      message: "You do not have permission to access this resource.",
    },
    "errorResponse.404": {
      code: 404,
      message: "The requested resource could not be found on the server.",
    },
    "errorResponse.500": {
      code: 500,
      message:
        "An unexpected error occurred on the server. Please try again later.",
    },
  },
};
const swaggerFile = "./docs/swagger.json";
const apiRouteFile = ["./app/routes.ts"];
generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);
