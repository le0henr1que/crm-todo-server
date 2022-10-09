import { Server } from "socket.io";
import http from 'http';
import environmentKeys from "../../../../constants/tech/environmentKeys";
import logger from "../../../../utils/logger";
import { SolicitationRepository } from "../../repositories/SolicitationRepository";

class CreateSolicitationUseCase {
  private _io: Server;
  constructor (server: http.Server) {
    this._io = new Server(server, {
      cors: {
        origin: environmentKeys.SOCKET_CLIENT_SERVER,
        methods: ["GET", "POST", "PUT", "DELETE"]      
      }
    }) // servidor e configuração;

    this._io.on("connection", async (socket) => {
     

      logger.info("Web socket connection created");
      logger.info(`Socket conectado: ${socket.id}`);

      
      socket.on("create", async ({status, name, subject}) => {
        await SolicitationRepository.create({name,  
        status, subject})

        const solicitation = await (await SolicitationRepository.list()).reverse
        socket.broadcast.emit("list", solicitation)
      })

      socket.on("solicitationId", async (_id) => {
        const solicitationId = await SolicitationRepository.findById(_id)
        socket.emit("listId", solicitationId)

        const solicitation = await (await SolicitationRepository.list()).reverse
        socket.broadcast.emit("list", solicitation)

        return

      })

      socket.on("update", async (_id, status) => {
        await SolicitationRepository.update(_id, status)
        const solicitation = await (await SolicitationRepository.list()).reverse
        socket.broadcast.emit("list", solicitation)

        return 

      })

      const solicitation = await (await SolicitationRepository.list()).reverse()
      socket.emit("list", solicitation)

      // socket.emit("listId", solicitation)
      
    })

  }
}

export { CreateSolicitationUseCase };