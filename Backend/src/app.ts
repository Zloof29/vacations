import express from "express";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { userController } from "./5-controllers/user-controller";
import expressFileUpload from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import path from "path";
import cors from "cors";
import { vacationController } from "./5-controllers/vacations-controller";

// Configure fileSaver once:
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// Create main server object:
const server = express();

// Enable CORS:
server.use(cors());

// Create the body from json:
server.use(express.json());

// Read files into request.files:
server.use(expressFileUpload());

// Register middleware:
// server.use(logsMiddleware.logRequest);
server.use(securityMiddleware.preventXssAttack);

server.use(
  "/api/vacations/images",
  express.static(path.join(__dirname, "1-assets/images"))
);

// Register routes:
server.use("/api", vacationController.router, userController.router);

// Register route not found middleware:
server.use("*", errorsMiddleware.routeNotFound);

// Register catchAll middleware:
server.use(errorsMiddleware.catchAll);

// Run server:
server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
