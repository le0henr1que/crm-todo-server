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

      const listSolicitation = async () => {
        const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, 0, "Aguardando")).reverse()
        socket.broadcast.emit("list", solicitation)
      }
      //Create
      socket.on("create", async ({status, name, subject}) => {
        await SolicitationRepository.create({name,  
        status, subject})
        listSolicitation()
      })
      //FindBy for ID
      socket.on("solicitationId", async (_id) => {
        const solicitationId = await SolicitationRepository.findById(_id)
        socket.emit("listId", solicitationId)

        listSolicitation()

        return

      })
      //Update for ID
      socket.on("update", async (_id, status) => {
        await SolicitationRepository.update(_id, status)
        listSolicitation()
        return 

      })

      //List All for ID
      const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, 0, "Aguardando")).reverse()
      const countElements = await (await SolicitationRepository.mongoCount('Aguardando'))
      socket.emit('countElements', countElements)
      socket.emit("list", solicitation)

      // socket.on("list", async (paginationNumber) => {
      //   const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, paginationNumber, "Aguardando")).reverse()
      //   const countElements = await (await SolicitationRepository.mongoCount('Aguardando'))
      //   socket.emit('countElements', countElements)
      //   socket.emit("list", solicitation)
      //   return 

      // })

      // socket.emit("listId", solicitation)
      
    })

  }
}

export { CreateSolicitationUseCase };