import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Prizma API",
      version: "1.0.0",
      description: "Documentação oficial da API Prizma"
    },

    servers: [
      {
        url: "http://localhost:3000/api"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },

            name: {
              type: "string"
            },

            email: {
              type: "string"
            },

            avatar: {
              type: "string"
            },

            level: {
              type: "integer"
            },

            totalXp: {
              type: "integer"
            }
          }
        },

        Company: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },

            name: {
              type: "string"
            },

            email: {
              type: "string"
            },

            logo: {
              type: "string"
            }
          }
        },

        Project: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },

            title: {
              type: "string"
            },

            description: {
              type: "string"
            },

            type: {
              type: "string"
            }
          }
        },

        Reward: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },

            name: {
              type: "string"
            },

            pointsCost: {
              type: "integer"
            }
          }
        },

        Sponsor: {
          type: "object",
          properties: {
            id: {
              type: "integer"
            },

            amount: {
              type: "number"
            },

            status: {
              type: "string"
            }
          }
        }
      }
    }
  },

  apis: [
    "./src/docs/*.swagger.js"
  ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;