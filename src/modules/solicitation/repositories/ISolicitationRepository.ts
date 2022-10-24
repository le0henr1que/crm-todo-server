
import { Solicitation } from "../entities/SolicitationSchema";

export interface ISolicitationRepository {
 create({status, name, subject}: ISolicitationDTO): Promise<void>;

 listSolicitationWaiting(limit:number, Skip:number, Status:string, subject:string): Promise<Solicitation[]>;

 findById(_id:String): Promise<Solicitation[]>;

 update(_id:String, Status:String): Promise<void>;

 mongoCount(Status:string, subject:string): Promise<number>

}