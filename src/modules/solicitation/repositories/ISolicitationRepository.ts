
import { Solicitation } from "../entities/SolicitationSchema";

export interface ISolicitationRepository {
 create({status, name, subject}: ISolicitationDTO): Promise<void>;

 listSolicitationWaiting(limit:number, Skip:Number): Promise<Solicitation[]>;

 findById(_id:String): Promise<Solicitation[]>;

 update(_id:String, status:String): Promise<void>;

 mongoCount(): Promise<number>

}