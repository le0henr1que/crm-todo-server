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
      // mongoCountSubject(subject:string)

      const listSolicitationStatus = async (SocketCountEmitIn:string, SocketEmitIn: string, status:string, subject:string) => {
        const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, 0,  status, subject))
        socket.broadcast.emit('list', solicitation)
        socket.emit(SocketEmitIn, solicitation)
        const countElements = await (await SolicitationRepository.mongoCountStatus(status, subject))
        socket.broadcast.emit(SocketCountEmitIn, countElements)
        
      }
      
      listSolicitationStatus("countElements", "list", "Aguardando", "AllContent")
      listSolicitationStatus("CountComputer", "list","Aguardando", "Computador")
      listSolicitationStatus("ContPhone", "list", "Aguardando", "Celular")
      
      socket.on("handleFilter", async (countIn, status, subject) =>{
        console.info("listed in : "+status+" and " +subject )
        listSolicitationStatus(countIn, "list", status, subject)
      })
      
      //Create
      socket.on("create", async ({status, name, subject}) => {
        await SolicitationRepository.create({name,  
        status, subject})
        
        listSolicitationStatus("countElements", "list", "Aguardando", "AllContent")
        listSolicitationStatus("CountComputer", "list","Aguardando", "Computador")
        listSolicitationStatus("ContPhone", "list", "Aguardando", "Celular")
        // await countSolicitationPagination()
      })

      //FindBy for ID
      socket.on("solicitationId", async (_id) => {
        const solicitationId = await SolicitationRepository.findById(_id)
        socket.emit("listId", solicitationId)

        listSolicitationStatus("countElements", "list", "Aguardando", "AllContent")
        listSolicitationStatus("CountComputer", "list","Aguardando", "Computador")
        listSolicitationStatus("ContPhone", "list", "Aguardando", "Celular")
        // await countSolicitationPagination()

        return

      })
      //Update for ID
      socket.on("update", async (_id, status) => {
        await SolicitationRepository.update(_id, status)
        listSolicitationStatus("countElements", "list", "Aguardando", "AllContent")
        listSolicitationStatus("CountComputer", "list","Aguardando", "Computador")
        listSolicitationStatus("ContPhone", "list", "Aguardando", "Celular")
        // await countSolicitationPagination()
        return 

      })

 

      socket.on("listNextPagination", async (paginationNumber) => {
        var page = 6 * paginationNumber ;
        const solicitation = await (await SolicitationRepository.listSolicitationWaiting(6, page, "Aguardando", "AllContent"))
        socket.emit("emitNextPage", solicitation)
        return
      })

      // socket.emit("listId", solicitation)
      
    })

  }
}

export { CreateSolicitationUseCase };