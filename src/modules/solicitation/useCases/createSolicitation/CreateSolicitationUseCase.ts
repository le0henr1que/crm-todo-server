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
        const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, 0, "Aguardando"))
        socket.broadcast.emit("list", solicitation)
        const countElements = await (await SolicitationRepository.mongoCount('Aguardando'))
        socket.emit('countElements', countElements)
      }
      listSolicitation()

      const countSolicitationPagination = async () => {
        const countElements = await (await SolicitationRepository.mongoCount('Aguardando'))
        socket.emit('countElements', countElements)
        listSolicitation()
      }
      countSolicitationPagination()
      
      //Create
      socket.on("create", async ({status, name, subject}) => {
        await SolicitationRepository.create({name,  
        status, subject})
        console.info("Solicitation created")
        await listSolicitation()
        await countSolicitationPagination()
      })
      //FindBy for ID
      socket.on("solicitationId", async (_id) => {
        const solicitationId = await SolicitationRepository.findById(_id)
        socket.emit("listId", solicitationId)

        await listSolicitation()
        await countSolicitationPagination()

        return

      })
      //Update for ID
      socket.on("update", async (_id, status) => {
        await SolicitationRepository.update(_id, status)
        await listSolicitation()
        await countSolicitationPagination()
        return 

      })

 

      socket.on("listNextPagination", async (paginationNumber) => {
        var page = 6 * paginationNumber ;
        const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, page, "Aguardando"))
        socket.emit("emitNextPage", solicitation)
        return
      })

      // socket.emit("listId", solicitation)
      
    })

  }
}

export { CreateSolicitationUseCase };