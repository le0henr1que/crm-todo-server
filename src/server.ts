import { connection } from "mongoose";
import { app } from "./app";
import { connectToMongoDb } from "./database/mongo";
import { CreateSolicitationUseCase } from "./modules/solicitation/useCases/createSolicitation/CreateSolicitationUseCase";
import logger from "./utils/logger";

const PORT = process.env.PORT || 3000;

const createServer = async () => {
  await connectToMongoDb();
  
  const server = app.listen(PORT, () => {
    logger.info(`Running at ${PORT}`);
  })

  new CreateSolicitationUseCase(server);

  process.on("SIGINT", async () => {
    await connection.close();
    server.close()
    console.log("app server and connection to mongodb closed")
  })
}

createServer();