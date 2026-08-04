import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api", routes);

export default app;